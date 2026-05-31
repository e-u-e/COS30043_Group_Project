<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">

        <div class="d-flex align-items-center gap-3 mb-4">
          <router-link to="/admin" class="btn btn-sm btn-outline-secondary rounded-pill">
            Back to Admin
          </router-link>
          <h2 class="mb-0">Edit Product</h2>
        </div>

        <div v-if="!product" class="alert alert-warning">
          Product not found. <router-link to="/admin">Go back to admin.</router-link>
        </div>

        <div v-else class="card shadow-sm">
          <div class="card-body p-4">
            <ProductForm
              :initial-data="product"
              submit-label="Save Changes"
              @submit="onSubmit"
            />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import ProductForm from '../components/ProductForm.vue'
import { getManagedProductById, updateManagedProduct } from '../services/productManagement.js'

export default {
  name: 'EditProductView',
  components: { ProductForm },

  data() {
    return { product: null }
  },

  created() {
    this.product = getManagedProductById(this.$route.params.id)
  },

  methods: {
    onSubmit(data) {
      updateManagedProduct(this.$route.params.id, data)
      this.$router.push('/admin')
    }
  }
}
</script>
