import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  User,
  ShieldCheck,
  HardHat,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Eye,
  EyeOff,
  MapPinned,
  Building2,
  BellRing
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole, showNotification } = useApp();
  const [email, setEmail] = useState('citizen.demo@nagarsetu.gov.in');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCitizenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      switchRole('citizen');
      showNotification('Welcome back, Aarav Sharma. Your civic dashboard is ready.', 'success');
      navigate('/citizen/dashboard');
      setIsSubmitting(false);
    }, 350);
  };

  const quickAccessCards = [
    {
      title: 'Citizen Portal',
      description: 'Report, track, and resolve local civic issues',
      icon: User,
      accent: 'bg-[#4A154B]/10 text-[#4A154B]',
      action: () => {
        switchRole('citizen');
        navigate('/citizen/dashboard');
      }
    },
    {
      title: 'Municipal Admin',
      description: 'Monitor sanitation, roads, and field response',
      icon: ShieldCheck,
      accent: 'bg-[#007A5A]/10 text-[#007A5A]',
      action: () => navigate('/admin/login')
    },
    {
      title: 'Field Staff',
      description: 'Review assigned tickets and update work progress',
      icon: HardHat,
      accent: 'bg-[#ECB22E]/15 text-[#9E6A00]',
      action: () => {
        switchRole('staff');
        navigate('/staff/dashboard');
      }
    }
  ];

  return (
    <div className="min-h-[85vh] bg-[#F8F6F2] py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[28px] border border-[#EAE8E2] bg-white shadow-[0_30px_80px_rgba(26,23,24,0.08)]">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
          <div className="bg-[#F3EFEA] p-8 sm:p-10 lg:p-12 border-r border-[#EAE8E2]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4A154B] text-2xl font-black text-white shadow-sm">
                #
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#616061]">Civic operations</p>
                <h1 className="text-2xl font-black text-[#1D1C1D]">NagarSetu</h1>
              </div>
            </div>

            <div className="mt-10 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#4A154B]/10 px-3 py-1.5 text-[11px] font-extrabold text-[#4A154B]">
                <Sparkles className="h-3.5 w-3.5" />
                Trusted by 26 wards and 1.4L residents
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl font-black leading-tight tracking-tight text-[#1D1C1D] sm:text-5xl">
                  City services,
                  <span className="block text-[#007A5A]">made visible.</span>
                </h2>
                <p className="max-w-md text-sm leading-7 text-[#4A484A]">
                  Track complaints, coordinate municipal teams, and close civic issues with complete transparency from the first report to final resolution.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  'Photo-backed issue reporting with ward-level accountability',
                  'Live status tracking from citizen to municipal field staff',
                  'Smart SLA monitoring and escalation for critical infrastructure concerns'
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/80 p-3 border border-[#EAE8E2]">
                    <span className="mt-0.5 rounded-full bg-[#007A5A]/10 p-1 text-[#007A5A]">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    <p className="text-sm font-medium text-[#1D1C1D]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {quickAccessCards.map(({ title, description, icon: Icon, accent, action }) => (
                <button
                  key={title}
                  type="button"
                  onClick={action}
                  className="rounded-2xl border border-[#EAE8E2] bg-white p-3 text-left transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className={`mb-3 inline-flex rounded-xl p-2 ${accent}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-extrabold text-[#1D1C1D]">{title}</p>
                  <p className="mt-1 text-[11px] leading-5 text-[#616061]">{description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center bg-white p-8 sm:p-10 lg:p-12">
            <div className="w-full max-w-md">
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1D1C1D] text-white shadow-sm">
                  <MapPinned className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-black tracking-tight text-[#1D1C1D]">Welcome back</h3>
                <p className="mt-2 text-sm text-[#616061]">Sign in to continue to your civic workspace</p>
              </div>

              <div className="mb-6 rounded-2xl border border-[#EAE8E2] bg-[#F8F6F2] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#616061]">Demo access</p>
                    <p className="mt-1 text-sm font-bold text-[#1D1C1D]">Citizen login</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('citizen.demo@nagarsetu.gov.in');
                      setPassword('password123');
                    }}
                    className="text-[11px] font-extrabold text-[#007A5A] underline-offset-2 hover:underline"
                  >
                    Auto-fill
                  </button>
                </div>
                <div className="mt-3 rounded-xl bg-white p-3 text-[11px] text-[#4A484A] ring-1 ring-[#EAE8E2]">
                  <p><span className="font-bold text-[#1D1C1D]">Email:</span> citizen.demo@nagarsetu.gov.in</p>
                  <p><span className="font-bold text-[#1D1C1D]">Password:</span> password123</p>
                </div>
              </div>

              <form onSubmit={handleCitizenSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#1D1C1D]">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[#616061]" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-[#D4CEBF] bg-[#F8F6F2] py-3 pl-10 pr-4 text-sm font-semibold text-[#1D1C1D] placeholder:text-[#616061] focus:border-[#4A154B] focus:bg-white focus:outline-none"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#1D1C1D]">
                      Password
                    </label>
                    <button type="button" className="text-[11px] font-bold text-[#007A5A] hover:underline">
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-[#616061]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border border-[#D4CEBF] bg-[#F8F6F2] py-3 pl-10 pr-11 text-sm font-semibold text-[#1D1C1D] focus:border-[#4A154B] focus:bg-white focus:outline-none"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3.5 top-3.5 text-[#616061] transition hover:text-[#1D1C1D]"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#616061]">
                  <label className="flex items-center gap-2 font-medium">
                    <input type="checkbox" className="h-3.5 w-3.5 rounded border-[#D4CEBF] text-[#007A5A] focus:ring-[#007A5A]" defaultChecked />
                    Keep me signed in
                  </label>
                  <span className="inline-flex items-center gap-1 font-bold text-[#007A5A]">
                    <Building2 className="h-3.5 w-3.5" />
                    Secure access
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#007A5A] px-4 py-3.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#006046] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span>{isSubmitting ? 'Signing in...' : 'Sign in to dashboard'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <div className="my-6 flex items-center gap-3 text-[#616061]">
                <div className="h-px flex-1 bg-[#EAE8E2]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em]">or</span>
                <div className="h-px flex-1 bg-[#EAE8E2]" />
              </div>

              <div className="space-y-3 text-center text-sm text-[#616061]">
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="w-full rounded-xl border border-[#D4CEBF] bg-white px-4 py-3 font-bold text-[#1D1C1D] transition hover:bg-[#F3EFEA]"
                >
                  Create citizen account
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/admin/login')}
                  className="w-full rounded-xl border border-[#D4CEBF] bg-white px-4 py-3 font-bold text-[#1D1C1D] transition hover:bg-[#F3EFEA]"
                >
                  Sign in as municipal admin
                </button>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-[#F3EFEA] p-3 text-[11px] text-[#4A484A]">
                <BellRing className="h-3.5 w-3.5 text-[#E01E5A]" />
                All citizen account actions are protected with secure ward-level access.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
