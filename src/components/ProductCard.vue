<template>
  <div class="card h-100">

    <img :src="product.image" class="card-img-top">

    <div class="card-body">

      <h5>{{ product.name }}</h5>

      <p>${{ product.price }}</p>

      <router-link
        :to="`/products/${product.id}`"
        class="btn btn-primary"
      >
        View
      </router-link>

    </div>

  </div>
</template>

<script setup>
defineProps({
  product: Object
})
</script>