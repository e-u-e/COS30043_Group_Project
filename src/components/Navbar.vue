<template>
  <nav class="navbar navbar-expand-lg fixed-top p-0 mt-3 top-0 start-0 w-100 z-3">

    <div
      class="container custom-navbar rounded-pill px-4 py-2 shadow-lg d-flex align-items-center"
      :class="isHome ? 'custom-navbar--home' : 'custom-navbar--page'"
    >

      <!-- Brand -->
      <router-link class="navbar-brand fw-bold mb-0 text-white" to="/">
        NovaStore
      </router-link>

      <!-- Hamburger -->
      <button
        class="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Links -->
      <div class="collapse navbar-collapse" id="navbarNav">

        <ul class="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-3 fw-medium">

          <li class="nav-item">
            <router-link class="nav-link text-white-50 p-2" to="/">Home</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link text-white-50 p-2" to="/products">Products</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link text-white-50 p-2 position-relative" to="/cart">
              Cart
              <span
                v-if="cartCount > 0"
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style="font-size: 0.65rem;"
              >
                {{ cartCount }}
              </span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link text-white-50 p-2" to="/favorites">Favourites</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link text-white-50 p-2" to="/about">About Us</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link text-white-50 p-2" to="/contact">Contact</router-link>
          </li>

          <li v-if="$store.state.user && $store.state.user.is_admin" class="nav-item">
            <router-link class="nav-link text-white-50 p-2" to="/admin">Admin</router-link>
          </li>

        </ul>

        <!-- Right: theme toggle + auth -->
        <div class="d-flex align-items-center gap-3 mt-3 mt-lg-0">

          <button @click="toggleTheme" class="btn theme-toggle-btn d-flex align-items-center justify-content-center px-3 py-2 rounded-pill" title="Toggle Theme">
            <img v-if="isDarkMode" src="/sun.svg" alt="Switch to light mode" width="18" height="18">
            <img v-else src="/moon.svg" alt="Switch to dark mode" width="18" height="18">
          </button>

          <template v-if="!$store.state.user">
            <router-link class="text-white-50 text-decoration-none fw-medium link-hover" to="/register">Register</router-link>
            <router-link class="text-white-50 text-decoration-none fw-medium link-hover" to="/login">Login</router-link>
          </template>

          <template v-else>
            <router-link class="text-white-50 text-decoration-none fw-medium link-hover" to="/profile">
              {{ $store.state.user.username }}
            </router-link>
            <a class="text-white-50 text-decoration-none fw-medium link-hover" href="#" @click.prevent="logout">Logout</a>
          </template>

        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { store } from '../store/index.js'

export default {
  name: 'NavbarComponent',
  data() {
    return { isDarkMode: false }
  },
  computed: {
    isHome() {
      return this.$route.path === '/'
    },
    cartCount() {
      return store.cartCount()
    }
  },
  mounted() {
    const saved = localStorage.getItem('theme')
    this.isDarkMode = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
    this.applyTheme()
  },
  methods: {
    logout() {
      this.$store.clearUser()
      this.$router.push('/')
    },
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light')
      this.applyTheme()
    },
    applyTheme() {
      document.documentElement.setAttribute('data-bs-theme', this.isDarkMode ? 'dark' : 'light')
    }
  }
}
</script>
