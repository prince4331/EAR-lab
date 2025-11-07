/**
 * Project Service
 * Handles project operations, case studies, and queries
 */

import { prisma } from '@/lib/db';

export interface ProjectData {
  title: string;
  slug: string;
  summary: string;
  contentMarkdown: string;
  techTags?: string[];
  featuredImage?: string;
  startDate: Date;
  endDate?: Date;
  clientName?: string;
  isPublic?: boolean;
  category: 'embedded' | 'autonomy' | 'sensors' | 'power';
}

export interface ProjectFilters {
  category?: string;
  isPublic?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
}

class ProjectService {
  /**
   * Create a new project
   */
  async createProject(data: ProjectData) {
    try {
      const project = await prisma.project.create({
        data: {
          title: data.title,
          slug: data.slug,
          summary: data.summary,
          contentMarkdown: data.contentMarkdown,
          techTags: JSON.stringify(data.techTags || []),
          featuredImage: data.featuredImage,
          startDate: data.startDate,
          endDate: data.endDate,
          clientName: data.clientName,
          isPublic: data.isPublic ?? true,
          category: data.category,
        },
      });

      return { success: true, project };
    } catch (error) {
      console.error('Error creating project:', error);
      return { success: false, error: 'Failed to create project' };
    }
  }

  /**
   * Update project
   */
  async updateProject(id: string, data: Partial<ProjectData>) {
    try {
      const updateData: any = { ...data };

      // Convert tags array to JSON string
      if (data.techTags) {
        updateData.techTags = JSON.stringify(data.techTags);
      }

      const project = await prisma.project.update({
        where: { id },
        data: updateData,
      });

      return { success: true, project };
    } catch (error) {
      console.error('Error updating project:', error);
      return { success: false, error: 'Failed to update project' };
    }
  }

  /**
   * Delete project
   */
  async deleteProject(id: string) {
    try {
      await prisma.project.delete({
        where: { id },
      });

      return { success: true };
    } catch (error) {
      console.error('Error deleting project:', error);
      return { success: false, error: 'Failed to delete project' };
    }
  }

  /**
   * Get project by ID
   */
  async getProjectById(id: string) {
    try {
      const project = await prisma.project.findUnique({
        where: { id },
        include: {
          caseStudy: true,
        },
      });

      if (project) {
        return {
          ...project,
          techTags: JSON.parse(project.techTags),
        };
      }

      return null;
    } catch (error) {
      console.error('Error fetching project:', error);
      return null;
    }
  }

  /**
   * Get project by slug
   */
  async getProjectBySlug(slug: string) {
    try {
      const project = await prisma.project.findUnique({
        where: { slug },
        include: {
          caseStudy: true,
        },
      });

      if (project) {
        return {
          ...project,
          techTags: JSON.parse(project.techTags),
        };
      }

      return null;
    } catch (error) {
      console.error('Error fetching project:', error);
      return null;
    }
  }

  /**
   * Get all projects with filters
   */
  async getProjects(filters?: ProjectFilters) {
    try {
      const where: any = {};

      if (filters?.category) {
        where.category = filters.category;
      }

      if (filters?.isPublic !== undefined) {
        where.isPublic = filters.isPublic;
      }

      if (filters?.search) {
        where.OR = [
          { title: { contains: filters.search, mode: 'insensitive' } },
          { summary: { contains: filters.search, mode: 'insensitive' } },
          { contentMarkdown: { contains: filters.search, mode: 'insensitive' } },
        ];
      }

      const [projects, total] = await Promise.all([
        prisma.project.findMany({
          where,
          include: {
            caseStudy: true,
          },
          orderBy: { startDate: 'desc' },
          take: filters?.limit || 50,
          skip: filters?.offset || 0,
        }),
        prisma.project.count({ where }),
      ]);

      // Parse tags JSON for each project
      const projectsWithParsedTags = projects.map(project => ({
        ...project,
        techTags: JSON.parse(project.techTags),
      }));

      return { projects: projectsWithParsedTags, total };
    } catch (error) {
      console.error('Error fetching projects:', error);
      return { projects: [], total: 0 };
    }
  }

  /**
   * Get public projects (public API)
   */
  async getPublicProjects(filters?: {
    category?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }) {
    return this.getProjects({
      ...filters,
      isPublic: true,
    });
  }

  /**
   * Get featured projects
   */
  async getFeaturedProjects(limit: number = 3) {
    const { projects } = await this.getPublicProjects({ limit });
    return projects;
  }

  /**
   * Get projects by category
   */
  async getProjectsByCategory(category: string, limit?: number) {
    return this.getPublicProjects({ category, limit });
  }

  /**
   * Add case study to project
   */
  async addCaseStudy(projectId: string, pdfUrl: string) {
    try {
      const caseStudy = await prisma.caseStudy.create({
        data: {
          projectId,
          pdfUrl,
        },
      });

      return { success: true, caseStudy };
    } catch (error) {
      console.error('Error adding case study:', error);
      return { success: false, error: 'Failed to add case study' };
    }
  }

  /**
   * Update case study
   */
  async updateCaseStudy(id: string, pdfUrl: string) {
    try {
      const caseStudy = await prisma.caseStudy.update({
        where: { id },
        data: { pdfUrl },
      });

      return { success: true, caseStudy };
    } catch (error) {
      console.error('Error updating case study:', error);
      return { success: false, error: 'Failed to update case study' };
    }
  }

  /**
   * Delete case study
   */
  async deleteCaseStudy(id: string) {
    try {
      await prisma.caseStudy.delete({
        where: { id },
      });

      return { success: true };
    } catch (error) {
      console.error('Error deleting case study:', error);
      return { success: false, error: 'Failed to delete case study' };
    }
  }

  /**
   * Generate slug from title
   */
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  /**
   * Check if slug is unique
   */
  async isSlugUnique(slug: string, excludeId?: string): Promise<boolean> {
    try {
      const where: any = { slug };
      if (excludeId) {
        where.id = { not: excludeId };
      }

      const existing = await prisma.project.findFirst({ where });
      return !existing;
    } catch (error) {
      console.error('Error checking slug uniqueness:', error);
      return false;
    }
  }
}

// Export singleton instance
export const projectService = new ProjectService();
