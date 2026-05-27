import { reactive } from 'vue'

const state = reactive({
  user: JSON.parse(localStorage.getItem('user')) || null
})

export const store = {
  state,
  install(app) {
    app.config.globalProperties.$store = this
  },
  setUser(userData) {
    state.user = userData
    localStorage.setItem('user', JSON.stringify(userData))
  },
  clearUser() {
    state.user = null
    localStorage.removeItem('user')
  }
}