<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">

        <div class="d-flex align-items-center gap-3 mb-4">
          <router-link to="/admin" class="btn btn-sm btn-outline-secondary rounded-pill">
            ← Back to Admin
          </router-link>
          <h2 class="mb-0">Add New Product</h2>
        </div>

        <div class="card shadow-sm">
          <div class="card-body p-4">
            <ProductForm submit-label="Add Product" @submit="onSubmit" />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import ProductForm from '../components/ProductForm.vue'
import { addManagedProduct } from '../services/productManagement.js'

export default {
  name: 'AddProductView',
  components: { ProductForm },

  methods: {
    onSubmit(data) {
      addManagedProduct(data)
      this.$router.push('/admin')
    }
  }
}
</script>
