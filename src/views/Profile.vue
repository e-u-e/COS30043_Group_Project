<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">

        <!-- if not logged in -->
        <div v-if="!$store.state.user">
          <p>You are not logged in. <router-link to="/login">Login here</router-link></p>
        </div>

        <!-- if logged in -->
        <div v-else>
          <h2>My Profile</h2>
          <table class="table">
            <tbody>
              <tr>
                <th>Username</th>
                <td>{{ $store.state.user.username }}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{{ $store.state.user.email }}</td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>{{ $store.state.user.phone }}</td>
              </tr>
              <tr>
                <th>Account Type</th>
                <td>{{ $store.state.user.is_admin == 1 ? 'Admin' : 'Regular User' }}</td>
              </tr>
            </tbody>
          </table>
          <button class="btn btn-danger" @click="logout">Logout</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileView',
  methods: {
    logout() {
      // clear user from vuex store
      this.$store.commit('clearUser')
      // redirect to home
      this.$router.push('/')
    }
  }
}
</script>