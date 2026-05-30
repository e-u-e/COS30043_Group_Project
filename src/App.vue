<template>
  <div class="d-flex flex-column min-vh-100">

    <Navbar/>
      <main class="flex-grow-1" :class="{ 'page-wrapper': $route.path !== '/' }">
        <router-view />
      </main>
    <Footer/> 

  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<style>
.page-wrapper {
  /*extra padding for the nav because it was clipping*/
  padding-top: 100px; 
}
</style>