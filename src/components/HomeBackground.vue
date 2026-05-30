<template>
  <section class="hero-section position-relative d-flex align-items-center text-white text-center overflow-hidden">
    
		<!-- Star trails background element -->
		<div class="star-bg position-absolute w-100 h-100" v-parallax="{ speed: 0.2, rotate: 0.03, scale: 0.0005, scaleBase: 1.15 }"></div>

		<!-- Content wrapper -->
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

<style scoped> .hero-section {
  /*give it a noticeable scroll effect*/
  min-height: 80vh;
  background-color: #0b0c10;
}

/*using local image and increased size to avoid clipping*/
.star-bg {
  top: 0;
  left: 0;
  background-image: url('/fred-moon-star-trails.jpg'); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transform: translateY(var(--parallax-y, 0px)) rotate(var(--parallax-rotate, 0deg)) scale(var(--parallax-scale, 1.15));
  transform-origin: center center;
  opacity: 0.8;
  will-change: transform;
}

/*text color contrasting*/
.hero-content {
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.9);
  transform: translateY(var(--parallax-y, 0px));
  will-change: transform;
}
</style>
