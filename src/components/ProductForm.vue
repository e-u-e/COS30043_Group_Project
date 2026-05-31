<template>
  <form @submit.prevent="handleSubmit" novalidate>

    <div class="row g-3">

      <!-- Name -->
      <div class="col-12">
        <label for="pf-name" class="form-label fw-medium">Product Name <span class="text-danger">*</span></label>
        <input
          id="pf-name"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': v$.name.$error }"
          v-model="form.name"
          @blur="v$.name.$touch"
          placeholder="e.g. Wireless Headphones"
        >
        <div class="invalid-feedback">Product name is required</div>
      </div>

      <!-- Price -->
      <div class="col-12 col-md-6">
        <label for="pf-price" class="form-label fw-medium">Price ($) <span class="text-danger">*</span></label>
        <input
          id="pf-price"
          type="number"
          class="form-control"
          :class="{ 'is-invalid': v$.price.$error }"
          v-model.number="form.price"
          @blur="v$.price.$touch"
          min="0"
          step="0.01"
          placeholder="0.00"
        >
        <div class="invalid-feedback">
          {{ form.price === '' || form.price === null ? 'Price is required' : 'Price must be greater than 0' }}
        </div>
      </div>

      <!-- Category -->
      <div class="col-12 col-md-6">
        <label for="pf-category" class="form-label fw-medium">Category <span class="text-danger">*</span></label>
        <select
          id="pf-category"
          class="form-select"
          :class="{ 'is-invalid': v$.category.$error }"
          v-model="form.category"
          @blur="v$.category.$touch"
        >
          <option value="" disabled>Select a category</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
        <div class="invalid-feedback">Please select a category</div>
      </div>

      <!-- Description -->
      <div class="col-12">
        <label for="pf-desc" class="form-label fw-medium">Description <span class="text-danger">*</span></label>
        <textarea
          id="pf-desc"
          class="form-control"
          :class="{ 'is-invalid': v$.description.$error }"
          v-model="form.description"
          @blur="v$.description.$touch"
          rows="3"
          placeholder="Brief description of the product..."
        />
        <div class="invalid-feedback">Description is required</div>
      </div>

      <!-- Image URL -->
      <div class="col-12">
        <label for="pf-image" class="form-label fw-medium">Image URL <span class="text-danger">*</span></label>
        <input
          id="pf-image"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': v$.image.$error }"
          v-model="form.image"
          @blur="v$.image.$touch"
          placeholder="e.g. /my-product.png or https://..."
        >
        <div class="invalid-feedback">Image URL is required</div>
        <!-- Live preview -->
        <div v-if="form.image" class="mt-2 d-flex align-items-center gap-3">
          <img
            :src="form.image"
            alt="preview"
            class="rounded border"
            style="width:80px;height:80px;object-fit:contain;background:#fff;"
            @error="imgError = true"
            @load="imgError = false"
          >
          <span v-if="imgError" class="text-danger small">Image could not be loaded</span>
          <span v-else class="text-success small">Preview looks good</span>
        </div>
      </div>

    </div>

    <div class="d-flex gap-2 mt-4">
      <button type="submit" class="btn btn-primary rounded-pill px-4">{{ submitLabel }}</button>
      <router-link to="/admin" class="btn btn-outline-secondary rounded-pill px-4">Cancel</router-link>
    </div>

  </form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'

export default {
  name: 'ProductForm',
  props: {
    initialData: {
      type: Object,
      default: () => ({ name: '', price: '', category: '', description: '', image: '' })
    },
    submitLabel: {
      type: String,
      default: 'Save'
    }
  },
  emits: ['submit'],

  setup() {
    return { v$: useVuelidate() }
  },

  data() {
    return {
      form: { ...this.initialData },
      imgError: false,
      categories: ['Electronics', 'Fashion', 'Shoes', 'Accessories', 'Home', 'Sports', 'Other']
    }
  },

  validations() {
    return {
      name:        { required },
      price:       { required, minValue: minValue(0.01) },
      category:    { required },
      description: { required },
      image:       { required }
    }
  },

  computed: {
    // Pass computed form fields through to vuelidate
    name()        { return this.form.name },
    price()       { return this.form.price },
    category()    { return this.form.category },
    description() { return this.form.description },
    image()       { return this.form.image }
  },

  watch: {
    initialData(val) {
      this.form = { ...val }
    }
  },

  methods: {
    async handleSubmit() {
      const valid = await this.v$.$validate()
      if (!valid) return
      this.$emit('submit', { ...this.form })
    }
  }
}
</script>
