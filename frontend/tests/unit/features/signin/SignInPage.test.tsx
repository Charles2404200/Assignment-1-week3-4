import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignInPage from '@/app/(auth)/auth/signin/page'

// mock for page redirection
const mockReplace = vi.fn()
const mockRefresh = vi.fn()
vi.mock('next/navigation', () => ({
    useRouter: () => ({ replace: mockReplace, refresh: mockRefresh }),
}))

// mock for sign in function
const mockSignInWithEmail = vi.fn()
vi.mock('@/hooks/useAuth', () => ({
    useAuth: () => ({
        user: null,
        loading: false,
        signInWithEmail: mockSignInWithEmail,
        signInWithGoogle: vi.fn(),
    }),
}))

describe('Sign In Page Happy Path', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('login with valid credentials and redirects to /team', async () => {
        mockSignInWithEmail.mockResolvedValue(undefined)
        const user = userEvent.setup()
        render(<SignInPage />)

        // mocks user input for email and password fields and sign in button click
        await user.type(screen.getByLabelText(/email/i), 'scrumptiousramen@gmail.com')
        await user.type(screen.getByLabelText(/password/i), 'Test1234')
        await user.click(screen.getByRole('button', { name: /sign in/i }))

        await waitFor(() => expect(mockSignInWithEmail).toHaveBeenCalledWith(
            'scrumptiousramen@gmail.com',
            'Test1234'
        ))

        // successful login redirects to the team page
        expect(mockReplace).toHaveBeenCalledWith('/team')
    })
})
