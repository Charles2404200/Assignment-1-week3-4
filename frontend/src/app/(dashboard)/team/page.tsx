
import TeamMember from "./components/TeamMember"
import { teamMembers } from "./data/team_members"
import { BriefcaseBusiness, Users } from "lucide-react"

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <section className="overflow-hidden rounded-2xl bg-zinc-900 px-6 py-10 text-white shadow-sm sm:px-10">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-zinc-200">
            <Users className="h-3.5 w-3.5" />
            Team 2
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            10-IBM-AI-Powered Consulting Simulation
          </h1>
          <p className="text-sm leading-6 text-zinc-300 sm:text-base">
            Meet the people bringing together user experience, software development, and emerging
            technology to build thoughtful digital solutions.
          </p>
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <p className="text-sm font-medium text-zinc-500">The people behind the project</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight">Meet the team</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {teamMembers.map(({ name, nickname, role, interests, initials, icon }) => (
            <TeamMember name={name}
            nickname={nickname}
            role={role}
            interests={interests}
            initials={initials}
            icon={icon}
            />
          ))}
        </div>
      </section>

      <div className="flex items-start gap-3 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-5 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-400">
        <BriefcaseBusiness className="mt-0.5 h-5 w-5 shrink-0 text-zinc-400" />
        <p>
          More team members can be added by creating another entry in the{' '}
          <code className="rounded bg-zinc-200 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
            teamMembers
          </code>{' '}
          list above.
        </p>
      </div>
    </div>
  )
}
