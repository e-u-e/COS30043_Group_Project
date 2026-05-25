import { createStore } from 'vuex'

export const store = createStore({
  state() {
    return {
      // try to load user from localStorage on startup
      user: JSON.parse(localStorage.getItem('user')) || null
    }
  },
  mutations: {
    setUser(state, userData) {
      state.user = userData
      // save to localStorage so it persists on page refresh
      localStorage.setItem('user', JSON.stringify(userData))
    },
    clearUser(state) {
      state.user = null
      // remove from localStorage on logout
      localStorage.removeItem('user')
    }
  }
})