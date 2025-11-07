/**
 * Newsletter Service
 * Handles newsletter subscriptions, verification, and unsubscribe operations
 */

import { prisma } from '@/lib/db';
import { emailService } from './email.service';
import crypto from 'crypto';

export interface SubscribeData {
  email: string;
  name?: string;
  role?: string;
  company?: string;
  source?: string;
}

export interface NewsletterStats {
  totalSubscribers: number;
  verifiedSubscribers: number;
  unverifiedSubscribers: number;
  recentSubscribers: number;
  sourceBreakdown: Record<string, number>;
}

class NewsletterService {
  /**
   * Subscribe to newsletter with double opt-in
   */
  async subscribe(data: SubscribeData): Promise<{ success: boolean; message: string; requiresVerification: boolean }> {
    try {
      // Check if email already exists
      const existing = await prisma.newsletterSubscriber.findUnique({
        where: { email: data.email },
      });

      if (existing) {
        if (existing.isVerified) {
          return {
            success: false,
            message: 'This email is already subscribed to our newsletter.',
            requiresVerification: false,
          };
        } else {
          // Resend verification email
          const verificationToken = this.generateVerificationToken(existing.email);
          await emailService.sendNewsletterVerification({
            email: existing.email,
            name: existing.name || undefined,
            verificationToken,
          });

          return {
            success: true,
            message: 'Verification email resent. Please check your inbox.',
            requiresVerification: true,
          };
        }
      }

      // Create new subscriber
      const subscriber = await prisma.newsletterSubscriber.create({
        data: {
          email: data.email,
          name: data.name,
          role: data.role,
          company: data.company,
          source: data.source || 'website',
          isVerified: false,
        },
      });

      // Send verification email
      const verificationToken = this.generateVerificationToken(subscriber.email);
      await emailService.sendNewsletterVerification({
        email: subscriber.email,
        name: subscriber.name || undefined,
        verificationToken,
      });

      return {
        success: true,
        message: 'Please check your email to verify your subscription.',
        requiresVerification: true,
      };
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      return {
        success: false,
        message: 'An error occurred. Please try again later.',
        requiresVerification: false,
      };
    }
  }

  /**
   * Verify email subscription
   */
  async verify(token: string): Promise<{ success: boolean; message: string }> {
    try {
      const email = this.verifyToken(token);
      
      if (!email) {
        return {
          success: false,
          message: 'Invalid or expired verification token.',
        };
      }

      const subscriber = await prisma.newsletterSubscriber.findUnique({
        where: { email },
      });

      if (!subscriber) {
        return {
          success: false,
          message: 'Subscriber not found.',
        };
      }

      if (subscriber.isVerified) {
        return {
          success: true,
          message: 'Your email is already verified.',
        };
      }

      // Update subscriber as verified
      await prisma.newsletterSubscriber.update({
        where: { email },
        data: { isVerified: true },
      });

      // Send welcome email
      await emailService.sendNewsletterWelcome({
        email: subscriber.email,
        name: subscriber.name || undefined,
      });

      return {
        success: true,
        message: 'Email verified successfully! Welcome to EAR Lab Newsletter.',
      };
    } catch (error) {
      console.error('Newsletter verification error:', error);
      return {
        success: false,
        message: 'An error occurred during verification.',
      };
    }
  }

  /**
   * Unsubscribe from newsletter
   */
  async unsubscribe(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const subscriber = await prisma.newsletterSubscriber.findUnique({
        where: { email },
      });

      if (!subscriber) {
        return {
          success: false,
          message: 'Email not found in our newsletter list.',
        };
      }

      await prisma.newsletterSubscriber.delete({
        where: { email },
      });

      return {
        success: true,
        message: 'You have been successfully unsubscribed.',
      };
    } catch (error) {
      console.error('Newsletter unsubscribe error:', error);
      return {
        success: false,
        message: 'An error occurred. Please try again later.',
      };
    }
  }

  /**
   * Get all verified subscribers
   */
  async getVerifiedSubscribers(): Promise<{ email: string; name?: string | null }[]> {
    try {
      const subscribers = await prisma.newsletterSubscriber.findMany({
        where: { isVerified: true },
        select: { email: true, name: true },
      });

      return subscribers;
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      return [];
    }
  }

  /**
   * Send newsletter to all verified subscribers
   */
  async sendNewsletter(content: {
    title: string;
    items: Array<{
      title: string;
      excerpt: string;
      url: string;
      imageUrl?: string;
    }>;
  }): Promise<{ success: boolean; sent: number; failed: number }> {
    const subscribers = await this.getVerifiedSubscribers();
    let sent = 0;
    let failed = 0;

    for (const subscriber of subscribers) {
      try {
        const success = await emailService.sendNewsletterDigest(subscriber, content);
        if (success) {
          sent++;
        } else {
          failed++;
        }
      } catch (error) {
        console.error(`Failed to send newsletter to ${subscriber.email}:`, error);
        failed++;
      }
    }

    return {
      success: sent > 0,
      sent,
      failed,
    };
  }

  /**
   * Get newsletter statistics
   */
  async getStats(): Promise<NewsletterStats> {
    try {
      const [total, verified, recent, sourceData] = await Promise.all([
        prisma.newsletterSubscriber.count(),
        prisma.newsletterSubscriber.count({ where: { isVerified: true } }),
        prisma.newsletterSubscriber.count({
          where: {
            subscribedAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
            },
          },
        }),
        prisma.newsletterSubscriber.groupBy({
          by: ['source'],
          _count: true,
        }),
      ]);

      const sourceBreakdown: Record<string, number> = {};
      sourceData.forEach(item => {
        sourceBreakdown[item.source] = item._count;
      });

      return {
        totalSubscribers: total,
        verifiedSubscribers: verified,
        unverifiedSubscribers: total - verified,
        recentSubscribers: recent,
        sourceBreakdown,
      };
    } catch (error) {
      console.error('Error fetching newsletter stats:', error);
      return {
        totalSubscribers: 0,
        verifiedSubscribers: 0,
        unverifiedSubscribers: 0,
        recentSubscribers: 0,
        sourceBreakdown: {},
      };
    }
  }

  /**
   * Generate verification token
   */
  private generateVerificationToken(email: string): string {
    const secret = process.env.NEWSLETTER_SECRET || 'default-secret-change-in-production';
    const timestamp = Date.now().toString();
    const data = `${email}:${timestamp}`;
    const hash = crypto.createHmac('sha256', secret).update(data).digest('hex');
    return Buffer.from(`${data}:${hash}`).toString('base64url');
  }

  /**
   * Verify and decode token
   */
  private verifyToken(token: string): string | null {
    try {
      const secret = process.env.NEWSLETTER_SECRET || 'default-secret-change-in-production';
      const decoded = Buffer.from(token, 'base64url').toString('utf-8');
      const [email, timestamp, hash] = decoded.split(':');

      // Check if token is expired (24 hours)
      const tokenAge = Date.now() - parseInt(timestamp);
      if (tokenAge > 24 * 60 * 60 * 1000) {
        return null;
      }

      // Verify hash
      const data = `${email}:${timestamp}`;
      const expectedHash = crypto.createHmac('sha256', secret).update(data).digest('hex');
      
      if (hash !== expectedHash) {
        return null;
      }

      return email;
    } catch (error) {
      console.error('Token verification error:', error);
      return null;
    }
  }
}

// Export singleton instance
export const newsletterService = new NewsletterService();
