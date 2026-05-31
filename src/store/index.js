import { reactive } from 'vue'

const state = reactive({
  user: JSON.parse(localStorage.getItem('user')) || null,
  favorites: JSON.parse(localStorage.getItem('favorites')) || []
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
  },
  
  //favourite management toggles
  toggleFavorite(product) {
    const index = state.favorites.findIndex(item => item.id === product.id)
    if (index === -1) {
      state.favorites.push(product)
    } else {
      state.favorites.splice(index, 1)
    }
    localStorage.setItem('favorites', JSON.stringify(state.favorites))
  },

  isProductFavorite(productId) {
    return state.favorites.some(item => item.id === productId)
  }
}