import { reactive } from 'vue'

const state = reactive({
  user: JSON.parse(localStorage.getItem('user')) || null,
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  reviews: JSON.parse(localStorage.getItem('reviews')) || {},
  orders: JSON.parse(localStorage.getItem('orders')) || []
})

export const store = {
  state,

  install(app) {
    app.config.globalProperties.$store = this
  },

  // ─── Auth ─────────────────────────────────────────────────────────────────
  setUser(userData) {
    state.user = userData
    localStorage.setItem('user', JSON.stringify(userData))
  },
  clearUser() {
    state.user = null
    localStorage.removeItem('user')
  },

  // ─── Favorites ────────────────────────────────────────────────────────────
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
  },

  // ─── Cart ─────────────────────────────────────────────────────────────────
  addToCart(product, quantity = 1) {
    const existing = state.cart.find(item => item.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      state.cart.push({ ...product, quantity })
    }
    localStorage.setItem('cart', JSON.stringify(state.cart))
  },
  removeFromCart(productId) {
    const index = state.cart.findIndex(item => item.id === productId)
    if (index !== -1) state.cart.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(state.cart))
  },
  updateCartQuantity(productId, quantity) {
    const item = state.cart.find(item => item.id === productId)
    if (!item) return
    if (quantity <= 0) {
      this.removeFromCart(productId)
    } else {
      item.quantity = quantity
      localStorage.setItem('cart', JSON.stringify(state.cart))
    }
  },
  clearCart() {
    state.cart = []
    localStorage.removeItem('cart')
  },
  cartTotal() {
    return state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },
  cartCount() {
    return state.cart.reduce((sum, item) => sum + item.quantity, 0)
  },

  // ─── Reviews ──────────────────────────────────────────────────────────────
  addReview(productId, review) {
    const key = String(productId)
    if (!state.reviews[key]) state.reviews[key] = []
    state.reviews[key].push({
      ...review,
      id: Date.now(),
      date: new Date().toLocaleDateString('en-AU')
    })
    localStorage.setItem('reviews', JSON.stringify(state.reviews))
  },
  getReviews(productId) {
    return state.reviews[String(productId)] || []
  },
  deleteReview(productId, reviewId) {
    const key = String(productId)
    if (state.reviews[key]) {
      state.reviews[key] = state.reviews[key].filter(r => r.id !== reviewId)
      localStorage.setItem('reviews', JSON.stringify(state.reviews))
    }
  },
  averageRating(productId) {
    const reviews = this.getReviews(productId)
    if (!reviews.length) return 0
    return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  },

  // ─── Orders ───────────────────────────────────────────────────────────────
  placeOrder(orderData) {
    const order = {
      ...orderData,
      id: Date.now(),
      date: new Date().toLocaleDateString('en-AU'),
      status: 'Processing'
    }
    state.orders.unshift(order)
    localStorage.setItem('orders', JSON.stringify(state.orders))
    return order
  },
  getUserOrders(username) {
    return state.orders.filter(o => o.username === username)
  }
}
