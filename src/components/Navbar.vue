<template>
  <!-- testing out a navbar layout-->
  <nav class="navbar navbar-expand-lg fixed-top p-0 mt-3 top-0 start-0 w-100 z-3">

    <!-- pill container shaped -->
    <div
      class="container custom-navbar rounded-pill px-4 py-2 shadow-lg d-flex align-items-center"
      :class="isHome ? 'custom-navbar--home' : 'custom-navbar--page'"
    >

      <!-- navbar logo on the left -->
      <router-link
        class="navbar-brand fw-bold mb-0 text-white"
        to="/"
      >
        NovaStore
      </router-link>

      <!-- hamburger -->
      <button
        class="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- hamburger links -->
      <div
        class="collapse navbar-collapse"
        id="navbarNav"
      >

        <!-- styling for the centered area -->
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-3 fw-medium">

          <li class="nav-item">
            <router-link class="nav-link text-white-50 p-2" to="/">Home</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link text-white-50 p-2" to="/products">Products</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link text-white-50 p-2" to="/cart">Cart</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link text-white-50 p-2" to="/favorites">Favourites</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link text-white-50 p-2" to="/about">About Us</router-link>
          </li>

        </ul>

        <!-- right aligned navbar settings -->
        <div class="d-flex align-items-center gap-3 mt-3 mt-lg-0">
          
          <template v-if="!$store.state.user">
            <router-link class="text-white-50 text-decoration-none fw-medium link-hover" to="/register">Register</router-link>
            <router-link class="text-white-50 text-decoration-none fw-medium link-hover" to="/login">
              Login
            </router-link>
          </template>

          <template v-else>
            <router-link class="text-white-50 text-decoration-none fw-medium link-hover" to="/profile">{{ $store.state.user.username }}</router-link>
            <a class="text-white-50 text-decoration-none fw-medium link-hover" href="#" @click.prevent="logout">Logout</a>
          </template>

        </div>

      </div>

    </div>

  </nav>
</template>

<script>
export default {
  name: 'NavbarComponent',
  computed: {
    isHome() {
      return this.$route.path === '/'
    }
  },
  methods: {
    logout() {
      this.$store.commit('clearUser')
      this.$router.push('/')
    }
  }
}
</script>