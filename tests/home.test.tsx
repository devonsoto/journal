import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Home from '../app/page'

vi.mock('@clerk/nextjs', () => {
  return {
    auth: () => new Promise((resolve) => resolve({ userId: '123' })),
    ClerkProvider: ({ children }) => <>{children}</>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC',
        fullName: 'Charles Harris',
      },
    }),
  }
})

test('home', async () => {
  render(await Home())

  expect(screen.getByText('The best Journal app.')).toBeInTheDocument()
})
