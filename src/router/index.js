import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import ProductListView from '../views/ProductListView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import FavouritesView from '../views/Favourites.vue'
import AboutView from '../views/About.vue'
import ContactView from '../views/Contact.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: AboutView
  
  },
  {
    path: '/contact',
    component: ContactView
  },
  {
    path: '/products',
    component: ProductListView
  },
  {
    path: '/products/:id',
    component: ProductDetailView
  },
  {
    path: '/favorites',
    alias: '/favourites',
    component: FavouritesView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
