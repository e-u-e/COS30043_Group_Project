<template>
  <div class="container mt-5 mb-5">
    <!-- Header Section -->
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold">About NovaStore</h1>
      <p class="lead text-muted">Discover the latest electronics, fashion, and accessories</p>
    </div>

    <hr class="my-5" />

    <!-- Our Story Section -->
    <div class="row justify-content-center mb-5">
      <div class="col-md-8">
        <h3 class="mb-3">Our Story</h3>
        <p>
          Welcome to <strong>NovaStore</strong>! We believe that staying ahead of the curve shouldn’t be complicated. 
          Whether you are upgrading your everyday tech, refreshing your wardrobe, or searching for the perfect finishing 
          touch to your outfit, we are here to bring you the best of modern living.
        </p>
        <p>
          NovaStore was founded with a simple, clear mission: to create a seamless shopping experience that bridges 
          the gap between cutting-edge utility and effortless style. The word <strong>"Nova"</strong> signifies a bright 
          new star and that is exactly what we aim to be in your daily routine.
        </p>
      </div>
    </div>

    <!-- What We Offer Section -->
    
    <div class="bg-body-tertiary p-4 rounded-3 row g-4 mb-5">
      <h3 class="text-center mb-4 fw-bold">What We Offer</h3>
      <div v-for="(offer, index) in offers" :key="index" class="col-md-4">
        <div class="card h-100 border-0 shadow-sm p-3">
          <div class="card-body">
            <h5 class="card-title fw-bold text-primary">{{ offer.title }}</h5>
            <p class="card-text text-secondary">{{ offer.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Core Values Section -->
    <div class="bg-body-tertiary p-4 rounded-3 mb-5">
      <h4 class="text-center mb-4 fw-bold">Why Shop With Us?</h4>
      <div class="row">
        <div v-for="(value, index) in values" :key="index" class="col-md-4 text-center">
          <h6 class="card-title fw-bold text-primary">{{ value.title }}</h6>
          <p class="card-text text-secondary">{{ value.text }}</p>
        </div>
      </div>
    </div>

    <!-- Footer Note -->
    <div class="text-center mt-5">
      <p class="fw-bold">Thank you for choosing NovaStore as your go-to lifestyle destination.</p>
      <router-link to="/" class="btn btn-primary px-4 py-2">Explore Our Collections</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
  data() {
    return {
      offers: [
        {
          title: 'Latest Electronics',
          description: 'From smart gadgets that streamline your day to high-performance tech essentials, we source reliable electronics designed to keep you connected.'
        },
        {
          title: 'Trending Fashion',
          description: 'True style is about confidence. Our fashion collections feature versatile, high-quality pieces that blend comfort with contemporary trends.'
        },
        {
          title: 'Essential Accessories',
          description: 'The details make the outfit. Our curated accessories are chosen to complement your lifestyle, adding functionality and flair to your look.'
        }
      ],
      values: [
        { title: 'Quality First', text: 'We vet our products for durability and performance so you can shop with absolute confidence.' },
        { title: 'Customer Centric', text: 'From browsing to unboxing, we are dedicated to making your shopping experience smooth and enjoyable.' },
        { title: 'Forward-Thinking', text: 'We constantly update our inventory with the latest releases so you never miss a beat.' }
      ]
    }
  }
}
</script>

<style scoped>
/* Optional custom transitions or tweaks to match your project aesthetic */
.card {
  transition: transform 0.2s ease-in-out;
}
.card:hover {
  transform: translateY(-5px);
}
</style>