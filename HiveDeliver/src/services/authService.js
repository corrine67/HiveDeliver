const USERS_KEY = 'hiveDeliver_users'
const CURRENT_USER_KEY = 'hiveDeliver_currentUser'

const defaultUsers = [
  {
    id: 'manager-1',
    email: 'manager@hivedeliver.com',
    password: 'manager123',
    role: 'manager',
    name: 'Manager',
  },
]

function _loadJSON(key) {
  const raw = window.localStorage.getItem(key)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function _saveJSON(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function getUsers() {
  const users = _loadJSON(USERS_KEY) || []
  if (users.length === 0) {
    _saveJSON(USERS_KEY, defaultUsers)
    return defaultUsers
  }
  return users
}

export function saveUsers(users) {
  _saveJSON(USERS_KEY, users)
}

export function getCurrentUser() {
  return _loadJSON(CURRENT_USER_KEY)
}

export function setCurrentUser(user) {
  if (user == null) {
    window.localStorage.removeItem(CURRENT_USER_KEY)
  } else {
    _saveJSON(CURRENT_USER_KEY, user)
  }
}

export function logout() {
  setCurrentUser(null)
}

export function login({ email, password }) {
  const users = getUsers()
  const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
  if (!found) {
    throw new Error('No account found for this email.')
  }

  if (found.password !== password) {
    throw new Error('Incorrect password.')
  }

  const user = { id: found.id, email: found.email, role: found.role, name: found.name }
  setCurrentUser(user)
  return user
}

export function register({ email, password, role, name }) {
  if (!email || !password || !role) {
    throw new Error('Email, password, and role are required.')
  }

  const users = getUsers()
  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
  if (existing) {
    throw new Error('An account with that email already exists.')
  }

  const newUser = {
    id: `user-${Date.now()}`,
    email,
    password,
    role,
    name: name || email,
  }

  const nextUsers = [...users, newUser]
  saveUsers(nextUsers)

  const user = { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name }
  setCurrentUser(user)
  return user
}

export function getDefaultRouteForRole(role) {
  switch (role) {
    case 'manager':
      return '/dashboard'
    case 'user':
    default:
      return '/map'
  }
}
