import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import ProductDetails from '../views/ProductDetails.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router