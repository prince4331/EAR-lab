/**
 * Services Index
 * Central export for all service modules
 */

export { emailService } from './email.service';
export { newsletterService } from './newsletter.service';
export { contactService } from './contact.service';
export { blogService } from './blog.service';
export { projectService } from './project.service';

export type { EmailOptions, EmailTemplate } from './email.service';
export type { SubscribeData, NewsletterStats } from './newsletter.service';
export type { ContactFormData, ContactStats } from './contact.service';
export type { BlogPostData, BlogPostFilters } from './blog.service';
export type { ProjectData, ProjectFilters } from './project.service';
