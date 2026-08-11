import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { User } from 'lucide-react'
import TeamMember from '@/app/(dashboard)/team/components/TeamMember'

describe('Verify TeamMember Card Content', () => {
  it('displays all required team member content correctly', () => {
    render(
      <TeamMember
        name="John Smith"
        initials="JS"
        nickname="Johns"
        role="Developer"
        interests="Interested in web development."
        icon={ User }
      />
    )

    // all above content is displayed
    expect(screen.getByRole('heading', { name: /John Smith/i })).toBeInTheDocument()
    expect(screen.getByText('JS')).toBeInTheDocument()
    expect(screen.getByText('(Johns)')).toBeInTheDocument()
    expect(screen.getByText('Developer')).toBeInTheDocument()
    expect(screen.getByText('Interested in web development.')).toBeInTheDocument()
  })
})