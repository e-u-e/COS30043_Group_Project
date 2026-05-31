const PHP_ENDPOINT = '/resources/users.php'
const LOCAL_USERS_KEY = 'localUsers'

function getLocalUsers() {
  return JSON.parse(localStorage.getItem(LOCAL_USERS_KEY)) || []
}

function saveLocalUsers(users) {
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users))
}

export async function loginUser(username, password) {
  try {
    const res = await fetch(PHP_ENDPOINT, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    if (res.ok) {
      const data = await res.json()
      if (data && data.username) return { success: true, user: data }
      return { success: false, message: 'Incorrect username or password' }
    }
  } catch (e) {
    // fall through to local fallback
  }

  // Local fallback (dev / offline)
  const users = getLocalUsers()
  const found = users.find(u => u.username === username && u.password === password)
  if (found) {
    const { password: _p, ...user } = found
    return { success: true, user }
  }
  return { success: false, message: 'Incorrect username or password' }
}

export async function registerUser({ username, email, phone, password }) {
  try {
    const res = await fetch(PHP_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, phone, password })
    })
    if (res.ok) {
      return { success: true }
    }
  } catch (e) {
    // fall through to local fallback
  }

  // Local fallback
  const users = getLocalUsers()
  if (users.find(u => u.username === username)) {
    return { success: false, message: 'Username already taken' }
  }
  const id = Date.now()
  users.push({ id, username, email, phone, password, is_admin: 0 })
  saveLocalUsers(users)
  return { success: true }
}
