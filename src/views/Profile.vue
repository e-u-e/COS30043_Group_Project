<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">

        <div v-if="!$store.state.user">
          <p>You are not logged in. <router-link to="/login">Login here</router-link></p>
        </div>

        <div v-else>
          <h2 class="mb-4">My Profile</h2>

          <div class="row g-4">

            <!-- Account info card -->
            <div class="col-12 col-md-6">
              <div class="card h-100 shadow-sm">
                <div class="card-body">
                  <h5 class="card-title mb-3">Account Details</h5>
                  <table class="table table-borderless mb-0">
                    <tbody>
                      <tr>
                        <th class="text-muted" style="width:40%">Username</th>
                        <td>{{ $store.state.user.username }}</td>
                      </tr>
                      <tr>
                        <th class="text-muted">Email</th>
                        <td>{{ $store.state.user.email }}</td>
                      </tr>
                      <tr>
                        <th class="text-muted">Phone</th>
                        <td>{{ $store.state.user.phone }}</td>
                      </tr>
                      <tr>
                        <th class="text-muted">Role</th>
                        <td>
                          <span class="badge" :class="$store.state.user.is_admin ? 'bg-danger' : 'bg-secondary'">
                            {{ $store.state.user.is_admin ? 'Admin' : 'Customer' }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- Quick links card -->
            <div class="col-12 col-md-6">
              <div class="card h-100 shadow-sm">
                <div class="card-body d-flex flex-column gap-2">
                  <h5 class="card-title mb-3">Quick Links</h5>
                  <router-link to="/cart" class="btn btn-outline-primary rounded-pill">View Cart</router-link>
                  <router-link to="/favorites" class="btn btn-outline-secondary rounded-pill">My Favourites</router-link>
                  <router-link v-if="$store.state.user.is_admin" to="/admin" class="btn btn-outline-danger rounded-pill">Admin Panel</router-link>
                </div>
              </div>
            </div>

            <!-- Order history -->
            <div class="col-12">
              <div class="card shadow-sm">
                <div class="card-body">
                  <h5 class="card-title mb-3">Order History</h5>
                  <div v-if="orders.length === 0" class="text-muted">No orders placed yet.</div>
                  <div v-else class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                      <thead>
                        <tr>
                          <th>Order #</th>
                          <th>Date</th>
                          <th>Items</th>
                          <th>Total</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="order in orders" :key="order.id">
                          <td class="text-muted" style="font-size:0.85rem">{{ order.id }}</td>
                          <td>{{ order.date }}</td>
                          <td>{{ order.items.length }} item(s)</td>
                          <td>${{ order.total.toFixed(2) }}</td>
                          <td>
                            <span class="badge bg-success">{{ order.status }}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <button class="btn btn-danger mt-4" @click="logout">Logout</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store/index.js'

export default {
  name: 'ProfileView',
  computed: {
    orders() {
      if (!store.state.user) return []
      return store.getUserOrders(store.state.user.username)
    }
  },
  methods: {
    logout() {
      this.$store.clearUser()
      this.$router.push('/')
    }
  }
}
</script>
