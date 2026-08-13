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
        await user.type(screen.getByLabelText(/email/i), 's4023387@student.rmit.edu.au')
        await user.type(screen.getByLabelText(/password/i), 'Test1234')
        await user.click(screen.getByRole('button', { name: /sign in/i }))

        await waitFor(() => expect(mockSignInWithEmail).toHaveBeenCalledWith(
            's4023387@student.rmit.edu.au',
            'Test1234'
        ))

        // successful login redirects to the team page
        expect(mockReplace).toHaveBeenCalledWith('/team')
    })

    it('login with invalid credentials', async () => {
        mockSignInWithEmail.mockRejectedValue(new Error('auth/invalid-credential'))
        const user = userEvent.setup()
        render(<SignInPage />)

        // mocks user input for with invalid email and password
        await user.type(screen.getByLabelText(/email/i), 'invalidemail@gmail.com')
        await user.type(screen.getByLabelText(/password/i), 'invalidpassword')
        await user.click(screen.getByRole('button', { name: /sign in/i }))

        // unsuccessful login and expects error message
        expect(await screen.findByRole('alert')).toHaveTextContent(/invalid email or password/i)
        expect(mockReplace).not.toHaveBeenCalled()
    })
})
