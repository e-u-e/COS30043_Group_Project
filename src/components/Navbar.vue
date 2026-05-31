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

          <li v-if="$store.state.user && $store.state.user.is_admin == 1" class="nav-item">
            <router-link class="nav-link text-white-50 p-2" to="/admin">Admin</router-link>
          </li>

        </ul>

        <!-- Right: theme toggle + auth -->
        <div class="d-flex align-items-center gap-3 mt-3 mt-lg-0">

          <button @click="toggleTheme" class="btn theme-toggle-btn d-flex align-items-center p-2 rounded-circle" title="Toggle Theme">
            <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-sun-fill" viewBox="0 0 16 16">
              <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-moon-stars-fill" viewBox="0 0 16 16">
              <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.277 7.277a7.2 7.2 0 0 0 3.46-.878.77.77 0 0 1 .858.08.77.77 0 0 1 .08.858 7.2 7.2 0 0 1-7.278 7.278A7.277 7.277 0 0 1 .278 10.77a7.2 7.2 0 0 1 7.278-7.278 7.2 7.2 0 0 1 .858.081"/>
            </svg>
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
