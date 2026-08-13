import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'
import { proxy } from '@/proxy'

function makeRequest(path: string, cookie?: string) {
  return new NextRequest(`https://example.com${path}`, {
    headers: cookie ? { cookie } : {},
  })
}

describe('Route Authentication for Team Page', () => {
  it('redirects unauthenticated users away from the team page', () => {
    const request = new NextRequest('http://localhost:3000/team')
    const response = proxy(request) // request without session cookie to indicate unauth user

    // checks for redirect status and destination
    expect(response.status).toBe(307)
    const location = new URL(response.headers.get('location')!)

    // redirects to sign in page with redirect query parameter
    expect(location.pathname).toBe('/auth/signin')
    expect(location.searchParams.get('redirect')).toBe('/team')
  })
})
