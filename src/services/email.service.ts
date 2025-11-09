/**
 * Email Service
 * Handles all email sending operations using Mailgun/SendGrid
 */

import nodemailer, { Transporter, SentMessageInfo, SendMailOptions } from 'nodemailer';

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
  attachments?: Array<{
    filename: string;
    content: string | Buffer;
    contentType?: string;
  }>;
}

export interface EmailTemplate {
  subject: string;
  html: string;
  text?: string;
}

export class EmailService {
  private transporter: Transporter | null = null;
  private defaultFrom: string;

  constructor() {
    this.defaultFrom = process.env.SMTP_FROM || 'hello@earlab.tech';
    this.initializeTransporter();
  }

  private initializeTransporter() {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || '587');
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.warn('SMTP credentials not configured. Email service will not work.');
      return;
    }

    try {
      this.transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      console.log('Email service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize email service:', error);
    }
  }

  /**
   * Send email
   */
  async sendEmail(options: EmailOptions): Promise<SentMessageInfo> {
    if (!this.transporter) {
      throw new Error('Email transporter not initialized');
    }

    try {
      const mailOptions: SendMailOptions = {
        from: options.from || this.defaultFrom,
        to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
        subject: options.subject,
        html: options.html,
      };

      const textContent = options.text;
      if (textContent) {
        mailOptions.text = textContent;
      }

      if (options.replyTo) {
        mailOptions.replyTo = options.replyTo;
      }

      if (options.attachments?.length) {
        mailOptions.attachments = options.attachments;
      }

      const info = await this.transporter.sendMail(mailOptions);

      console.log('Email sent successfully:', info.messageId);
      return info;
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }


  /**
   * Send contact form notification to admin
   */
  async sendContactNotification(contact: {
    name: string;
    email: string;
    company?: string;
    subject?: string;
    message: string;
    budgetRange?: string;
    timeline?: string;
  }): Promise<SentMessageInfo> {
    const template = this.getContactNotificationTemplate(contact);
    
    return this.sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@earlab.tech',
      subject: template.subject,
      html: template.html,
      replyTo: contact.email,
    });
  }

  /**
   * Send contact confirmation to user
   */
  async sendContactConfirmation(
    contact: { name: string; email: string } | string,
    name?: string
  ): Promise<SentMessageInfo> {
    const payload = typeof contact === 'string'
      ? { email: contact, name: name || 'there' }
      : contact;

    const template = this.getContactConfirmationTemplate(payload);
    
    return this.sendEmail({
      to: payload.email,
      subject: template.subject,
      html: template.html,
    });
  }

  /**
   * Send newsletter verification email
   */
  async sendNewsletterVerification(
    subscriber: { email: string; name?: string; verificationToken: string } | string,
    verificationToken?: string,
    name?: string
  ): Promise<SentMessageInfo> {
    const payload = typeof subscriber === 'string'
      ? { email: subscriber, verificationToken: verificationToken || '', name }
      : subscriber;

    if (!payload.verificationToken) {
      throw new Error('Verification token is required');
    }

    const template = this.getNewsletterVerificationTemplate(payload);
    
    return this.sendEmail({
      to: payload.email,
      subject: template.subject,
      html: template.html,
    });
  }

  /**
   * Send newsletter welcome email
   */
  async sendNewsletterWelcome(
    subscriber: { email: string; name?: string } | string,
    name?: string
  ): Promise<SentMessageInfo> {
    const payload = typeof subscriber === 'string'
      ? { email: subscriber, name }
      : subscriber;

    const template = this.getNewsletterWelcomeTemplate(payload);
    
    return this.sendEmail({
      to: payload.email,
      subject: template.subject,
      html: template.html,
    });
  }

  /**
   * Send newsletter digest
   */
  async sendNewsletterDigest(
    subscriber: { email: string; name?: string },
    content: {
      title: string;
      items: Array<{
        title: string;
        excerpt: string;
        url: string;
        imageUrl?: string;
      }>;
    }
  ): Promise<SentMessageInfo> {
    const template = this.getNewsletterDigestTemplate(subscriber, content);
    
    return this.sendEmail({
      to: subscriber.email,
      subject: template.subject,
      html: template.html,
    });
  }

  /**
   * Email Templates
   */

  private getContactNotificationTemplate(contact: {
    name: string;
    email: string;
    company?: string;
    subject?: string;
    message: string;
    budgetRange?: string;
    timeline?: string;
  }): EmailTemplate {
    return {
      subject: `New Contact Form Submission from ${contact.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #0F62FE 0%, #00C2A8 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
              .content { background: #f7fafc; padding: 30px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 20px; }
              .field-label { font-weight: 600; color: #475569; margin-bottom: 5px; }
              .field-value { color: #0B1220; }
              .button { display: inline-block; background: #0F62FE; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">🤝 New Contact Form Submission</h1>
              </div>
              <div class="content">
                ${contact.subject ? `
                <div class="field">
                  <div class="field-label">Subject:</div>
                  <div class="field-value">${contact.subject}</div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="field-label">Name:</div>
                  <div class="field-value">${contact.name}</div>
                </div>
                <div class="field">
                  <div class="field-label">Email:</div>
                  <div class="field-value"><a href="mailto:${contact.email}">${contact.email}</a></div>
                </div>
                ${contact.company ? `
                <div class="field">
                  <div class="field-label">Company:</div>
                  <div class="field-value">${contact.company}</div>
                </div>
                ` : ''}
                ${contact.budgetRange ? `
                <div class="field">
                  <div class="field-label">Budget Range:</div>
                  <div class="field-value">${contact.budgetRange}</div>
                </div>
                ` : ''}
                ${contact.timeline ? `
                <div class="field">
                  <div class="field-label">Timeline:</div>
                  <div class="field-value">${contact.timeline}</div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="field-label">Message:</div>
                  <div class="field-value" style="white-space: pre-wrap;">${contact.message}</div>
                </div>
                <a href="mailto:${contact.email}" class="button">Reply to ${contact.name}</a>
              </div>
            </div>
          </body>
        </html>
      `,
    };
  }

  private getContactConfirmationTemplate(contact: {
    name: string;
    email: string;
  }): EmailTemplate {
    return {
      subject: 'EAR Lab received your message',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #0F62FE 0%, #00C2A8 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
              .content { background: #f7fafc; padding: 30px; border-radius: 0 0 8px 8px; }
              .logo { font-size: 24px; font-weight: 800; margin-bottom: 10px; }
              .button { display: inline-block; background: #0F62FE; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
              .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">EAR Lab</div>
                <p style="margin: 0; opacity: 0.9;">Embedded. Autonomous. Robotics.</p>
              </div>
              <div class="content">
                <h2 style="color: #0B1220; margin-top: 0;">Hi ${contact.name},</h2>
                <p>Thanks for reaching out to EAR Lab — we received your message and will reply within <strong>2 business days</strong>.</p>
                <p>Our team is reviewing your inquiry and will get back to you with detailed information about how we can help with your robotics project.</p>
                <p>If your inquiry is urgent, please email us directly at <a href="mailto:hello@earlab.tech" style="color: #0F62FE;">hello@earlab.tech</a> with "URGENT" in the subject line.</p>
                <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: #0B1220;">What happens next?</h3>
                  <ol style="color: #475569;">
                    <li>Our team reviews your project requirements</li>
                    <li>We'll schedule a discovery call to discuss your needs</li>
                    <li>You'll receive a detailed proposal with timeline and pricing</li>
                  </ol>
                </div>
                <p>In the meantime, feel free to explore our latest projects and research:</p>
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/projects" class="button">View Our Projects</a>
                <div class="footer">
                  <p><strong>EAR Lab</strong><br>
                  Embedded | Autonomous | Robotics Research & Development</p>
                  <p style="margin: 10px 0;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/blog" style="color: #0F62FE; margin: 0 10px;">Blog</a> |
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/research" style="color: #0F62FE; margin: 0 10px;">Research</a> |
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/services" style="color: #0F62FE; margin: 0 10px;">Services</a>
                  </p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    };
  }

  private getNewsletterVerificationTemplate(subscriber: {
    email: string;
    name?: string;
    verificationToken: string;
  }): EmailTemplate {
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/newsletter/verify?token=${subscriber.verificationToken}`;
    
    return {
      subject: 'Confirm your email for EAR Lab Newsletter',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #0F62FE 0%, #00C2A8 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
              .content { background: #f7fafc; padding: 30px; border-radius: 0 0 8px 8px; }
              .button { display: inline-block; background: #0F62FE; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
              .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">📧 Verify Your Email</h1>
              </div>
              <div class="content">
                <h2 style="color: #0B1220; margin-top: 0;">Hi ${subscriber.name || 'there'},</h2>
                <p>Welcome to the EAR Lab community! Please verify your email address to start receiving our weekly robotics insights, research updates, and innovation news.</p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${verificationUrl}" class="button">Verify Email Address</a>
                </div>
                <p style="color: #64748b; font-size: 14px;">Or copy and paste this link into your browser:</p>
                <p style="color: #0F62FE; word-break: break-all; font-size: 12px;">${verificationUrl}</p>
                <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: #0B1220;">What you'll receive:</h3>
                  <ul style="color: #475569;">
                    <li>Weekly curated robotics innovations and breakthroughs</li>
                    <li>Technical deep-dives and research insights</li>
                    <li>Early access to whitepapers and case studies</li>
                    <li>Exclusive invitations to workshops and events</li>
                  </ul>
                </div>
                <p style="color: #64748b; font-size: 14px;">If you didn't subscribe to this newsletter, you can safely ignore this email.</p>
                <div class="footer">
                  <p><strong>EAR Lab</strong><br>Embedded | Autonomous | Robotics</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    };
  }

  private getNewsletterWelcomeTemplate(subscriber: {
    email: string;
    name?: string;
  }): EmailTemplate {
    return {
      subject: 'Welcome to EAR Lab Newsletter! 🎉',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #0F62FE 0%, #00C2A8 100%); color: white; padding: 40px; border-radius: 8px 8px 0 0; text-align: center; }
              .content { background: #f7fafc; padding: 30px; border-radius: 0 0 8px 8px; }
              .card { background: white; padding: 20px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #0F62FE; }
              .button { display: inline-block; background: #0F62FE; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 5px; }
              .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 32px;">🎉 Welcome to EAR Lab!</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 18px;">You're now part of our robotics innovation community</p>
              </div>
              <div class="content">
                <h2 style="color: #0B1220; margin-top: 0;">Hi ${subscriber.name || 'there'},</h2>
                <p>Thanks for joining the EAR Lab Dispatch! You're now subscribed to receive weekly insights into the world of embedded systems, autonomous robots, and cutting-edge research.</p>
                
                <div class="card">
                  <h3 style="margin-top: 0; color: #0B1220;">📬 What to Expect</h3>
                  <ul style="color: #475569; margin: 0;">
                    <li><strong>Weekly Digest:</strong> Curated robotics news and innovations</li>
                    <li><strong>Technical Deep-Dives:</strong> Detailed articles on autonomy, sensors, and embedded systems</li>
                    <li><strong>Research Highlights:</strong> Latest findings from our lab and partners</li>
                    <li><strong>Early Access:</strong> New case studies, whitepapers, and resources</li>
                  </ul>
                </div>

                <div class="card">
                  <h3 style="margin-top: 0; color: #0B1220;">🚀 Get Started</h3>
                  <p style="margin: 10px 0;">Explore our latest content while you wait for your first newsletter:</p>
                  <div style="text-align: center;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/blog" class="button">Read Our Blog</a>
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/projects" class="button">View Projects</a>
                  </div>
                </div>

                <div class="card" style="border-left-color: #00C2A8;">
                  <h3 style="margin-top: 0; color: #0B1220;">💡 Latest Article</h3>
                  <p style="color: #475569; margin: 10px 0;"><strong>"How to Architect a Modular Autonomy Stack for Warehouse Robots"</strong></p>
                  <p style="color: #475569; margin: 10px 0;">Learn about designing scalable, modular autonomy systems with practical examples and architecture patterns.</p>
                  <a href="${process.env.NEXT_PUBLIC_APP_URL}/blog/modular-autonomy-stack" style="color: #0F62FE;">Read More →</a>
                </div>

                <p style="margin-top: 30px;">We're excited to have you on board! Feel free to reply to any newsletter with questions or feedback.</p>
                
                <div class="footer">
                  <p><strong>EAR Lab</strong><br>Embedded | Autonomous | Robotics</p>
                  <p style="margin: 10px 0;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/blog" style="color: #0F62FE; margin: 0 10px;">Blog</a> |
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/research" style="color: #0F62FE; margin: 0 10px;">Research</a> |
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/contact" style="color: #0F62FE; margin: 0 10px;">Contact</a>
                  </p>
                  <p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe" style="color: #94a3b8;">Unsubscribe</a>
                  </p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    };
  }

  private getNewsletterDigestTemplate(
    subscriber: { email: string; name?: string },
    content: {
      title: string;
      items: Array<{
        title: string;
        excerpt: string;
        url: string;
        imageUrl?: string;
      }>;
    }
  ): EmailTemplate {
    const itemsHtml = content.items.map(item => `
      <div class="article">
        ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.title}" style="width: 100%; border-radius: 6px; margin-bottom: 15px;">` : ''}
        <h3 style="margin: 10px 0; color: #0B1220;">${item.title}</h3>
        <p style="color: #475569; margin: 10px 0;">${item.excerpt}</p>
        <a href="${item.url}" style="color: #0F62FE; font-weight: 600; text-decoration: none;">Read More →</a>
      </div>
    `).join('');

    return {
      subject: content.title,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #0F62FE 0%, #00C2A8 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
              .content { background: #f7fafc; padding: 30px; border-radius: 0 0 8px 8px; }
              .article { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">📰 ${content.title}</h1>
              </div>
              <div class="content">
                <p style="color: #0B1220; font-size: 16px;">Hi ${subscriber.name || 'there'},</p>
                <p>Here's your weekly dose of robotics insights, innovations, and research from EAR Lab:</p>
                ${itemsHtml}
                <div class="footer">
                  <p><strong>EAR Lab</strong><br>Embedded | Autonomous | Robotics</p>
                  <p style="margin: 10px 0;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color: #0F62FE; margin: 0 10px;">Website</a> |
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/blog" style="color: #0F62FE; margin: 0 10px;">All Articles</a>
                  </p>
                  <p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe" style="color: #94a3b8;">Unsubscribe</a>
                  </p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    };
  }

  /**
   * Utility: Strip HTML tags
   */
  private stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  }
}

// Export singleton instance
export const emailService = new EmailService();






