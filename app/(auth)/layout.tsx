export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'url(https://resend.com/static/product-pages/noise.png)',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-[380px] mx-auto px-6">
        {/* Logo */}
        <div className="mb-10 animate-in">
          <div className="flex items-center gap-2.5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-white"
            >
              <rect width="20" height="20" rx="4" fill="currentColor" />
              <path
                d="M5.5 7.5h9M5.5 10h9M5.5 12.5h5"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-[#FDFDFD] text-[15px] font-medium tracking-[-0.02em]">
              Tripoli
            </span>
          </div>
        </div>

        {/* Form */}
        <div className="animate-in-delay-1">
          {children}
        </div>

        {/* Footer */}
        <div className="mt-12 animate-in-delay-2">
          <div
            className="h-px w-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
            }}
          />
          <p className="text-[12px] text-white/20 mt-4 text-center tracking-[-0.01em]">
            Time tracking with facial recognition
          </p>
        </div>
      </div>
    </div>
  )
}
