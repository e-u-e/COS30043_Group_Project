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
  data() {
    return {
      // Holds the reactive state for the current active theme look
      isDarkMode: false
    }
  },
  computed: {
    isHome() {
      return this.$route.path === '/'
    }
  },
  mounted() {
    // 1. Check if the user has manually saved a preference previously
    const savedTheme = localStorage.getItem('theme');
    
    // 2. If a preference exists, use it. Otherwise, match their browser/OS preference
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
    } else {
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    // 3. Immediately set up the correct data attribute on page mounting tree
    this.applyTheme();
  },
  methods: {
    logout() {
      this.$store.commit('clearUser')
      this.$router.push('/')
    },
    toggleTheme() {
      // Flips the layout variant boolean switch
      this.isDarkMode = !this.isDarkMode;
      
      // Save the state choice so it persists across views and pages
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
      
      // Trigger the engine layout repaint execution attribute
      this.applyTheme();
    },
    applyTheme() {
      const themeValue = this.isDarkMode ? 'dark' : 'light';
      // Dynamically toggles Bootstrap's data-bs-theme property on the root html node element
      document.documentElement.setAttribute('data-bs-theme', themeValue);
    }
  }
}
</script>

<style scoped>
/* ==========================================================================
   1. BASE GLASS NAV CONFIGURATION (Shared across modes)
   ========================================================================== */
.custom-navbar {
  /* Liquid glass effect base configuration */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--bs-border-color);
  transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.link-hover {
  transition: color 0.15s ease;
}

/* ==========================================================================
   2. LIGHT MODE UTILITIES (Standard Look)
   ========================================================================== */
.custom-navbar--home {
  background: rgba(30, 31, 34, 0.15);
}

.custom-navbar--page {
  background: rgba(255, 255, 255, 0.65); /* Soft glass gray-white tint */
  box-shadow: 0 18px 38px rgba(10, 12, 20, 0.08);
}

/* Home Layout Text Color rules (Default text properties) */
.custom-navbar--home .navbar-brand { color: #ffffff !important; }
.custom-navbar--home .nav-link, 
.custom-navbar--home .link-hover { color: rgba(255, 255, 255, 0.7) !important; }

/* Non-Home Layout Text Colors (Flips cleanly to black text on white pages) */
.custom-navbar--page .navbar-brand {
  font-weight: 700;
  color: rgba(0, 0, 0, 0.85) !important;
}
.custom-navbar--page .nav-link,
.custom-navbar--page .link-hover {
  color: rgba(0, 0, 0, 0.6) !important;
}

/* Hover dynamics for light variants */
.custom-navbar--home .nav-link:hover,
.custom-navbar--home .link-hover:hover { color: #ffffff !important; }

.custom-navbar--page .nav-link:hover,
.custom-navbar--page .link-hover:hover { color: #000000 !important; }


/* ==========================================================================
   3. NATIVE BOOTSTRAP DARK MODE OVERRIDES (Google/WhatsApp Feel)
   ========================================================================== */
[data-bs-theme="dark"] .custom-navbar--home {
  background: rgba(18, 18, 18, 0.4); /* Translucent dark tint */
}

[data-bs-theme="dark"] .custom-navbar--page {
  background: rgba(36, 36, 36, 0.7); /* WhatsApp/Google translucent card layer */
  box-shadow: 0 18px 38px rgba(0, 0, 0, 0.4);
}

/* Force dark-mode text to inherit your crisp, soft-eye off-whites globally */
[data-bs-theme="dark"] .navbar-brand {
  color: var(--text-h) !important;
}
[data-bs-theme="dark"] .nav-link,
[data-bs-theme="dark"] .link-hover {
  color: var(--text) !important;
}
[data-bs-theme="dark"] .nav-link:hover,
[data-bs-theme="dark"] .link-hover:hover {
  color: var(--text-h) !important;
}

/* ==========================================================================
   4. ACTIVE ROUTE LINKS (Discord / Premium Accent Pill style)
   ========================================================================== */
.custom-navbar .nav-link.router-link-active {
  background: #5865F2; /* Custom accent blue branding */
  color: #ffffff !important;
  border-radius: 999px;
  padding-left: 0.8rem !important;
  padding-right: 0.8rem !important;
  box-shadow: 0 6px 18px rgba(88, 101, 242, 0.25);
}

.custom-navbar .nav-link:focus-visible {
  outline: 2px solid rgba(88, 101, 242, 0.4);
  outline-offset: 3px;
}

/* ==========================================================================
   5. MOBILE LAYER COMPLIANCE
   ========================================================================== */
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
    background: rgba(255, 255, 255, 0.98); /* Matte white drop-down for light mode */
    border: 1px solid var(--bs-border-color);
    box-shadow: 0 18px 38px rgba(10, 12, 20, 0.15);
  }

  /* WhatsApp/Google Mobile Drawer Dark Setup */
  [data-bs-theme="dark"] .navbar-collapse {
    background: rgba(30, 30, 30, 0.98) !important;
    box-shadow: 0 18px 38px rgba(0, 0, 0, 0.5);
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
  
  /* Reset responsive overrides to enforce theme compatibility */
  .custom-navbar--page .navbar-brand, 
  .custom-navbar--page .nav-link, 
  .custom-navbar--page .link-hover {
    color: inherit;
  }
}

/* Custom Theme Switcher Styling */
.theme-toggle-btn {
  background: transparent;
  border: 1px solid transparent;
  color: var(--text);
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-toggle-btn:hover {
  background-color: var(--accent-bg);
  color: var(--accent) !important;
  border-color: var(--accent-border);
}

/* Ensure the color fits perfectly regardless of home view logic context rules */
.custom-navbar--home .theme-toggle-btn {
  color: rgba(255, 255, 255, 0.75);
}
.custom-navbar--home .theme-toggle-btn:hover {
  color: #ffffff !important;
}
</style>
