<template>
  <div class="container mt-4">

    <!-- Order confirmed screen -->
    <div v-if="orderPlaced" class="row justify-content-center py-5">
      <div class="col-12 col-md-6 text-center">
        <div class="mb-3" style="font-size: 5rem;">✅</div>
        <h2 class="mb-2">Order Placed!</h2>
        <p class="text-muted mb-1">Thank you, <strong>{{ $store.state.user?.username }}</strong>.</p>
        <p class="text-muted mb-4">Order <strong>#{{ placedOrder.id }}</strong> is being processed.</p>
        <div class="card shadow-sm mb-4">
          <div class="card-body">
            <h6 class="mb-3">Items Ordered</h6>
            <div v-for="item in placedOrder.items" :key="item.id" class="d-flex justify-content-between mb-1">
              <span>{{ item.name }} × {{ item.quantity }}</span>
              <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
            <hr>
            <div class="d-flex justify-content-between fw-bold">
              <span>Total Paid</span>
              <span>${{ placedOrder.total.toFixed(2) }}</span>
            </div>
          </div>
        </div>
        <router-link to="/products" class="btn btn-primary rounded-pill px-5">
          Continue Shopping
        </router-link>
      </div>
    </div>

    <!-- Checkout form -->
    <div v-else class="row g-4">

      <div class="col-12 col-lg-7">
        <h2 class="mb-4">Checkout</h2>

        <div class="card shadow-sm mb-4">
          <div class="card-body p-4">
            <h5 class="card-title mb-3">Shipping Details</h5>

            <form @submit.prevent="placeOrder" novalidate>

              <div class="row g-3">

                <div class="col-12 col-md-6">
                  <label class="form-label fw-medium">First Name <span class="text-danger">*</span></label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': v$.firstName.$error }"
                    v-model="form.firstName"
                    @blur="v$.firstName.$touch"
                  >
                  <div class="invalid-feedback">First name is required</div>
                </div>

                <div class="col-12 col-md-6">
                  <label class="form-label fw-medium">Last Name <span class="text-danger">*</span></label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': v$.lastName.$error }"
                    v-model="form.lastName"
                    @blur="v$.lastName.$touch"
                  >
                  <div class="invalid-feedback">Last name is required</div>
                </div>

                <div class="col-12">
                  <label class="form-label fw-medium">Email <span class="text-danger">*</span></label>
                  <input
                    type="email"
                    class="form-control"
                    :class="{ 'is-invalid': v$.email.$error }"
                    v-model="form.email"
                    @blur="v$.email.$touch"
                  >
                  <div class="invalid-feedback">Valid email is required</div>
                </div>

                <div class="col-12">
                  <label class="form-label fw-medium">Street Address <span class="text-danger">*</span></label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': v$.address.$error }"
                    v-model="form.address"
                    @blur="v$.address.$touch"
                    placeholder="123 Main St"
                  >
                  <div class="invalid-feedback">Address is required</div>
                </div>

                <div class="col-12 col-md-6">
                  <label class="form-label fw-medium">City <span class="text-danger">*</span></label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': v$.city.$error }"
                    v-model="form.city"
                    @blur="v$.city.$touch"
                  >
                  <div class="invalid-feedback">City is required</div>
                </div>

                <div class="col-12 col-md-6">
                  <label class="form-label fw-medium">Postcode <span class="text-danger">*</span></label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': v$.postcode.$error }"
                    v-model="form.postcode"
                    @blur="v$.postcode.$touch"
                    maxlength="4"
                    placeholder="3000"
                  >
                  <div class="invalid-feedback">Valid 4-digit postcode required</div>
                </div>

                <div class="col-12">
                  <label class="form-label fw-medium">Payment Method</label>
                  <div class="d-flex gap-3 mt-1 flex-wrap">
                    <div
                      v-for="method in paymentMethods"
                      :key="method.value"
                      class="form-check payment-option p-3 rounded border flex-grow-1"
                      :class="{ 'border-primary bg-primary bg-opacity-10': form.payment === method.value }"
                      @click="form.payment = method.value"
                    >
                      <input
                        class="form-check-input"
                        type="radio"
                        :id="'pay-' + method.value"
                        :value="method.value"
                        v-model="form.payment"
                      >
                      <label class="form-check-label fw-medium" :for="'pay-' + method.value">
                        {{ method.label }}
                      </label>
                    </div>
                  </div>
                </div>

              </div>

              <button type="submit" class="btn btn-success w-100 rounded-pill mt-4 py-2 fs-5">
                Place Order (${{ total.toFixed(2) }})
              </button>

            </form>
          </div>
        </div>
      </div>

      <!-- Order summary sidebar -->
      <div class="col-12 col-lg-5">
        <div class="card shadow-sm sticky-top" style="top: 100px;">
          <div class="card-body p-4">
            <h5 class="card-title mb-3">Order Summary</h5>
            <div v-for="item in cart" :key="item.id" class="d-flex align-items-center gap-2 mb-2">
              <img
                :src="item.image"
                :alt="item.name"
                style="width:40px;height:40px;object-fit:contain;background:#fff;"
                class="rounded border"
              >
              <div class="flex-grow-1 small">
                <div class="fw-medium">{{ item.name }}</div>
                <div class="text-muted">× {{ item.quantity }}</div>
              </div>
              <span class="fw-semibold small">${{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
            <hr>
            <div class="d-flex justify-content-between mb-1">
              <span class="text-muted">Subtotal</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">Shipping</span>
              <span :class="shipping === 0 ? 'text-success' : ''">
                {{ shipping === 0 ? 'Free' : '$' + shipping.toFixed(2) }}
              </span>
            </div>
            <hr>
            <div class="d-flex justify-content-between fw-bold fs-5">
              <span>Total</span>
              <span>${{ total.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import { store } from '../store/index.js'

const postcodeAU = helpers.regex(/^\d{4}$/)

export default {
  name: 'CheckoutView',

  setup() {
    return { v$: useVuelidate() }
  },

  data() {
    const user = store.state.user
    return {
      form: {
        firstName: '',
        lastName:  '',
        email:     user?.email || '',
        address:   '',
        city:      '',
        postcode:  '',
        payment:   'card'
      },
      paymentMethods: [
        { value: 'card',   label: 'Credit / Debit Card' },
        { value: 'paypal', label: 'PayPal' },
        { value: 'crypto', label: 'Crypto' }
      ],
      orderPlaced: false,
      placedOrder: null
    }
  },

  validations() {
    return {
      firstName: { required },
      lastName:  { required },
      email:     { required, email },
      address:   { required },
      city:      { required },
      postcode:  { required, postcodeAU }
    }
  },

  computed: {
    // Bridge form fields to top-level keys so Vuelidate (which validates
    // top-level properties) can see the nested form.* values.
    firstName() { return this.form.firstName },
    lastName()  { return this.form.lastName },
    email()     { return this.form.email },
    address()   { return this.form.address },
    city()      { return this.form.city },
    postcode()  { return this.form.postcode },

    cart()     { return store.state.cart },
    subtotal() { return store.cartTotal() },
    shipping() { return this.subtotal >= 100 ? 0 : 9.99 },
    total()    { return this.subtotal + this.shipping }
  },

  created() {
    if (store.state.cart.length === 0) {
      this.$router.push('/cart')
    }
  },

  methods: {
    async placeOrder() {
      const valid = await this.v$.$validate()
      if (!valid) return

      const order = store.placeOrder({
        username: store.state.user?.username || 'guest',
        items:    store.state.cart.map(i => ({ ...i })),
        total:    this.total,
        shipping: this.form
      })

      store.clearCart()
      this.placedOrder = order
      this.orderPlaced = true
    }
  }
}
</script>

<style scoped>
.payment-option {
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s;
  min-width: 140px;
}
</style>
