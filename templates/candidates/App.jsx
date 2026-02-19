import { useState } from 'react'
import {
  LayoutDashboard, Users, Briefcase, CalendarCheck, GitBranch, BarChart3, Settings,
  Menu, X, Bell, Plus, Search, Filter, MoreHorizontal, ArrowUpRight, ArrowDownRight,
  UserPlus, Target, Clock, Mail, Phone, Building2, MapPin, Star,
  CheckCircle2, Circle, AlertCircle, Calendar, FileText, Eye,
  ChevronRight, Download, MessageSquare, Video, Award
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

/* ------------------------------------------------------------------ */
/*  MOCK DATA                                                          */
/* ------------------------------------------------------------------ */

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '#', active: true },
  { icon: Users, label: 'Candidates', href: '#candidates' },
  { icon: Briefcase, label: 'Jobs', href: '#jobs' },
  { icon: CalendarCheck, label: 'Interviews', href: '#interviews' },
  { icon: GitBranch, label: 'Pipeline', href: '#pipeline' },
  { icon: BarChart3, label: 'Reports', href: '#' },
  { icon: MessageSquare, label: 'Messages', href: '#', badge: 7 },
  { icon: Settings, label: 'Settings', href: '#' },
]

const kpiCards = [
  { label: 'Open Positions', value: '24', change: '+3 this week', trend: 'up', icon: Briefcase },
  { label: 'Total Candidates', value: '1,847', change: '+12.8%', trend: 'up', icon: Users },
  { label: 'Interviews This Week', value: '18', change: '+5', trend: 'up', icon: Video },
  { label: 'Offer Acceptance', value: '87.5%', change: '+4.2%', trend: 'up', icon: Award },
]

const candidates = [
  { id: 1, name: 'Jessica Park', role: 'Senior Frontend Engineer', email: 'jessica@email.com', phone: '+1 555-0301', location: 'San Francisco, CA', status: 'interview', stage: 'Technical', experience: '6 years', appliedDate: 'Feb 12, 2026', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face' },
  { id: 2, name: 'Marcus Johnson', role: 'Backend Developer', email: 'marcus@email.com', phone: '+1 555-0302', location: 'New York, NY', status: 'screening', stage: 'Resume Review', experience: '4 years', appliedDate: 'Feb 14, 2026', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face' },
  { id: 3, name: 'Sophia Chen', role: 'Product Designer', email: 'sophia@email.com', phone: '+1 555-0303', location: 'Austin, TX', status: 'offer', stage: 'Offer Extended', experience: '5 years', appliedDate: 'Feb 8, 2026', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face' },
  { id: 4, name: 'David Williams', role: 'DevOps Engineer', email: 'david@email.com', phone: '+1 555-0304', location: 'Seattle, WA', status: 'applied', stage: 'New Application', experience: '7 years', appliedDate: 'Feb 16, 2026', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face' },
  { id: 5, name: 'Emma Rodriguez', role: 'Data Scientist', email: 'emma@email.com', phone: '+1 555-0305', location: 'Chicago, IL', status: 'interview', stage: 'Final Round', experience: '3 years', appliedDate: 'Feb 10, 2026', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face' },
  { id: 6, name: 'Ryan Kim', role: 'Senior Frontend Engineer', email: 'ryan@email.com', phone: '+1 555-0306', location: 'Los Angeles, CA', status: 'hired', stage: 'Onboarding', experience: '8 years', appliedDate: 'Jan 28, 2026', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face' },
  { id: 7, name: 'Olivia Taylor', role: 'Product Manager', email: 'olivia@email.com', phone: '+1 555-0307', location: 'Denver, CO', status: 'rejected', stage: 'Closed', experience: '5 years', appliedDate: 'Feb 5, 2026', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face' },
  { id: 8, name: 'Alex Thompson', role: 'Backend Developer', email: 'alex@email.com', phone: '+1 555-0308', location: 'Portland, OR', status: 'screening', stage: 'Phone Screen', experience: '2 years', appliedDate: 'Feb 15, 2026', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&crop=face' },
]

const pipelineStages = [
  { stage: 'Applied', count: 486, borderColor: 'border-slate-400', cards: [
    { name: 'David Williams', role: 'DevOps Engineer', days: 2 },
    { name: 'Nina Patel', role: 'QA Engineer', days: 1 },
  ]},
  { stage: 'Screening', count: 124, borderColor: 'border-blue-500', cards: [
    { name: 'Marcus Johnson', role: 'Backend Developer', days: 4 },
    { name: 'Alex Thompson', role: 'Backend Developer', days: 3 },
  ]},
  { stage: 'Interview', count: 68, borderColor: 'border-amber-500', cards: [
    { name: 'Jessica Park', role: 'Sr. Frontend Engineer', days: 6 },
    { name: 'Emma Rodriguez', role: 'Data Scientist', days: 8 },
  ]},
  { stage: 'Offer', count: 18, borderColor: 'border-violet-500', cards: [
    { name: 'Sophia Chen', role: 'Product Designer', days: 10 },
  ]},
  { stage: 'Hired', count: 42, borderColor: 'border-emerald-500', cards: [
    { name: 'Ryan Kim', role: 'Sr. Frontend Engineer', days: 21 },
  ]},
]

const upcomingInterviews = [
  { candidate: 'Jessica Park', role: 'Senior Frontend Engineer', type: 'Technical', time: 'Today, 2:00 PM', interviewer: 'Sarah Chen' },
  { candidate: 'Emma Rodriguez', role: 'Data Scientist', type: 'Final Round', time: 'Today, 4:30 PM', interviewer: 'Mike Johnson' },
  { candidate: 'Marcus Johnson', role: 'Backend Developer', type: 'Phone Screen', time: 'Tomorrow, 10:00 AM', interviewer: 'Lisa Park' },
  { candidate: 'Alex Thompson', role: 'Backend Developer', type: 'Phone Screen', time: 'Tomorrow, 1:00 PM', interviewer: 'Sarah Chen' },
]

const openJobs = [
  { title: 'Senior Frontend Engineer', department: 'Engineering', applicants: 48, status: 'Active', posted: 'Feb 1, 2026' },
  { title: 'Backend Developer', department: 'Engineering', applicants: 62, status: 'Active', posted: 'Feb 5, 2026' },
  { title: 'Product Designer', department: 'Design', applicants: 35, status: 'Active', posted: 'Jan 28, 2026' },
  { title: 'Data Scientist', department: 'Data', applicants: 28, status: 'Active', posted: 'Feb 8, 2026' },
  { title: 'DevOps Engineer', department: 'Infrastructure', applicants: 19, status: 'Paused', posted: 'Feb 10, 2026' },
]

const filterTabs = ['All', 'Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected']

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const statusColors = {
    applied: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
    screening: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    interview: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    offer: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400',
    hired: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    rejected: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  }

  const jobStatusColors = {
    Active: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    Paused: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    Closed: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  }

  const filteredCandidates = activeFilter === 'All'
    ? candidates
    : candidates.filter(c => c.status === activeFilter.toLowerCase())

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-60 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold font-display">HireDesk</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-3 space-y-0.5">
          {sidebarLinks.map(({ icon: Icon, label, href, active, badge }) => (
            <a
              key={label}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4.5 h-4.5" />
              <span className="flex-1">{label}</span>
              {badge && (
                <span className="w-5 h-5 rounded-full bg-violet-600 text-white text-xs flex items-center justify-center">{badge}</span>
              )}
            </a>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">HR</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">HR Manager</p>
              <p className="text-xs text-slate-500 truncate">hr@company.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-60">
        {/* Header */}
        <header className="sticky top-0 h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden sm:block">
              <Input
                placeholder="Search candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-xs hidden sm:flex">
              <Download className="w-3.5 h-3.5 mr-1" /> Export
            </Button>
            <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25">
              <Plus className="w-4 h-4 mr-2" /> Add Candidate
            </Button>
            <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-violet-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold font-display">Recruitment Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage candidates and track your hiring pipeline</p>
          </div>

          {/* KPI Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiCards.map(({ label, value, change, trend, icon: Icon }) => (
              <Card key={label} className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-600/20 dark:from-violet-500/30 dark:to-purple-600/30 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold font-display mb-1">{value}</p>
                  <div className="flex items-center gap-1">
                    {trend === 'up' ? <ArrowUpRight className="w-4 h-4 text-emerald-500" /> : <ArrowDownRight className="w-4 h-4 text-red-500" />}
                    <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{change}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 overflow-x-auto w-fit">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                  activeFilter === tab
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Candidates Table */}
          <Card id="candidates" className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-display">Candidates</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Filter className="w-3.5 h-3.5 mr-1" /> Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800">
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Candidate</th>
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden md:table-cell">Role</th>
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden lg:table-cell">Location</th>
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Status</th>
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden sm:table-cell">Stage</th>
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden xl:table-cell">Experience</th>
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden lg:table-cell">Applied</th>
                      <th className="w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCandidates.map((c) => (
                      <tr key={c.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-3">
                            <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full object-cover" />
                            <div>
                              <p className="font-medium text-sm">{c.name}</p>
                              <p className="text-xs text-slate-500">{c.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-slate-600 dark:text-slate-400 hidden md:table-cell">{c.role}</td>
                        <td className="py-3 px-2 hidden lg:table-cell">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-slate-600 dark:text-slate-400 text-xs">{c.location}</span>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <span className={`px-2.5 py-1 text-xs font-medium rounded-full capitalize ${statusColors[c.status]}`}>
                            {c.status}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-slate-600 dark:text-slate-400 text-xs hidden sm:table-cell">{c.stage}</td>
                        <td className="py-3 px-2 text-slate-600 dark:text-slate-400 hidden xl:table-cell">{c.experience}</td>
                        <td className="py-3 px-2 text-slate-500 text-xs hidden lg:table-cell">{c.appliedDate}</td>
                        <td className="py-3 px-2">
                          <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Pipeline + Interviews */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Pipeline Board */}
            <div id="pipeline" className="lg:col-span-2">
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2">
                    <GitBranch className="w-5 h-5 text-violet-500" />
                    Hiring Pipeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 overflow-x-auto pb-2 -mx-1">
                    {pipelineStages.map((col) => (
                      <div key={col.stage} className="min-w-[180px] sm:min-w-[200px] flex-shrink-0">
                        <div className={`rounded-t-lg border-t-4 ${col.borderColor} bg-slate-50 dark:bg-slate-800/50 p-3`}>
                          <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{col.stage}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{col.count} candidates</p>
                        </div>
                        <div className="space-y-2 mt-2">
                          {col.cards.map((card) => (
                            <div
                              key={card.name}
                              className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
                            >
                              <p className="font-medium text-sm">{card.name}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{card.role}</p>
                              <p className="text-xs text-violet-600 dark:text-violet-400 mt-1">{card.days} days in stage</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Interviews */}
            <Card id="interviews" className="border-slate-200 dark:border-slate-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-display flex items-center gap-2">
                  <Video className="w-4 h-4 text-violet-500" />
                  Upcoming Interviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-0">
                  {upcomingInterviews.map((interview, i) => (
                    <div
                      key={i}
                      className={`py-3 ${i < upcomingInterviews.length - 1 ? 'border-b border-slate-100 dark:border-slate-800' : ''}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm">{interview.candidate}</p>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 font-medium">
                          {interview.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{interview.role}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-violet-600 dark:text-violet-400 font-medium">{interview.time}</span>
                        <span className="text-xs text-slate-500">w/ {interview.interviewer}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Open Jobs */}
          <Card id="jobs" className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-display flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-violet-500" />
                  Open Positions
                </CardTitle>
                <Button variant="outline" size="sm" className="text-xs">
                  <Plus className="w-3.5 h-3.5 mr-1" /> Post Job
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800">
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Position</th>
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden sm:table-cell">Department</th>
                      <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Applicants</th>
                      <th className="text-center py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden md:table-cell">Status</th>
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden lg:table-cell">Posted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {openJobs.map((job) => (
                      <tr key={job.title} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-2 font-medium">{job.title}</td>
                        <td className="py-3 px-2 text-slate-600 dark:text-slate-400 hidden sm:table-cell">{job.department}</td>
                        <td className="py-3 px-2 text-right font-semibold text-violet-600 dark:text-violet-400">{job.applicants}</td>
                        <td className="py-3 px-2 text-center hidden md:table-cell">
                          <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${jobStatusColors[job.status]}`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-slate-500 text-xs hidden lg:table-cell">{job.posted}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      )}
    </div>
  )
}

export default App
