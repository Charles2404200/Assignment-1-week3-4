import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication',
}

/**
 * Auth route-group shell.
 *
 * Each page inside this group owns its own layout so the sign-in page can use a
 * full-width split panel. Pages that want the previous centred column render
 * `AuthCard` (see components/layout/AuthCard) themselves.
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-white dark:bg-zinc-950">{children}</div>
}
