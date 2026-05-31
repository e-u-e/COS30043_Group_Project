import { createRouter, createWebHistory } from 'vue-router'
import { store } from '../store/index.js'

import Home             from '../views/Home.vue'
import ProductListView  from '../views/ProductListView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import FavouritesView   from '../views/Favourites.vue'
import AboutView        from '../views/About.vue'
import ContactView      from '../views/Contact.vue'
import LoginView        from '../views/Login.vue'
import RegisterView     from '../views/Register.vue'
import ProfileView      from '../views/Profile.vue'
import CartView         from '../views/Cart.vue'
import CheckoutView     from '../views/Checkout.vue'
import AdminView        from '../views/Admin.vue'
import AddProductView   from '../views/AddProduct.vue'
import EditProductView  from '../views/EditProduct.vue'

const routes = [
  { path: '/',             component: Home },
  { path: '/about',        component: AboutView },
  { path: '/contact',      component: ContactView },
  { path: '/products',     component: ProductListView },
  { path: '/products/:id', component: ProductDetailView },
  {
    path: '/favorites',
    alias: '/favourites',
    component: FavouritesView
  },
  { path: '/login',    component: LoginView },
  { path: '/register', component: RegisterView },
  {
    path: '/profile',
    component: ProfileView,
    meta: { requiresAuth: true }
  },
  {
    path: '/cart',
    component: CartView
  },
  {
    path: '/checkout',
    component: CheckoutView,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    component: AdminView,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/add-product',
    component: AddProductView,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/edit-product/:id',
    component: EditProductView,
    meta: { requiresAuth: true, requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  const user = store.state.user
  if (to.meta.requiresAuth && !user) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
  if (to.meta.requiresAdmin && user && user.is_admin != 1) {
    return { path: '/' }
  }
})

export default router
