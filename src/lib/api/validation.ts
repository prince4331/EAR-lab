/**
 * API Validation Utilities
 * Zod schemas for request validation
 */

import { z } from 'zod';

/**
 * Contact Form Schema
 */
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  company: z.string().max(100).optional(),
  projectDescription: z.string().min(10, 'Project description must be at least 10 characters').max(2000),
  budgetRange: z.string().optional(),
  timeline: z.string().optional(),
  fileUrl: z.string().url().optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

/**
 * Newsletter Subscription Schema
 */
export const newsletterSubscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2).max(100).optional(),
  role: z.string().max(100).optional(),
  company: z.string().max(100).optional(),
  source: z.string().max(50).optional(),
});

export type NewsletterSubscribeInput = z.infer<typeof newsletterSubscribeSchema>;

/**
 * Blog Post Schema
 */
export const blogPostSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  slug: z.string().min(3).max(200).regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  excerpt: z.string().max(500).optional(),
  contentMarkdown: z.string().min(100, 'Content must be at least 100 characters'),
  tags: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published']).optional(),
  readingTime: z.number().int().positive().optional(),
  featuredImage: z.string().url().optional(),
  publishedAt: z.string().datetime().optional(),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;

/**
 * Project Schema
 */
export const projectSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  slug: z.string().min(3).max(200).regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  summary: z.string().min(20, 'Summary must be at least 20 characters').max(500),
  contentMarkdown: z.string().min(100, 'Content must be at least 100 characters'),
  techTags: z.array(z.string()).optional(),
  featuredImage: z.string().url().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  clientName: z.string().max(100).optional(),
  isPublic: z.boolean().optional(),
  category: z.enum(['embedded', 'autonomy', 'sensors', 'power']),
});

export type ProjectInput = z.infer<typeof projectSchema>;

/**
 * Query Parameters Schema
 */
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).default('desc'),
});

export type PaginationInput = z.infer<typeof paginationSchema>;

/**
 * File Upload Schema
 */
export const fileUploadSchema = z.object({
  filename: z.string().max(255),
  contentType: z.string().regex(/^[a-z]+\/[a-z0-9\-\+\.]+$/),
  size: z.number().int().positive().max(10 * 1024 * 1024), // Max 10MB
  data: z.string(), // Base64 encoded
});

export type FileUploadInput = z.infer<typeof fileUploadSchema>;

/**
 * Email Schema
 */
export const emailSchema = z.object({
  to: z.union([
    z.string().email(),
    z.array(z.string().email()),
  ]),
  subject: z.string().min(1).max(200),
  html: z.string().min(1),
  text: z.string().optional(),
  from: z.string().email().optional(),
  replyTo: z.string().email().optional(),
});

export type EmailInput = z.infer<typeof emailSchema>;

/**
 * Workshop Schema
 */
export const workshopSchema = z.object({
  name: z.string().min(5).max(200),
  description: z.string().min(20).max(1000),
  syllabus: z.string().min(50),
  price: z.number().positive(),
  dates: z.array(z.string().datetime()),
  maxAttendees: z.number().int().positive(),
  isPublic: z.boolean().optional(),
});

export type WorkshopInput = z.infer<typeof workshopSchema>;

/**
 * ID Parameter Schema
 */
export const idParamSchema = z.object({
  id: z.string().cuid(),
});

export type IdParam = z.infer<typeof idParamSchema>;

/**
 * Slug Parameter Schema
 */
export const slugParamSchema = z.object({
  slug: z.string().min(1).max(200),
});

export type SlugParam = z.infer<typeof slugParamSchema>;

/**
 * Validate request body with Zod schema
 */
export async function validateRequest<T>(
  request: Request,
  schema: z.ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; error: z.ZodError }> {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error };
    }
    throw error;
  }
}

/**
 * Validate query parameters
 */
export function validateParams<T>(
  params: any,
  schema: z.ZodSchema<T>
): { success: true; data: T } | { success: false; error: z.ZodError } {
  try {
    const data = schema.parse(params);
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error };
    }
    throw error;
  }
}
