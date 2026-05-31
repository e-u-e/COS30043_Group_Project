<template>
  <div class="container mt-4">

    <h1 class="mb-4">Shopping Cart</h1>

    <!-- Empty state -->
    <div v-if="cart.length === 0" class="text-center py-5">
      <div class="mb-3" style="font-size: 4rem;">🛒</div>
      <h4 class="text-muted mb-3">Your cart is empty</h4>
      <router-link to="/products" class="btn btn-primary rounded-pill px-5">
        Browse Products
      </router-link>
    </div>

    <!-- Cart items -->
    <div v-else>
      <div class="row g-4">

        <!-- Item list -->
        <div class="col-12 col-lg-8">
          <TransitionGroup name="cart-item" tag="div" class="d-flex flex-column gap-3">
            <div
              v-for="item in cart"
              :key="item.id"
              class="card shadow-sm cart-item"
            >
              <div class="card-body d-flex align-items-center gap-3 flex-wrap">

                <!-- Image -->
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="rounded"
                  style="width: 80px; height: 80px; object-fit: contain; background:#fff;"
                >

                <!-- Info -->
                <div class="flex-grow-1">
                  <h6 class="mb-1">{{ item.name }}</h6>
                  <span class="text-muted small">{{ item.category }}</span>
                  <div class="text-primary fw-semibold mt-1">${{ item.price }}</div>
                </div>

                <!-- Quantity controls -->
                <div class="d-flex align-items-center gap-2">
                  <div class="input-group" style="width: 120px;">
                    <button
                      class="btn btn-outline-secondary btn-sm"
                      type="button"
                      @click="decreaseQty(item)"
                    >−</button>
                    <input
                      type="number"
                      class="form-control form-control-sm text-center qty-input"
                      :value="item.quantity"
                      min="1"
                      max="99"
                      @change="updateQty(item, $event.target.value)"
                    >
                    <button
                      class="btn btn-outline-secondary btn-sm"
                      type="button"
                      @click="increaseQty(item)"
                    >+</button>
                  </div>

                  <!-- Item subtotal -->
                  <span class="fw-semibold" style="min-width: 70px; text-align:right;">
                    ${{ (item.price * item.quantity).toFixed(2) }}
                  </span>

                  <!-- Remove button -->
                  <button
                    class="btn btn-sm btn-outline-danger rounded-circle"
                    style="width:32px;height:32px;"
                    @click="removeItem(item)"
                    title="Remove item"
                  >✕</button>
                </div>

              </div>
            </div>
          </TransitionGroup>

          <!-- Clear cart -->
          <div class="mt-3 text-end">
            <button class="btn btn-sm btn-outline-secondary" @click="clearCart">
              Clear Cart
            </button>
          </div>
        </div>

        <!-- Order summary -->
        <div class="col-12 col-lg-4">
          <div class="card shadow-sm sticky-top" style="top: 100px;">
            <div class="card-body">
              <h5 class="card-title mb-3">Order Summary</h5>

              <div class="d-flex justify-content-between mb-2">
                <span class="text-muted">Subtotal ({{ totalItems }} items)</span>
                <span>${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span class="text-muted">Shipping</span>
                <span class="text-success">{{ subtotal >= 100 ? 'Free' : '$9.99' }}</span>
              </div>
              <hr>
              <div class="d-flex justify-content-between fw-bold fs-5 mb-4">
                <span>Total</span>
                <span>${{ total.toFixed(2) }}</span>
              </div>

              <router-link
                to="/checkout"
                class="btn btn-success w-100 rounded-pill mb-2"
              >
                Proceed to Checkout
              </router-link>
              <router-link to="/products" class="btn btn-outline-secondary w-100 rounded-pill">
                Continue Shopping
              </router-link>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { store } from '../store/index.js'

export default {
  name: 'CartView',

  computed: {
    cart() { return store.state.cart },
    totalItems() { return store.cartCount() },
    subtotal() { return store.cartTotal() },
    total() {
      const shipping = this.subtotal >= 100 ? 0 : 9.99
      return this.subtotal + shipping
    }
  },

  methods: {
    increaseQty(item) {
      store.updateCartQuantity(item.id, item.quantity + 1)
    },
    decreaseQty(item) {
      store.updateCartQuantity(item.id, item.quantity - 1)
    },
    updateQty(item, value) {
      const qty = parseInt(value)
      if (!isNaN(qty)) store.updateCartQuantity(item.id, qty)
    },
    removeItem(item) {
      store.removeFromCart(item.id)
    },
    clearCart() {
      store.clearCart()
    }
  }
}
</script>

<style scoped>
/* Hide native number-input spinner arrows; the −/+ buttons control quantity */
.qty-input::-webkit-outer-spin-button,
.qty-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.qty-input {
  -moz-appearance: textfield;
  appearance: textfield;
}

.cart-item-enter-active,
.cart-item-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.cart-item-enter-from,
.cart-item-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
.cart-item-move {
  transition: transform 0.3s ease;
}
</style>
