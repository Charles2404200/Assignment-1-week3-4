/**
 * The centred `max-w-sm` column the auth route group used to apply in its layout.
 *
 * It moved into a component when the sign-in page took over its own layout, so
 * the other auth pages keep the exact presentation they had before.
 */
export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  )
}
