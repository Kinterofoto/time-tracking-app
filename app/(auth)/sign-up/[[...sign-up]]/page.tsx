import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Crear cuenta</h2>
        <p className="text-muted-foreground mt-2">
          Comienza a gestionar el tiempo de tu equipo hoy
        </p>
      </div>
      <SignUp
        appearance={{
          elements: {
            rootBox: 'w-full',
            card: 'shadow-none p-0 w-full',
            headerTitle: 'hidden',
            headerSubtitle: 'hidden',
            socialButtonsBlockButton:
              'border border-border rounded-xl h-11 font-medium',
            formButtonPrimary:
              'h-11 rounded-xl text-sm font-semibold',
            formFieldInput:
              'h-11 rounded-xl border-border bg-background',
            formFieldLabel: 'text-sm font-medium text-foreground',
            footerAction: 'mt-4',
            footerActionLink: 'font-semibold',
            dividerLine: 'bg-border',
            dividerText: 'text-muted-foreground text-xs',
            identityPreviewEditButton: 'text-violet-500',
          },
        }}
      />
    </div>
  )
}
