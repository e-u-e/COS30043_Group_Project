<template>
  <!-- Main nav wrapper is fixed, floating slightly from top -->
  <nav class="navbar navbar-expand-lg fixed-top p-0 mt-3 top-0 start-0 w-100 z-3">

    <!-- The actual inner pill container -->
    <div
      class="container custom-navbar rounded-pill px-4 py-2 shadow-lg d-flex align-items-center"
      :class="isHome ? 'custom-navbar--home' : 'custom-navbar--page'"
    >

      <!-- Logo -->
      <router-link
        class="navbar-brand fw-bold mb-0 text-white"
        to="/"
      >
        NovaStore
      </router-link>

      <!-- Mobile Toggle -->
      <button
        class="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Links & Actions -->
      <div
        class="collapse navbar-collapse"
        id="navbarNav"
      >

        <!-- Centered Links -->
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
            <router-link class="nav-link text-white-50 p-2" to="/favorites">Favorites</router-link>
          </li>

        </ul>

        <!-- Right Side Actions -->
        <div class="d-flex align-items-center gap-3 mt-3 mt-lg-0">
          
          <template v-if="!$store.state.user">
            <router-link class="text-white-50 text-decoration-none fw-medium link-hover" to="/register">Register</router-link>
            <router-link class="btn btn-primary rounded-pill px-4 fw-medium text-white d-flex align-items-center" to="/login">
              Login
            </router-link>
          </template>

          <template v-else>
            <router-link class="text-white-50 text-decoration-none fw-medium link-hover" to="/profile">{{ $store.state.user.username }}</router-link>
            <a class="btn btn-primary rounded-pill px-4 fw-medium text-white" href="#" @click.prevent="logout">Logout</a>
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

<style scoped>
.custom-navbar {
  /* Base glass styling shared across pages */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  /* extremely subtle border to match glassmorphism */
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.custom-navbar--home {
  background: rgba(30, 31, 34, 0.15);
}

.custom-navbar--page {
  background: rgba(18, 24, 38, 0.72);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 18px 38px rgba(10, 12, 20, 0.18);
}

.link-hover {
  transition: color 0.15s ease;
}

.link-hover:hover {
  color: #fff !important;
}

/* Ensure links become solid white when active/hovered */
.nav-link:hover, .nav-link.router-link-active {
  color: #ffffff !important;
}
</style>