<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2>Login</h2>

        <!-- error message -->
        <div v-if="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>

        <form @submit="submitForm" novalidate>
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" id="username" class="form-control" v-model="username">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" id="password" class="form-control" v-model="password">
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
          <router-link to="/register" class="ms-3">Don't have an account? Register</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      errorMsg: ''
    }
  },
  methods: {
    submitForm(e) {
      e.preventDefault()
      this.errorMsg = ''

      // basic validation
      if (!this.username || !this.password) {
        this.errorMsg = 'Please enter your username and password'
        return
      }

      // send login request to api
      fetch('http://localhost/COS30043_Group_Project/resources/users.php', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data === null) {
          this.errorMsg = 'Incorrect username or password'
        } else {
          // save user to vuex store
          this.$store.commit('setUser', data)
          // redirect to home page
          this.$router.push('/')
        }
      })
      .catch(error => {
        this.errorMsg = 'Something went wrong, please try again.'
      })
    }
  }
}
</script>