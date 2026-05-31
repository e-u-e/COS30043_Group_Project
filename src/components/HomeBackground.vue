<template>
  <section class="hero-section position-relative d-flex align-items-center text-white text-center overflow-hidden">
    
		<!-- star trails background element -->
		<div class="star-bg position-absolute w-100 h-100" v-parallax="{ speed: 0.2, rotate: 0.03, scale: 0.0005, scaleBase: 1.15 }"></div>

		<!-- main weapper for the bg -->
		<div class="container position-relative z-1 hero-content" v-parallax="0.6">

		<h1 class="display-3 fw-bold mb-3">
			Welcome to NovaStore
		</h1>

		<p class="lead mb-4 fw-normal text-white" style="letter-spacing: 0.5px;">
			Discover the latest electronics, fashion, and accessories
		</p>

		<router-link
			to="/products"
			class="btn btn-primary rounded-pill btn-lg px-4 py-2"
		>
			Shop Now
		</router-link>

		</div>

  </section>
</template>

<script>
export default {
	name: 'HomeBackground'
}
</script>
