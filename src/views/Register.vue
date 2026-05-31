<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2>Register</h2>

        <!-- error messages -->
        <div v-if="errors.length" class="alert alert-danger">
          <ul class="mb-0">
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </div>

        <!-- success message -->
        <div v-if="successMsg" class="alert alert-success">{{ successMsg }}</div>

        <form @submit="submitForm" novalidate>

          <!-- username -->
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
            <div class="invalid-feedback" v-if="v$.username.$error">
              Username is required
            </div>
          </div>

          <!-- email -->
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
            <div class="invalid-feedback" v-if="v$.email.$error">
              Please enter a valid email address
            </div>
          </div>

          <!-- phone -->
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
            <div class="invalid-feedback" v-if="v$.phone.$error">
              Phone is required
            </div>
          </div>

          <!-- password -->
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
            <div class="invalid-feedback" v-if="v$.password.$error">
              Password must be at least 8 characters
            </div>

            <!-- password strength indicator -->
            <div v-if="password.length > 0" class="mt-2">
              <small class="form-text">Password strength: <strong>{{ strengthLabel }}</strong></small>
              <div class="progress mt-1" style="height: 8px;">
                <div
                  class="progress-bar"
                  :class="strengthColor"
                  :style="{ width: strengthPercent + '%' }"
                >
                </div>
              </div>
              <ul class="mt-2 small text-muted ps-3">
                <li :class="{ 'text-success': hasUppercase }">Contains uppercase letter</li>
                <li :class="{ 'text-success': hasNumber }">Contains a number</li>
                <li :class="{ 'text-success': hasSpecial }">Contains a special character</li>
                <li :class="{ 'text-success': hasMinLength }">At least 8 characters</li>
              </ul>
            </div>
          </div>

          <!-- confirm password -->
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
            <div class="invalid-feedback" v-if="v$.confirmPassword.$error">
              Passwords do not match
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Register</button>
          <router-link to="/login" class="ms-3">Already have an account? Login</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'

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
      successMsg: ''
    }
  },

  // vuelidate rules
  validations() {
    return {
      username: { required },
      email: { required, email },
      phone: { required },
      password: { required, minLength: minLength(8) },
      confirmPassword: { required, sameAs: sameAs(this.password) }
    }
  },

  computed: {
    // check individual password criteria
    hasUppercase() { return /[A-Z]/.test(this.password) },
    hasNumber() { return /[0-9]/.test(this.password) },
    hasSpecial() { return /[!@#$%^&*]/.test(this.password) },
    hasMinLength() { return this.password.length >= 8 },

    // calculate strength score out of 4
    strengthScore() {
      let score = 0
      if (this.hasUppercase) score++
      if (this.hasNumber) score++
      if (this.hasSpecial) score++
      if (this.hasMinLength) score++
      return score
    },

    // label based on score
    strengthLabel() {
      if (this.strengthScore <= 1) return 'Weak'
      if (this.strengthScore <= 2) return 'Fair'
      if (this.strengthScore <= 3) return 'Good'
      return 'Strong'
    },

    // bootstrap color class based on score
    strengthColor() {
      if (this.strengthScore <= 1) return 'bg-danger'
      if (this.strengthScore <= 2) return 'bg-warning'
      if (this.strengthScore <= 3) return 'bg-info'
      return 'bg-success'
    },

    // percentage for progress bar
    strengthPercent() {
      return (this.strengthScore / 4) * 100
    }
  },

  methods: {
    async submitForm(e) {
      e.preventDefault()
      this.errors = []
      this.successMsg = ''

      // trigger vuelidate validation on all fields
      const valid = await this.v$.$validate()

      if (!valid) return

      fetch('http://localhost/COS30043_Group_Project/resources/users.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: this.username,
          email: this.email,
          phone: this.phone,
          password: this.password
        })
      })
      .then(response => response.json())
      .then(data => {
        this.successMsg = 'Registration successful! You can now login.'
        this.username = ''
        this.email = ''
        this.phone = ''
        this.password = ''
        this.confirmPassword = ''
        this.v$.$reset()
      })
      .catch(error => {
        this.errors.push('Something went wrong, please try again.')
      })
    }
  }
}
</script>