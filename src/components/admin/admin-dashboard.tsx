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
  X,
  Earth
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BlogManagement } from './blog-management'
import { ProjectManagement } from './project-management'
import { ContactManagement } from './contact-management'
import { NewsletterManagement } from './newsletter-management'
import { DashboardOverview } from './dashboard-overview'
import { cn } from '@/lib/utils'

interface AdminDashboardProps {
  session: Session
}

export function AdminDashboard({ session }: AdminDashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  const navItems = [
    { value: 'overview', label: 'Overview', icon: LayoutDashboard },
    { value: 'blog', label: 'Blog', icon: FileText },
    { value: 'projects', label: 'Projects', icon: FolderKanban },
    { value: 'contacts', label: 'Contacts', icon: Mail },
    { value: 'newsletter', label: 'Newsletter', icon: Users },
  ]

  const handleSignOut = () => {
    signOut({ callbackUrl: '/admin/login' })
  }

  return (
    <div className="admin-surface flex h-screen overflow-hidden bg-gradient-to-br from-[#02060f] via-[#060f21] to-[#01040a] text-white">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } transition-all duration-300 bg-white/5 border-r border-white/10 overflow-hidden glass-card`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-border/60">
            <h1 className="text-2xl font-bold font-heading tracking-tight">EAR Lab</h1>
            <p className="text-sm text-white/60">Admin Command Center</p>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
              Main Menu
            </p>
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setActiveTab(item.value)}
                  className={cn(
                    'w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all',
                    activeTab === item.value
                      ? 'bg-gradient-to-r from-electric-blue/40 to-cyber-teal/40 text-white shadow-[0_10px_30px_rgba(4,16,40,0.6)]'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          <div className="p-4 border-t border-border/60">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-electric-blue to-cyber-teal flex items-center justify-center text-white font-semibold shadow-md">
                {session.user?.name?.[0]?.toUpperCase() || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{session.user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {session.user?.email}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full lift-hover"
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
        <header className="bg-white/5 border-b border-white/10 p-4 glass-card">
          <div className="flex items-center gap-4 justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:bg-white/10"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
            <div className="flex-1 flex items-center gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">Control Center</p>
                <h2 className="text-xl font-semibold font-heading">Admin Dashboard</h2>
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-white/30 text-white bg-white/5 hover:bg-white/10" asChild>
              <a href="/" target="_blank" rel="noreferrer">
                <Earth className="w-4 h-4 mr-2" />
                View Site
              </a>
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6 bg-transparent">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="flex flex-wrap gap-3 w-full bg-transparent">
              <TabsTrigger
                value="overview"
                className="gap-2 rounded-2xl border border-white/10 bg-white/5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-electric-blue data-[state=active]:to-cyber-teal data-[state=active]:text-white"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger
                value="blog"
                className="gap-2 rounded-2xl border border-white/10 bg-white/5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-electric-blue data-[state=active]:to-cyber-teal data-[state=active]:text-white"
              >
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Blog</span>
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="gap-2 rounded-2xl border border-white/10 bg-white/5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-electric-blue data-[state=active]:to-cyber-teal data-[state=active]:text-white"
              >
                <FolderKanban className="w-4 h-4" />
                <span className="hidden sm:inline">Projects</span>
              </TabsTrigger>
              <TabsTrigger
                value="contacts"
                className="gap-2 rounded-2xl border border-white/10 bg-white/5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-electric-blue data-[state=active]:to-cyber-teal data-[state=active]:text-white"
              >
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Contacts</span>
              </TabsTrigger>
              <TabsTrigger
                value="newsletter"
                className="gap-2 rounded-2xl border border-white/10 bg-white/5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-electric-blue data-[state=active]:to-cyber-teal data-[state=active]:text-white"
              >
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
