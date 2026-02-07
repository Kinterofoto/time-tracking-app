import { Clock, Shield, Users, Zap } from 'lucide-react'

const features = [
  {
    icon: Clock,
    title: 'Control Total',
    description: 'Registra entrada y salida con precisión absoluta',
  },
  {
    icon: Shield,
    title: 'Reconocimiento Facial',
    description: 'Seguridad biométrica de última generación',
  },
  {
    icon: Users,
    title: 'Gestión de Equipo',
    description: 'Dashboard intuitivo para tu organización',
  },
  {
    icon: Zap,
    title: 'Reportes Instantáneos',
    description: 'Exporta datos en PDF, Excel y más',
  },
]

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-gray-950 via-violet-950 to-gray-950">
        {/* Animated background orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-2/3 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float-slow" />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <div className="animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <span className="text-white text-xl font-bold tracking-tight">
                Tripoli
              </span>
            </div>
          </div>

          {/* Hero text */}
          <div className="space-y-8">
            <div className="animate-slide-up">
              <h1 className="text-5xl font-bold text-white leading-tight">
                El tiempo es tu
                <br />
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent animate-gradient">
                  recurso más valioso
                </span>
              </h1>
              <p className="mt-4 text-lg text-gray-400 max-w-md">
                Controla la asistencia de tu equipo con reconocimiento facial.
                Simple, seguro, inteligente.
              </p>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-2 gap-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group p-4 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
                >
                  <feature.icon className="w-5 h-5 text-violet-400 mb-2 group-hover:text-violet-300 transition-colors" />
                  <h3 className="text-sm font-semibold text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-sm text-gray-600">
              Trusted by teams worldwide
            </p>
          </div>
        </div>
      </div>

      {/* Right panel - Auth form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-background relative">
        {/* Subtle gradient accent */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-violet-500/[0.03] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-indigo-500/[0.03] to-transparent pointer-events-none" />

        <div className="w-full max-w-[440px] relative z-10 animate-slide-up">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Tripoli</span>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
