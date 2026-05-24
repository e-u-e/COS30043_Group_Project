<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">

    <div class="container">

      <!-- Logo -->
      <router-link
        class="navbar-brand fw-bold"
        to="/"
      >
        NovaStore
      </router-link>

      <!-- Mobile Toggle -->
      <button
        class="navbar-toggler"
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

        <ul class="navbar-nav ms-auto">

          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/"
            >
              Home
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/products"
            >
              Products
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/cart"
            >
              Cart
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/favorites"
            >
              Favorites
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/login"
            >
              Login
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/register"
            >
              Register
            </router-link>
          </li>

        </ul>

      </div>

    </div>

  </nav>
</template>