import { Icon } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { TeamMember } from "../types/team_member"


export default function TeamMember({
    name,
    initials,
    nickname,
    role,
    interests,
    icon : Icon
} : TeamMember
) {
    return (
        <article
              key={name}
              className="group rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 text-lg font-bold text-white dark:bg-white dark:text-zinc-900">
                  {initials}
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {name}
                    {nickname && (
                      <span className="ml-2 text-sm font-normal text-zinc-500">({nickname})</span>
                    )}
                  </h3>
                  <div className="mt-1 flex items-center gap-2 text-sm font-medium text-zinc-500">
                    <Icon className="h-4 w-4" />
                    {role}
                  </div>
                </div>
              </div>
              <p className="mt-6 border-t border-zinc-100 pt-5 text-sm leading-6 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                {interests}
              </p>
            </article>
    )
}