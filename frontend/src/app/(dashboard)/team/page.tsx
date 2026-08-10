import type { Metadata } from 'next'
import { BriefcaseBusiness, Code2, Palette, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Team',
}

type TeamMember = {
  name: string
  nickname?: string
  role: string
  interests: string
  initials: string
  icon: typeof Palette
}

// Add new members to this list as their details become available.
const teamMembers: TeamMember[] = [
  {
    name: 'Tran Viet Anh',
    nickname: 'Vince',
    role: 'UX Designer',
    interests: 'Product design, software development, AI, and building digital products.',
    initials: 'TV',
    icon: Palette,
  },
  {
    name: 'Anubhav Patra',
    nickname : 'Anub',
    role: 'Developer',
    interests:
      'Software development, advanced computer science, system design, parallel computing, distributed systems, and mathematics.',
    initials: 'AP',
    icon: Code2,
  },
  {
    name: 'Christine Le',
    nickname : 'Zehntel',
    role: 'Computer Science Student',
    interests:
      'Full-stack development, database design, web and app development, and creating automated solutions for repetitive tasks.',
    initials: 'CL',
    icon: Code2,
  },
  
]

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
          {teamMembers.map(({ name, nickname, role, interests, initials, icon: Icon }) => (
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
