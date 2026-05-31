<template>
  <div>

    <HomeBackground/>

    <!-- Featured Products -->
    <section class="container my-5">

      <h2 class="mb-4 text-center">
        Featured Products
      </h2>

      <div class="row">

        <div
          class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
          v-for="product in featuredProducts"
          :key="product.id"
        >

          <div class="card h-100 shadow-sm">

            <img
              :src="product.image"
              class="card-img-top"
              alt="product image"
            >

            <div class="card-body d-flex flex-column">

              <h5 class="card-title">
                {{ product.name }}
              </h5>

              <p class="card-text">
                ${{ product.price }}
              </p>

              <router-link
                :to="`/products/${product.id}`"
                class="btn btn-outline-primary rounded-pill mt-auto"
              >
                View Product
              </router-link>

            </div>

          </div>

        </div>

      </div>

    </section>

    <!-- Categories -->
    <section class="bg-body-tertiary py-5">

      <div class="container">

        <h2 class="text-center mb-4">
          Shop By Category
        </h2>

        <div class="row text-center">

          <div class="col-6 col-md-3 mb-4">
            <router-link class="card category p-4 h-100 text-decoration-none" :to="{ path: '/products', query: { category: 'Electronics' } }">
              <h4 class="mb-0">Electronics</h4>
            </router-link>
          </div>

          <div class="col-6 col-md-3 mb-4">
            <router-link class="card category p-4 h-100 text-decoration-none" :to="{ path: '/products', query: { category: 'Fashion' } }">
              <h4 class="mb-0">Fashion</h4>
            </router-link>
          </div>

          <div class="col-6 col-md-3 mb-4">
            <router-link class="card category p-4 h-100 text-decoration-none" :to="{ path: '/products', query: { category: 'Shoes' } }">
              <h4 class="mb-0">Shoes</h4>
            </router-link>
          </div>

          <div class="col-6 col-md-3 mb-4">
            <router-link class="card category p-4 h-100 text-decoration-none" :to="{ path: '/products', query: { category: 'Accessories' } }">
              <h4 class="mb-0">Accessories</h4>
            </router-link>
          </div>

        </div>

      </div>

    </section>

  </div>
</template>

<script>
import products from '../data/products.json'
import HomeBackground from '../components/HomeBackground.vue'

export default {
  components: { HomeBackground },
  setup() {
    const featuredProducts = products.slice(0, 4)
    return { featuredProducts }
  }
}
</script>