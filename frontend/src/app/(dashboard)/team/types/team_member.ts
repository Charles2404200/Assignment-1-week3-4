import { Palette } from "lucide-react"

export type TeamMember = {
  name: string
  nickname?: string
  role: string
  interests: string
  initials: string
  icon: typeof Palette
}