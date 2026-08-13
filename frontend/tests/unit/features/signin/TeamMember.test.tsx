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

  it('displays initials when a profile photo is missing', () => { 
    render( 
      <TeamMember 
        name="John Smith" 
        initials="JS" 
        nickname="Johns" 
        role="Developer" 
        interests="Interested in web development." 
        icon={User}
      /> 
    )
    
    // initials are displayed when no photo specified
    expect(screen.getByText('JS')).toBeInTheDocument()
  })

  it('displays an unusually long interests blurb correctly', () => {
    const longInterests =
      'I am interested in web development, software engineering, user interface design, ' +
      'database systems, cloud computing, artificial intelligence, cybersecurity, ' +
      'mobile application development, accessibility, and learning new programming languages.'

    render(
      <TeamMember
        name="John Smith"
        initials="JS"
        nickname="Johns"
        role="Developer"
        interests={longInterests}
        icon={User}
      />
    )

    // ensures long blurbs are displayed properly
    expect(screen.getByText(longInterests)).toBeInTheDocument()
  })
})
