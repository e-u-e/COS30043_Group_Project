<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="mb-4">Register</h2>

        <div v-if="errors.length" class="alert alert-danger">
          <ul class="mb-0">
            <li v-for="e in errors" :key="e">{{ e }}</li>
          </ul>
        </div>

        <div v-if="successMsg" class="alert alert-success">{{ successMsg }}</div>

        <form @submit.prevent="submitForm" novalidate>

          <!-- Username -->
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              id="username"
              class="form-control"
              :class="{ 'is-invalid': v$.username.$error }"
              v-model="username"
              @blur="v$.username.$touch"
            >
            <div class="invalid-feedback">Username is required</div>
          </div>

          <!-- Email -->
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              id="email"
              class="form-control"
              :class="{ 'is-invalid': v$.email.$error }"
              v-model="email"
              @blur="v$.email.$touch"
            >
            <div class="invalid-feedback">Please enter a valid email address</div>
          </div>

          <!-- Phone -->
          <div class="mb-3">
            <label for="phone" class="form-label">Phone</label>
            <input
              type="text"
              id="phone"
              class="form-control"
              :class="{ 'is-invalid': v$.phone.$error }"
              v-model="phone"
              @blur="v$.phone.$touch"
            >
            <div class="invalid-feedback">Phone is required</div>
          </div>

          <!-- Password -->
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              id="password"
              class="form-control"
              :class="{ 'is-invalid': v$.password.$error }"
              v-model="password"
              @blur="v$.password.$touch"
            >
            <div class="invalid-feedback">Password must be at least 8 characters</div>

            <div v-if="password.length > 0" class="mt-2">
              <small class="form-text">Password strength: <strong>{{ strengthLabel }}</strong></small>
              <div class="progress mt-1" style="height: 8px;">
                <div class="progress-bar" :class="strengthColor" :style="{ width: strengthPercent + '%' }" />
              </div>
              <ul class="mt-2 small text-muted ps-3">
                <li :class="{ 'text-success': hasUppercase }">Contains uppercase letter</li>
                <li :class="{ 'text-success': hasNumber }">Contains a number</li>
                <li :class="{ 'text-success': hasSpecial }">Contains a special character</li>
                <li :class="{ 'text-success': hasMinLength }">At least 8 characters</li>
              </ul>
            </div>
          </div>

          <!-- Confirm Password -->
          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              class="form-control"
              :class="{ 'is-invalid': v$.confirmPassword.$error }"
              v-model="confirmPassword"
              @blur="v$.confirmPassword.$touch"
            >
            <div class="invalid-feedback">Passwords do not match</div>
          </div>

          <button type="submit" class="btn btn-primary" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" />
            Register
          </button>
          <router-link to="/login" class="ms-3">Already have an account? Login</router-link>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import { registerUser } from '../services/auth.js'

export default {
  name: 'RegisterView',

  setup() {
    return { v$: useVuelidate() }
  },

  data() {
    return {
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      errors: [],
      successMsg: '',
      loading: false
    }
  },

  validations() {
    return {
      username:        { required },
      email:           { required, email },
      phone:           { required },
      password:        { required, minLength: minLength(8) },
      confirmPassword: { required, sameAs: sameAs(this.password) }
    }
  },

  computed: {
    hasUppercase()  { return /[A-Z]/.test(this.password) },
    hasNumber()     { return /[0-9]/.test(this.password) },
    hasSpecial()    { return /[!@#$%^&*]/.test(this.password) },
    hasMinLength()  { return this.password.length >= 8 },
    strengthScore() {
      return [this.hasUppercase, this.hasNumber, this.hasSpecial, this.hasMinLength].filter(Boolean).length
    },
    strengthLabel() {
      return ['', 'Weak', 'Fair', 'Good', 'Strong'][this.strengthScore] || 'Weak'
    },
    strengthColor() {
      return ['', 'bg-danger', 'bg-warning', 'bg-info', 'bg-success'][this.strengthScore]
    },
    strengthPercent() {
      return (this.strengthScore / 4) * 100
    }
  },

  methods: {
    async submitForm() {
      this.errors = []
      this.successMsg = ''

      const valid = await this.v$.$validate()
      if (!valid) return

      this.loading = true
      const result = await registerUser({
        username: this.username,
        email: this.email,
        phone: this.phone,
        password: this.password
      })
      this.loading = false

      if (result.success) {
        this.successMsg = 'Registration successful! You can now login.'
        this.username = ''
        this.email = ''
        this.phone = ''
        this.password = ''
        this.confirmPassword = ''
        this.v$.$reset()
      } else {
        this.errors.push(result.message || 'Registration failed. Please try again.')
      }
    }
  }
}
</script>
