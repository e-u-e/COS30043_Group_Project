<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-5">

        <h2 class="mb-4">Login</h2>

        <div v-if="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>

        <form @submit.prevent="submitForm" novalidate>

          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              id="username"
              class="form-control"
              :class="{ 'is-invalid': touched.username && !username }"
              v-model="username"
              @blur="touched.username = true"
            >
            <div class="invalid-feedback">Username is required</div>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              id="password"
              class="form-control"
              :class="{ 'is-invalid': touched.password && !password }"
              v-model="password"
              @blur="touched.password = true"
            >
            <div class="invalid-feedback">Password is required</div>
          </div>

          <button type="submit" class="btn btn-primary" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" />
            Login
          </button>
          <router-link to="/register" class="ms-3">Don't have an account? Register</router-link>

        </form>

        <!-- Dev / demo shortcut -->
        <div class="mt-4 p-3 rounded border bg-body-tertiary">
          <small class="text-muted d-block mb-2">Demo admin account (no PHP needed):</small>
          <button class="btn btn-sm btn-outline-secondary" @click="loginAsAdmin">Login as Admin</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { loginUser } from '../services/auth.js'

export default {
  name: 'LoginView',

  data() {
    return {
      username: '',
      password: '',
      errorMsg: '',
      loading: false,
      touched: { username: false, password: false }
    }
  },

  methods: {
    async submitForm() {
      this.touched.username = true
      this.touched.password = true
      this.errorMsg = ''

      if (!this.username || !this.password) {
        this.errorMsg = 'Please enter your username and password'
        return
      }

      this.loading = true
      const result = await loginUser(this.username, this.password)
      this.loading = false

      if (result.success) {
        this.$store.setUser(result.user)
        const redirect = this.$route.query.redirect || '/'
        this.$router.push(redirect)
      } else {
        this.errorMsg = result.message
      }
    },

    loginAsAdmin() {
      // Seed a demo admin user in localStorage if not present
      const users = JSON.parse(localStorage.getItem('localUsers') || '[]')
      if (!users.find(u => u.username === 'admin')) {
        users.push({ id: 1, username: 'admin', email: 'admin@novastore.com', phone: '0400000000', password: 'admin123', is_admin: 1 })
        localStorage.setItem('localUsers', JSON.stringify(users))
      }
      this.username = 'admin'
      this.password = 'admin123'
      this.submitForm()
    }
  }
}
</script>
