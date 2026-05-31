<template>
  <div class="container mt-4 product-detail-view">

    <div v-if="product">

      <!-- Product info -->
      <div class="row align-items-center g-4 mb-5">

        <div class="col-md-6 d-flex justify-content-center">
          <img
            :src="product.image"
            class="img-fluid rounded shadow-sm"
            :alt="product.name"
            style="max-height: 420px; object-fit: contain;"
          >
        </div>

        <div class="col-md-6 d-flex flex-column gap-3">

          <div>
            <span class="badge bg-secondary mb-2">{{ product.category }}</span>
            <h2 class="mb-1">{{ product.name }}</h2>
            <p class="text-muted">{{ product.description }}</p>
          </div>

          <!-- Average rating display -->
          <div class="d-flex align-items-center gap-2">
            <StarRating :rating="avgRating" readonly />
            <span class="text-muted small">
              {{ avgRating.toFixed(1) }} ({{ reviews.length }} review{{ reviews.length !== 1 ? 's' : '' }})
            </span>
          </div>

          <h3 class="text-primary mb-0">${{ product.price }}</h3>

          <!-- Quantity + Add to Cart -->
          <div class="d-flex align-items-center gap-2 flex-wrap">
            <div class="input-group" style="width: 130px;">
              <button class="btn btn-outline-secondary" type="button" @click="qty > 1 && qty--">−</button>
              <input type="number" class="form-control text-center qty-input" v-model.number="qty" min="1" max="99">
              <button class="btn btn-outline-secondary" type="button" @click="qty++">+</button>
            </div>
            <button class="btn btn-success rounded-pill px-4" @click="addToCart">
              Add to Cart
            </button>
            <router-link to="/products" class="btn btn-outline-secondary rounded-pill px-4">
              Back
            </router-link>
          </div>

        </div>
      </div>

      <hr>

      <!-- Reviews Section -->
      <section class="mt-4">
        <h3 class="mb-4">Customer Reviews</h3>

        <!-- Review form (logged-in users only) -->
        <div v-if="$store.state.user" class="card mb-4 shadow-sm">
          <div class="card-body">
            <h5 class="card-title mb-3">Write a Review</h5>

            <div v-if="reviewSuccess" class="alert alert-success">Review submitted!</div>

            <form @submit.prevent="submitReview" novalidate>

              <div class="mb-3">
                <label class="form-label fw-medium">Your Rating</label>
                <StarRating v-model="newReview.rating" />
                <div v-if="reviewTouched && !newReview.rating" class="text-danger small mt-1">Please select a rating</div>
              </div>

              <div class="mb-3">
                <label for="reviewComment" class="form-label fw-medium">Comment</label>
                <textarea
                  id="reviewComment"
                  class="form-control"
                  rows="3"
                  v-model="newReview.comment"
                  :class="{ 'is-invalid': reviewTouched && !newReview.comment.trim() }"
                  placeholder="Share your thoughts about this product..."
                />
                <div class="invalid-feedback">Please write a comment</div>
              </div>

              <button type="submit" class="btn btn-primary rounded-pill px-4">Submit Review</button>
            </form>
          </div>
        </div>

        <div v-else class="alert alert-light border mb-4">
          <router-link to="/login">Login</router-link> to leave a review.
        </div>

        <!-- Existing reviews list -->
        <div v-if="reviews.length === 0" class="text-muted">
          No reviews yet. Be the first!
        </div>

        <div
          v-for="review in reviews"
          :key="review.id"
          class="card mb-3 shadow-sm review-card"
        >
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-1">
              <div>
                <span class="fw-semibold me-2">{{ review.username }}</span>
                <StarRating :rating="review.rating" readonly size="sm" />
              </div>
              <div class="d-flex align-items-center gap-2">
                <span class="text-muted small">{{ review.date }}</span>
                <button
                  v-if="canDelete(review)"
                  class="btn btn-sm btn-outline-danger py-0 px-2"
                  @click="deleteReview(review.id)"
                >
                  ✕
                </button>
              </div>
            </div>
            <p class="mb-0 text-muted">{{ review.comment }}</p>
          </div>
        </div>

      </section>
    </div>

    <div v-else class="alert alert-warning">
      Product not found.
    </div>

  </div>
</template>

<script>
import { getProductById } from '../services/api'
import { store } from '../store/index.js'
import StarRating from '../components/StarRating.vue'

export default {
  name: 'ProductDetailView',
  components: { StarRating },

  data() {
    return {
      product: null,
      qty: 1,
      newReview: { rating: 0, comment: '' },
      reviewTouched: false,
      reviewSuccess: false
    }
  },

  computed: {
    reviews() {
      if (!this.product) return []
      return [...store.getReviews(this.product.id)].reverse()
    },
    avgRating() {
      if (!this.product) return 0
      return store.averageRating(this.product.id)
    }
  },

  async created() {
    this.product = await getProductById(this.$route.params.id)
  },

  methods: {
    addToCart() {
      store.addToCart(this.product, this.qty)
    },

    submitReview() {
      this.reviewTouched = true
      if (!this.newReview.rating || !this.newReview.comment.trim()) return

      store.addReview(this.product.id, {
        username: store.state.user.username,
        rating:   this.newReview.rating,
        comment:  this.newReview.comment.trim()
      })

      this.reviewSuccess = true
      this.newReview = { rating: 0, comment: '' }
      this.reviewTouched = false

      setTimeout(() => { this.reviewSuccess = false }, 3000)
    },

    deleteReview(reviewId) {
      store.deleteReview(this.product.id, reviewId)
    },

    canDelete(review) {
      const user = store.state.user
      if (!user) return false
      return user.is_admin || user.username === review.username
    }
  }
}
</script>

<style scoped>
/* Hide the browser's native number-input spinner arrows so only the
   custom −/+ buttons control quantity */
.qty-input::-webkit-outer-spin-button,
.qty-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.qty-input {
  -moz-appearance: textfield;
  appearance: textfield;
}

.review-card { transition: box-shadow 0.2s; }
.review-card:hover { box-shadow: 0 4px 14px rgba(0,0,0,.1) !important; }
</style>
