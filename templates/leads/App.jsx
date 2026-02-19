import { useState } from 'react'
import {
  LayoutDashboard, Users, UserPlus, Target, TrendingUp, BarChart3, Settings,
  Menu, X, Bell, Plus, Search, Filter, MoreHorizontal, ArrowUpRight, ArrowDownRight,
  DollarSign, Clock, Mail, Phone, Building2, Globe, Linkedin, Star,
  ChevronDown, CheckCircle2, AlertCircle, Activity, Eye, Calendar,
  ArrowRight, Download, RefreshCw, Zap, MessageSquare
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

/* ------------------------------------------------------------------ */
/*  MOCK DATA                                                          */
/* ------------------------------------------------------------------ */

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '#', active: true },
  { icon: Users, label: 'All Leads', href: '#leads' },
  { icon: UserPlus, label: 'New Leads', href: '#' },
  { icon: Target, label: 'Qualified', href: '#' },
  { icon: TrendingUp, label: 'Pipeline', href: '#pipeline' },
  { icon: BarChart3, label: 'Reports', href: '#' },
  { icon: MessageSquare, label: 'Messages', href: '#', badge: 3 },
  { icon: Settings, label: 'Settings', href: '#' },
]

const kpiCards = [
  { label: 'Total Leads', value: '3,842', change: '+12.5%', trend: 'up', icon: Users },
  { label: 'Qualified Leads', value: '1,247', change: '+8.3%', trend: 'up', icon: Target },
  { label: 'Conversion Rate', value: '32.4%', change: '+2.1%', trend: 'up', icon: TrendingUp },
  { label: 'Avg Response Time', value: '2.4h', change: '-18min', trend: 'down', icon: Clock },
]

const leads = [
  { id: 1, name: 'Sarah Mitchell', company: 'TechVentures Inc', email: 'sarah@techventures.io', phone: '+1 555-0201', source: 'LinkedIn', status: 'qualified', score: 92, assignedTo: 'Alex Chen', lastActivity: '30 min ago', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face' },
  { id: 2, name: 'James Rodriguez', company: 'CloudScale Ltd', email: 'james@cloudscale.com', phone: '+1 555-0202', source: 'Website', status: 'new', score: 78, assignedTo: 'Maria Lopez', lastActivity: '2h ago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face' },
  { id: 3, name: 'Emily Watson', company: 'DataPrime Solutions', email: 'emily@dataprime.co', phone: '+1 555-0203', source: 'Referral', status: 'contacted', score: 85, assignedTo: 'Alex Chen', lastActivity: '1h ago', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face' },
  { id: 4, name: 'Michael Park', company: 'InnovateTech', email: 'michael@innovatetech.io', phone: '+1 555-0204', source: 'Google Ads', status: 'proposal', score: 88, assignedTo: 'David Kim', lastActivity: '3h ago', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face' },
  { id: 5, name: 'Lisa Chen', company: 'GrowthLab', email: 'lisa@growthlab.com', phone: '+1 555-0205', source: 'LinkedIn', status: 'qualified', score: 95, assignedTo: 'Maria Lopez', lastActivity: '45 min ago', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face' },
  { id: 6, name: 'Robert Taylor', company: 'NexGen Systems', email: 'robert@nexgen.io', phone: '+1 555-0206', source: 'Cold Email', status: 'new', score: 62, assignedTo: 'Alex Chen', lastActivity: '5h ago', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face' },
  { id: 7, name: 'Amanda Foster', company: 'BrightPath Co', email: 'amanda@brightpath.co', phone: '+1 555-0207', source: 'Webinar', status: 'contacted', score: 74, assignedTo: 'David Kim', lastActivity: '1 day ago', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face' },
  { id: 8, name: 'Daniel Kim', company: 'Apex Digital', email: 'daniel@apexdigital.com', phone: '+1 555-0208', source: 'Website', status: 'lost', score: 45, assignedTo: 'Maria Lopez', lastActivity: '3 days ago', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&crop=face' },
]

const leadSources = [
  { source: 'LinkedIn', count: 842, percent: 28, color: 'bg-blue-500' },
  { source: 'Website', count: 724, percent: 24, color: 'bg-emerald-500' },
  { source: 'Google Ads', count: 612, percent: 20, color: 'bg-amber-500' },
  { source: 'Referral', count: 486, percent: 16, color: 'bg-violet-500' },
  { source: 'Cold Email', count: 234, percent: 8, color: 'bg-pink-500' },
  { source: 'Webinar', count: 124, percent: 4, color: 'bg-cyan-500' },
]

const pipelineFunnel = [
  { stage: 'New', count: 1248, value: '$2.4M', percent: 100 },
  { stage: 'Contacted', count: 864, value: '$1.8M', percent: 69 },
  { stage: 'Qualified', count: 542, value: '$1.2M', percent: 43 },
  { stage: 'Proposal', count: 286, value: '$680K', percent: 23 },
  { stage: 'Won', count: 124, value: '$320K', percent: 10 },
]

const recentActivity = [
  { icon: UserPlus, text: 'New lead "Sarah Mitchell" from LinkedIn', time: '30 min ago' },
  { icon: Mail, text: 'Follow-up email sent to James Rodriguez', time: '1h ago' },
  { icon: Phone, text: 'Call completed with Emily Watson', time: '2h ago' },
  { icon: CheckCircle2, text: 'Lead "Lisa Chen" qualified — score 95', time: '3h ago' },
  { icon: Calendar, text: 'Demo scheduled with Michael Park', time: '4h ago' },
  { icon: Star, text: 'Lead "Amanda Foster" scored above threshold', time: '5h ago' },
]

const filterTabs = ['All', 'New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost']

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const statusColors = {
    new: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    contacted: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    qualified: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    proposal: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400',
    won: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    lost: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  }

  const scoreColor = (score) => {
    if (score >= 80) return 'text-emerald-600 dark:text-emerald-400'
    if (score >= 60) return 'text-amber-600 dark:text-amber-400'
    return 'text-red-600 dark:text-red-400'
  }

  const filteredLeads = activeFilter === 'All'
    ? leads
    : leads.filter(l => l.status === activeFilter.toLowerCase())

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-60 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold font-display">LeadFlow</span>
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
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4.5 h-4.5" />
              <span className="flex-1">{label}</span>
              {badge && (
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">{badge}</span>
              )}
            </a>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-sm font-bold">AC</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Alex Chen</p>
              <p className="text-xs text-slate-500 truncate">Sales Manager</p>
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
                placeholder="Search leads..."
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
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-lg shadow-blue-500/25">
              <Plus className="w-4 h-4 mr-2" /> Add Lead
            </Button>
            <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold font-display">Lead Management</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Track, qualify, and convert your leads</p>
          </div>

          {/* KPI Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiCards.map(({ label, value, change, trend, icon: Icon }) => (
              <Card key={label} className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-600/20 dark:from-blue-500/30 dark:to-cyan-600/30 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold font-display mb-1">{value}</p>
                  <div className="flex items-center gap-1">
                    {trend === 'up' ? <ArrowUpRight className="w-4 h-4 text-emerald-500" /> : <ArrowDownRight className="w-4 h-4 text-emerald-500" />}
                    <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{change}</span>
                    <span className="text-xs text-slate-400 ml-1">vs last month</span>
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

          {/* Leads Table */}
          <Card id="leads" className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-display">All Leads</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Filter className="w-3.5 h-3.5 mr-1" /> Filter
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    <RefreshCw className="w-3.5 h-3.5 mr-1" /> Refresh
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800">
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Lead</th>
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden md:table-cell">Company</th>
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden lg:table-cell">Source</th>
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Status</th>
                      <th className="text-center py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden sm:table-cell">Score</th>
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden xl:table-cell">Assigned To</th>
                      <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden lg:table-cell">Last Activity</th>
                      <th className="w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-3">
                            <img src={lead.avatar} alt={lead.name} className="w-8 h-8 rounded-full object-cover" />
                            <div>
                              <p className="font-medium text-sm">{lead.name}</p>
                              <p className="text-xs text-slate-500">{lead.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-2 hidden md:table-cell">
                          <div className="flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-slate-600 dark:text-slate-400">{lead.company}</span>
                          </div>
                        </td>
                        <td className="py-3 px-2 hidden lg:table-cell">
                          <span className="text-slate-600 dark:text-slate-400">{lead.source}</span>
                        </td>
                        <td className="py-3 px-2">
                          <span className={`px-2.5 py-1 text-xs font-medium rounded-full capitalize ${statusColors[lead.status]}`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-center hidden sm:table-cell">
                          <span className={`font-bold text-sm ${scoreColor(lead.score)}`}>{lead.score}</span>
                        </td>
                        <td className="py-3 px-2 text-slate-600 dark:text-slate-400 hidden xl:table-cell">{lead.assignedTo}</td>
                        <td className="py-3 px-2 text-right text-xs text-slate-500 hidden lg:table-cell">{lead.lastActivity}</td>
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

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Lead Sources */}
            <div className="lg:col-span-2">
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display flex items-center gap-2">
                      <Globe className="w-5 h-5 text-blue-500" />
                      Lead Sources
                    </CardTitle>
                    <Button variant="outline" size="sm" className="text-xs">View All</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leadSources.map((src) => (
                      <div key={src.source} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${src.color}`} />
                            <span className="font-medium">{src.source}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-slate-500 dark:text-slate-400">{src.count} leads</span>
                            <span className="font-medium w-10 text-right">{src.percent}%</span>
                          </div>
                        </div>
                        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${src.color} transition-all`} style={{ width: `${src.percent}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-display">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-0">
                  {recentActivity.map((item, i) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={i}
                        className={`flex gap-3 py-3 ${i < recentActivity.length - 1 ? 'border-b border-slate-100 dark:border-slate-800' : ''}`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-900 dark:text-slate-100">{item.text}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.time}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pipeline Funnel */}
          <Card id="pipeline" className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                Conversion Funnel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pipelineFunnel.map((stage, i) => (
                  <div key={stage.stage} className="flex items-center gap-4">
                    <div className="w-24 text-sm font-medium shrink-0">{stage.stage}</div>
                    <div className="flex-1">
                      <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden relative">
                        <div
                          className="h-full rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 transition-all flex items-center justify-end pr-3"
                          style={{ width: `${stage.percent}%` }}
                        >
                          {stage.percent > 15 && (
                            <span className="text-xs font-bold text-white">{stage.count}</span>
                          )}
                        </div>
                        {stage.percent <= 15 && (
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-600 dark:text-slate-400">{stage.count}</span>
                        )}
                      </div>
                    </div>
                    <div className="w-20 text-right">
                      <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{stage.value}</p>
                      <p className="text-xs text-slate-500">{stage.percent}%</p>
                    </div>
                  </div>
                ))}
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
