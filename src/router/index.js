import { createRouter, createWebHistory } from 'vue-router'
import { store } from '../store/index.js'

import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import ProductDetails from '../views/ProductDetails.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/products',
    component: Products
  },
  {
    path: '/products/:id',
    component: ProductDetails
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/profile',
    component: Profile,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// check auth before each route
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user) {
    // not logged in, redirect to login
    next('/login')
  } else {
    next()
  }
})

export default router