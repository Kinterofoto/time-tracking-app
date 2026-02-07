import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-[28px] font-medium tracking-[-0.04em] text-[#FDFDFD] leading-tight"
          style={{
            background: 'linear-gradient(97deg, #ffffff 30%, rgba(255,255,255,0.50) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Create your account
        </h1>
        <p className="text-[14px] text-white/40 mt-2 tracking-[-0.01em]">
          Start tracking your team today
        </p>
      </div>
      <SignUp
        appearance={{
          elements: {
            rootBox: 'w-full',
            card: 'shadow-none p-0 w-full bg-transparent',
            socialButtonsBlockButton: 'h-10 text-[14px]',
            formButtonPrimary: 'h-10 text-[14px]',
            formFieldInput: 'h-10 text-[14px]',
            formFieldLabel: 'text-[13px]',
            footerAction: 'mt-6',
          },
        }}
      />
    </div>
  )
}
