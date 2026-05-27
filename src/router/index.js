import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import ProductListView from '../views/ProductListView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/products',
    component: ProductListView
  },
  {
    path: '/products/:id',
    component: ProductDetailView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router