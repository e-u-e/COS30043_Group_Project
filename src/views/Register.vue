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
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" id="username" class="form-control" v-model="username">
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" id="email" class="form-control" v-model="email">
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label">Phone</label>
            <input type="text" id="phone" class="form-control" v-model="phone">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" id="password" class="form-control" v-model="password">
          </div>
          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <input type="password" id="confirmPassword" class="form-control" v-model="confirmPassword">
          </div>
          <button type="submit" class="btn btn-primary">Register</button>
          <router-link to="/login" class="ms-3">Already have an account? Login</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
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
  methods: {
    submitForm(e) {
      e.preventDefault()
      this.errors = []
      this.successMsg = ''

      // validate fields
      if (!this.username) this.errors.push('Username is required')
      if (!this.email) this.errors.push('Email is required')
      if (!this.phone) this.errors.push('Phone is required')
      if (!this.password) this.errors.push('Password is required')
      if (this.password !== this.confirmPassword) this.errors.push('Passwords do not match')

      // if no errors, send to api
      if (this.errors.length === 0) {
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
          // clear the form
          this.username = ''
          this.email = ''
          this.phone = ''
          this.password = ''
          this.confirmPassword = ''
        })
        .catch(error => {
          this.errors.push('Something went wrong, please try again.')
        })
      }
    }
  }
}
</script>