'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { Session } from 'next-auth'
import { 
  LayoutDashboard, 
  FileText, 
  FolderKanban, 
  Mail, 
  Users, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BlogManagement } from './blog-management'
import { ProjectManagement } from './project-management'
import { ContactManagement } from './contact-management'
import { NewsletterManagement } from './newsletter-management'
import { DashboardOverview } from './dashboard-overview'

interface AdminDashboardProps {
  session: Session
}

export function AdminDashboard({ session }: AdminDashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleSignOut = () => {
    signOut({ callbackUrl: '/admin/login' })
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } transition-all duration-300 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-hidden`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">EAR Lab</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Admin Dashboard</p>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
              Main Menu
            </p>
            {/* Navigation items will be handled by tabs */}
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                {session.user?.name?.[0]?.toUpperCase() || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-gray-900 dark:text-white">{session.user?.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                  {session.user?.email}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Dashboard</h2>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6 bg-gray-100 dark:bg-gray-950">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 lg:w-auto bg-white dark:bg-gray-900">
              <TabsTrigger value="overview" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="blog" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Blog</span>
              </TabsTrigger>
              <TabsTrigger value="projects" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                <FolderKanban className="w-4 h-4" />
                <span className="hidden sm:inline">Projects</span>
              </TabsTrigger>
              <TabsTrigger value="contacts" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Contacts</span>
              </TabsTrigger>
              <TabsTrigger value="newsletter" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Newsletter</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <DashboardOverview />
            </TabsContent>

            <TabsContent value="blog">
              <BlogManagement />
            </TabsContent>

            <TabsContent value="projects">
              <ProjectManagement />
            </TabsContent>

            <TabsContent value="contacts">
              <ContactManagement />
            </TabsContent>

            <TabsContent value="newsletter">
              <NewsletterManagement />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
