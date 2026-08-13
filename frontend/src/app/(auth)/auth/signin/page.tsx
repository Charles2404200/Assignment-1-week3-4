'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { AlertCircle, Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'
import { FullPageSpinner } from '@/components/shared/LoadingSpinner'

export default function SignInPage() {
  const router = useRouter()
  const { user, loading, signInWithEmail, signInWithGoogle } = useAuth()

  // Presentation-only mirror of the message that already goes to the toast, so
  // the failure is also readable as a persistent alert. See design-spec § 4.5.
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (!loading && user) {
      router.replace('/team')
    }
  }, [loading, user, router])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('verification') === 'sent') {
      toast.success('Verification email sent. Verify your email, then sign in.')
    }
  }, [])

  if (loading) return <FullPageSpinner />

  const onSubmit = async (data: LoginInput) => {
    setFormError(null)
    try {
      await signInWithEmail(data.email, data.password)
      toast.success('Signed in successfully')
      router.replace('/team')
      router.refresh()
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('email-not-verified')) {
        toast.error('Please verify your email before signing in.')
        setFormError('Please verify your email before signing in.')
      } else {
        toast.error('Invalid email or password')
        setFormError('Invalid email or password')
      }
    }
  }

  const handleGoogleSignIn = async () => {
    setFormError(null)
    try {
      await signInWithGoogle()
      router.replace('/team')
    } catch {
      toast.error('Google sign-in failed. Please try again.')
      setFormError('Google sign-in failed. Please try again.')
    }
  }

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Decorative brand panel. Holds no controls, so hiding it below lg costs
          keyboard users nothing. */}
      <aside className="from-brand-700 to-brand-900 hidden flex-col justify-between bg-linear-160 p-12 text-white lg:flex">
        <span className="inline-flex items-center gap-2.5 text-base font-bold tracking-tight">
          <span className="text-brand-700 grid size-8 place-items-center rounded-md bg-white text-sm font-extrabold">
            G10
          </span>
          Group 10
        </span>

        <div>
          <h2 className="mb-3 max-w-[22ch] text-3xl leading-tight font-bold">
            Welcome back to the Group 10 workspace.
          </h2>
          <p className="text-brand-200 max-w-[40ch] text-[0.9375rem] leading-relaxed">
            Sign in to view your team — who does what, and how to reach them. Same account, new
            look.
          </p>
        </div>

        <span className="text-brand-200 text-[0.8125rem]">COSC2408 Capstone · Mock Sprint</span>
      </aside>

      <main className="flex items-center justify-center bg-white px-4 py-8 dark:bg-zinc-950">
        <div className="w-full max-w-sm">
          <div className="mb-7 text-center">
            <div
              aria-hidden="true"
              className="bg-brand-600 mx-auto mb-4 grid size-10 place-items-center rounded-md text-sm font-extrabold text-white"
            >
              G10
            </div>
            <h1 className="mb-1.5 text-2xl font-bold tracking-tight">Sign in</h1>
            <p className="text-sm text-zinc-500">Enter your credentials to continue</p>
          </div>

          {formError && (
            <div
              role="alert"
              aria-live="polite"
              className="mb-5 flex gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-[0.8125rem] leading-snug text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
            >
              <AlertCircle className="mt-px size-4 shrink-0" aria-hidden="true" />
              <span>
                <strong className="block font-semibold">Sign-in failed</strong>
                {formError}
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="focus-visible:outline-brand-600 flex w-full items-center justify-center gap-2.5 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <svg className="size-4" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          <div className="my-5 flex items-center gap-3 text-[0.6875rem] tracking-widest text-zinc-400 uppercase">
            <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
            or
            <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className="focus-visible:outline-brand-600 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm shadow-sm placeholder:text-zinc-400 focus-visible:outline-2 focus-visible:outline-offset-2 aria-invalid:border-red-600 dark:border-zinc-700 dark:bg-zinc-900"
                placeholder="you@example.com"
                {...register('email')}
              />
              {errors.email && (
                <p
                  id="email-error"
                  className="flex items-center gap-1.5 text-xs text-red-700 dark:text-red-400"
                  role="alert"
                >
                  <AlertCircle className="size-3 shrink-0" aria-hidden="true" />
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
                className="focus-visible:outline-brand-600 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm shadow-sm placeholder:text-zinc-400 focus-visible:outline-2 focus-visible:outline-offset-2 aria-invalid:border-red-600 dark:border-zinc-700 dark:bg-zinc-900"
                placeholder="••••••••"
                {...register('password')}
              />
              {errors.password && (
                <p
                  id="password-error"
                  className="flex items-center gap-1.5 text-xs text-red-700 dark:text-red-400"
                  role="alert"
                >
                  <AlertCircle className="size-3 shrink-0" aria-hidden="true" />
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-brand-600 hover:bg-brand-700 focus-visible:outline-brand-600 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500">
            Don&apos;t have an account?{' '}
            <Link
              href="/auth/signup"
              className="text-brand-600 focus-visible:outline-brand-600 dark:text-brand-500 rounded font-medium hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Create one
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
