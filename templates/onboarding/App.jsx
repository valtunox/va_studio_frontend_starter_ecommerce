import { useState } from 'react'
import {
  Rocket, User, Building2, Settings, CheckCircle2, ArrowRight, ArrowLeft,
  Sun, Moon, Upload, Globe, Palette, Bell, Shield, Zap, Mail,
  Briefcase, Users, MapPin, Phone, Camera, Sparkles, PartyPopper
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

/* ------------------------------------------------------------------ */
/*  STEP DATA                                                          */
/* ------------------------------------------------------------------ */

const steps = [
  { id: 1, label: 'Profile', icon: User },
  { id: 2, label: 'Company', icon: Building2 },
  { id: 3, label: 'Preferences', icon: Settings },
  { id: 4, label: 'Complete', icon: CheckCircle2 },
]

const roleOptions = [
  { value: 'developer', label: 'Developer', icon: '{}' },
  { value: 'designer', label: 'Designer', icon: 'Aa' },
  { value: 'product', label: 'Product Manager', icon: 'PM' },
  { value: 'founder', label: 'Founder / CEO', icon: 'F' },
  { value: 'marketing', label: 'Marketing', icon: 'M' },
  { value: 'other', label: 'Other', icon: '...' },
]

const companySizes = ['1-10', '11-50', '51-200', '201-1000', '1000+']

const industries = ['Technology', 'Finance', 'Healthcare', 'Education', 'E-Commerce', 'Marketing', 'Other']

const templatePreferences = [
  { id: 'saas', label: 'SaaS', desc: 'Landing pages & dashboards' },
  { id: 'ecommerce', label: 'E-Commerce', desc: 'Online stores & catalogs' },
  { id: 'crm', label: 'CRM', desc: 'Customer management' },
  { id: 'dashboard', label: 'Dashboard', desc: 'Analytics & reporting' },
  { id: 'blog', label: 'Blog', desc: 'Content & publishing' },
  { id: 'portfolio', label: 'Portfolio', desc: 'Personal & agency sites' },
]

const integrations = [
  { id: 'github', label: 'GitHub', connected: false },
  { id: 'slack', label: 'Slack', connected: false },
  { id: 'stripe', label: 'Stripe', connected: false },
  { id: 'vercel', label: 'Vercel', connected: false },
]

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [darkMode, setDarkMode] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [role, setRole] = useState('')
  const [phone, setPhone] = useState('')

  const [companyName, setCompanyName] = useState('')
  const [companySize, setCompanySize] = useState('')
  const [industry, setIndustry] = useState('')
  const [website, setWebsite] = useState('')

  const [selectedTemplates, setSelectedTemplates] = useState([])
  const [notifications, setNotifications] = useState(true)

  const toggleDark = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const toggleTemplate = (id) => {
    setSelectedTemplates(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    )
  }

  const nextStep = () => setCurrentStep(Math.min(4, currentStep + 1))
  const prevStep = () => setCurrentStep(Math.max(1, currentStep - 1))

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans flex flex-col">

      {/* Header */}
      <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold font-display text-slate-900 dark:text-white">VA Studio</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDark}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          {currentStep < 4 && (
            <button className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
              Skip for now
            </button>
          )}
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4">
        <div className="max-w-2xl mx-auto">
          {/* Steps */}
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isComplete = currentStep > step.id
              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                      isComplete
                        ? 'bg-emerald-500 text-white'
                        : isActive
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}>
                      {isComplete ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                    </div>
                    <span className={`text-sm font-medium hidden sm:block ${
                      isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-12 sm:w-20 h-0.5 mx-2 sm:mx-4 rounded-full ${
                      currentStep > step.id ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
          {/* Progress bar */}
          <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 flex items-start justify-center px-6 py-10">
        <div className="w-full max-w-2xl">

          {/* Step 1: Profile */}
          {currentStep === 1 && (
            <Card className="border-slate-200 dark:border-slate-800">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 dark:from-indigo-500/30 dark:to-violet-500/30 flex items-center justify-center mx-auto mb-4">
                    <User className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">Set up your profile</h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-2">Tell us a bit about yourself</p>
                </div>

                {/* Avatar Upload */}
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-slate-400" />
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg">
                      <Upload className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">First name</Label>
                    <Input
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="h-11 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Last name</Label>
                    <Input
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="h-11 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone number (optional)</Label>
                  <div className="relative">
                    <Input
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-11 pl-10 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg"
                    />
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Your role</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {roleOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setRole(opt.value)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          role === opt.value
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <span className="text-lg font-mono font-bold block mb-1">{opt.icon}</span>
                        <span className="text-xs font-medium">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Company */}
          {currentStep === 2 && (
            <Card className="border-slate-200 dark:border-slate-800">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 dark:from-indigo-500/30 dark:to-violet-500/30 flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">About your company</h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-2">Help us personalize your experience</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Company name</Label>
                    <div className="relative">
                      <Input
                        placeholder="Acme Inc."
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="h-11 pl-10 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg"
                      />
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Website (optional)</Label>
                    <div className="relative">
                      <Input
                        placeholder="https://yourcompany.com"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="h-11 pl-10 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg"
                      />
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Company size</Label>
                    <div className="flex flex-wrap gap-2">
                      {companySizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setCompanySize(size)}
                          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                            companySize === size
                              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400'
                              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Industry</Label>
                    <div className="flex flex-wrap gap-2">
                      {industries.map((ind) => (
                        <button
                          key={ind}
                          onClick={() => setIndustry(ind)}
                          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                            industry === ind
                              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400'
                              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                          }`}
                        >
                          {ind}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Preferences */}
          {currentStep === 3 && (
            <Card className="border-slate-200 dark:border-slate-800">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 dark:from-indigo-500/30 dark:to-violet-500/30 flex items-center justify-center mx-auto mb-4">
                    <Palette className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">Your preferences</h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-2">Choose templates you are interested in</p>
                </div>

                <div className="space-y-6">
                  {/* Template Interests */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Template interests</Label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {templatePreferences.map((tpl) => (
                        <button
                          key={tpl.id}
                          onClick={() => toggleTemplate(tpl.id)}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            selectedTemplates.includes(tpl.id)
                              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className={`font-medium text-sm ${
                              selectedTemplates.includes(tpl.id)
                                ? 'text-indigo-700 dark:text-indigo-400'
                                : 'text-slate-900 dark:text-white'
                            }`}>{tpl.label}</span>
                            {selectedTemplates.includes(tpl.id) && (
                              <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            )}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{tpl.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notifications */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                        <Bell className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">Email notifications</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Get updates about new templates and features</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setNotifications(!notifications)}
                      className={`relative w-11 h-6 rounded-full transition-colors ${notifications ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                    >
                      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notifications ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </button>
                  </div>

                  {/* Integrations */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Connect integrations (optional)</Label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {integrations.map((int) => (
                        <div
                          key={int.id}
                          className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700"
                        >
                          <span className="text-sm font-medium text-slate-900 dark:text-white">{int.label}</span>
                          <Button variant="outline" size="sm" className="text-xs h-8">Connect</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Complete */}
          {currentStep === 4 && (
            <Card className="border-slate-200 dark:border-slate-800">
              <CardContent className="p-8">
                <div className="text-center">
                  {/* Success Icon */}
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 animate-pulse opacity-20" />
                    <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold font-display text-slate-900 dark:text-white mb-3">You're all set!</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-lg mb-8 max-w-md mx-auto">
                    Your account is ready. Start exploring templates and build something amazing.
                  </p>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-8 max-w-sm mx-auto">
                    {[
                      { value: '20+', label: 'Templates' },
                      { value: 'AI', label: 'Powered' },
                      { value: '24/7', label: 'Support' },
                    ].map(({ value, label }) => (
                      <div key={label} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                        <p className="text-xl font-bold font-display text-indigo-600 dark:text-indigo-400">{value}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button className="h-12 px-8 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-xl font-medium shadow-lg shadow-indigo-600/25">
                      <Sparkles className="w-4 h-4 mr-2" /> Explore Templates
                    </Button>
                    <Button variant="outline" className="h-12 px-8 rounded-xl border-slate-200 dark:border-slate-700">
                      Go to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex items-center justify-between mt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="border-slate-200 dark:border-slate-700 disabled:opacity-40"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Step {currentStep} of {steps.length}
              </div>
              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-600/25"
              >
                {currentStep === 3 ? 'Complete Setup' : 'Continue'} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
