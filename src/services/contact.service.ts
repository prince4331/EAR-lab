/**
 * Contact Service
 * Handles contact form submissions and notifications
 */

import { prisma } from '@/lib/db';
import { emailService } from './email.service';

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  projectDescription: string;
  budgetRange?: string;
  timeline?: string;
  fileUrl?: string;
  userId?: string;
}

export interface ContactStats {
  totalContacts: number;
  newContacts: number;
  qualifiedContacts: number;
  closedContacts: number;
  recentContacts: number;
}

class ContactService {
  /**
   * Submit contact form
   */
  async submitContact(data: ContactFormData): Promise<{ success: boolean; message: string; contactId?: string }> {
    try {
      // Create contact record
      const contact = await prisma.contact.create({
        data: {
          name: data.name,
          email: data.email,
          company: data.company,
          projectDescription: data.projectDescription,
          budgetRange: data.budgetRange,
          timeline: data.timeline,
          fileUrl: data.fileUrl,
          userId: data.userId,
          status: 'new',
        },
      });

      // Send notification to admin
      await emailService.sendContactNotification({
        name: data.name,
        email: data.email,
        company: data.company,
        message: data.projectDescription,
        budgetRange: data.budgetRange,
        timeline: data.timeline,
      });

      // Send confirmation to user
      await emailService.sendContactConfirmation({
        name: data.name,
        email: data.email,
      });

      // Create audit log
      await this.createAuditLog({
        action: 'contact_form_submitted',
        resource: 'contact',
        resourceId: contact.id,
        actorId: data.userId || 'anonymous',
        metadata: {
          email: data.email,
          company: data.company,
        },
      });

      return {
        success: true,
        message: 'Thank you for contacting us! We will respond within 2 business days.',
        contactId: contact.id,
      };
    } catch (error) {
      console.error('Contact form submission error:', error);
      return {
        success: false,
        message: 'An error occurred while submitting your message. Please try again later.',
      };
    }
  }

  /**
   * Get contact by ID
   */
  async getContactById(id: string) {
    try {
      return await prisma.contact.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    } catch (error) {
      console.error('Error fetching contact:', error);
      return null;
    }
  }

  /**
   * Get all contacts with filters
   */
  async getContacts(filters?: {
    status?: string;
    limit?: number;
    offset?: number;
  }) {
    try {
      const where = filters?.status ? { status: filters.status } : {};

      const [contacts, total] = await Promise.all([
        prisma.contact.findMany({
          where,
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: filters?.limit || 50,
          skip: filters?.offset || 0,
        }),
        prisma.contact.count({ where }),
      ]);

      return { contacts, total };
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return { contacts: [], total: 0 };
    }
  }

  /**
   * Update contact status
   */
  async updateContactStatus(id: string, status: 'new' | 'contacted' | 'qualified' | 'closed', actorId: string) {
    try {
      const contact = await prisma.contact.update({
        where: { id },
        data: { status },
      });

      // Create audit log
      await this.createAuditLog({
        action: 'contact_status_updated',
        resource: 'contact',
        resourceId: id,
        actorId,
        metadata: {
          newStatus: status,
        },
      });

      return { success: true, contact };
    } catch (error) {
      console.error('Error updating contact status:', error);
      return { success: false, error: 'Failed to update contact status' };
    }
  }

  /**
   * Get contact statistics
   */
  async getStats(): Promise<ContactStats> {
    try {
      const [total, newCount, qualified, closed, recent] = await Promise.all([
        prisma.contact.count(),
        prisma.contact.count({ where: { status: 'new' } }),
        prisma.contact.count({ where: { status: 'qualified' } }),
        prisma.contact.count({ where: { status: 'closed' } }),
        prisma.contact.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
            },
          },
        }),
      ]);

      return {
        totalContacts: total,
        newContacts: newCount,
        qualifiedContacts: qualified,
        closedContacts: closed,
        recentContacts: recent,
      };
    } catch (error) {
      console.error('Error fetching contact stats:', error);
      return {
        totalContacts: 0,
        newContacts: 0,
        qualifiedContacts: 0,
        closedContacts: 0,
        recentContacts: 0,
      };
    }
  }

  /**
   * Create audit log
   */
  private async createAuditLog(data: {
    action: string;
    resource: string;
    resourceId?: string;
    actorId: string;
    metadata?: any;
  }) {
    try {
      await prisma.auditLog.create({
        data: {
          action: data.action,
          resource: data.resource,
          resourceId: data.resourceId,
          actorId: data.actorId,
          metadata: data.metadata ? JSON.stringify(data.metadata) : null,
        },
      });
    } catch (error) {
      console.error('Error creating audit log:', error);
    }
  }
}

// Export singleton instance
export const contactService = new ContactService();
