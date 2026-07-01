// Auth utilities for localStorage management
const AUTH_KEY = 'avaline_auth_user'
const USERS_KEY = 'avaline_users'

export interface AuthUser {
  id: string
  name: string
  email: string
  createdAt: string
}

export interface StoredUser extends AuthUser {
  password: string
}

export const authUtils = {
  // Get current authenticated user
  getUser: (): AuthUser | null => {
    if (typeof window === 'undefined') return null
    const userStr = localStorage.getItem(AUTH_KEY)
    return userStr ? JSON.parse(userStr) : null
  },

  // Set authenticated user
  setUser: (user: AuthUser): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(AUTH_KEY, JSON.stringify(user))
  },

  // Clear authenticated user (logout)
  clearUser: (): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(AUTH_KEY)
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!authUtils.getUser()
  },

  // Register new user
  register: (name: string, email: string, password: string): AuthUser => {
    if (typeof window === 'undefined') {
      throw new Error('Cannot register on server side')
    }

    const users: StoredUser[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')

    // Check if email already exists
    if (users.some(u => u.email === email)) {
      throw new Error('Email already registered')
    }

    const newUser: StoredUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    localStorage.setItem(USERS_KEY, JSON.stringify(users))

    // Auto-login after registration
    const { password: _, ...authUser } = newUser
    authUtils.setUser(authUser)

    return authUser
  },

  // Login user
  login: (email: string, password: string): AuthUser => {
    if (typeof window === 'undefined') {
      throw new Error('Cannot login on server side')
    }

    const users: StoredUser[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    const user = users.find(u => u.email === email && u.password === password)

    if (!user) {
      throw new Error('Invalid email or password')
    }

    const { password: _, ...authUser } = user
    authUtils.setUser(authUser)

    return authUser
  },

  // Logout
  logout: (): void => {
    authUtils.clearUser()
  }
}
