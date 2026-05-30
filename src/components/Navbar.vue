<template>
  <!-- testing out a navbar layout-->
  <nav class="navbar navbar-expand-lg fixed-top p-0 mt-3 top-0 start-0 w-100 z-3">

    <!-- pill container shaped -->
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

      <!-- Links -->
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

<style scoped>
.custom-navbar {
  /*trying to mimic liquid glass navbars*/
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.custom-navbar--home {
  background: rgba(30, 31, 34, 0.15);
}

.custom-navbar--page {
  background: rgba(30, 31, 34, 0.15);
  box-shadow: 0 18px 38px rgba(10, 12, 20, 0.18);
}

/*when isHome is false, text = black*/
.custom-navbar--page .navbar-brand, .custom-navbar--page .nav-link, .custom-navbar--page .link-hover, .custom-navbar--page .text-white-50 {
  color: rgba(0,0,0,0.85) !important;
}

.custom-navbar--page .navbar-brand {
  font-weight: 700;
}

.link-hover {
  transition: color 0.15s ease;
}

.link-hover:hover {
  color: #fff !important;
}

/*solid white links on hover*/
.nav-link:hover {
  color: #ffffff !important;
}

/*blue pill container*/
.custom-navbar .nav-link.router-link-active {
  background: #5865F2;
  color: #ffffff !important;
  border-radius: 999px;
  padding-left: 0.8rem !important;
  padding-right: 0.8rem !important;
  box-shadow: 0 6px 18px rgba(88,101,242,0.18);
}

.custom-navbar .nav-link:focus-visible {
  outline: 2px solid rgba(88,101,242,0.28);
  outline-offset: 3px;
}

/*nav specifically for mobile devices*/
@media (max-width: 992px) {
  .custom-navbar {
    border-radius: 1rem !important;
    align-items: flex-start !important;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .navbar-toggler {
    margin-left: auto;
  }

  .navbar-collapse {
    width: 100%;
    margin-top: 0.75rem;
    padding: 0.9rem 1rem 1rem;
    border-radius: 1rem;
    background: rgba(18, 24, 38, 0.95);
    box-shadow: 0 18px 38px rgba(10, 12, 20, 0.28);
  }

  .navbar-nav {
    gap: 0 !important;
    width: 100%;
  }

  .navbar-nav .nav-item {
    width: 100%;
  }

  .navbar-nav .nav-link {
    display: block;
    width: 100%;
    margin-bottom: 0.35rem;
    padding: 0.8rem 1rem !important;
    border-radius: 0.85rem;
  }

  .custom-navbar .nav-link.router-link-active {
    border-radius: 0.85rem;
  }

  .custom-navbar--page .navbar-brand, .custom-navbar--page .nav-link, .custom-navbar--page .link-hover, .custom-navbar--page .text-white-50 {
    color: rgba(255, 255, 255, 0.95) !important;
  }

  .link-hover:hover, .nav-link:hover {
    color: #ffffff !important;
  }
}
</style>