<template>
  <div class="container mt-4">

    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
      <h1 class="mb-0">Admin Panel</h1>
      <router-link to="/admin/add-product" class="btn btn-success rounded-pill px-4">
        + Add Product
      </router-link>
    </div>

    <!-- Stats cards -->
    <div class="row g-3 mb-4">
      <div class="col-6 col-md-3">
        <div class="card shadow-sm text-center p-3">
          <div class="fs-1 fw-bold text-primary">{{ products.length }}</div>
          <div class="text-muted small">Total Products</div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card shadow-sm text-center p-3">
          <div class="fs-1 fw-bold text-success">{{ categories.length }}</div>
          <div class="text-muted small">Categories</div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card shadow-sm text-center p-3">
          <div class="fs-1 fw-bold text-warning">{{ avgPrice }}</div>
          <div class="text-muted small">Avg. Price ($)</div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card shadow-sm text-center p-3">
          <div class="fs-1 fw-bold text-danger">{{ maxPrice }}</div>
          <div class="text-muted small">Highest Price ($)</div>
        </div>
      </div>
    </div>

    <!-- Search & filter bar -->
    <div class="d-flex gap-2 mb-3 flex-wrap">
      <input
        v-model="search"
        type="text"
        class="form-control"
        placeholder="Search products..."
        style="max-width: 280px;"
      >
      <select v-model="filterCategory" class="form-select" style="max-width: 180px;">
        <option value="">All Categories</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <!-- Products table -->
    <div class="card shadow-sm">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th style="width:60px">#</th>
              <th style="width:70px">Image</th>
              <th>
                <span class="sortable" @click="toggleSort('name')">
                  Name {{ sortIndicator('name') }}
                </span>
              </th>
              <th>Category</th>
              <th>
                <span class="sortable" @click="toggleSort('price')">
                  Price {{ sortIndicator('price') }}
                </span>
              </th>
              <th style="width: 140px">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in filtered" :key="product.id">
              <td class="text-muted small">{{ product.id }}</td>
              <td>
                <img
                  :src="product.image"
                  :alt="product.name"
                  style="width:48px;height:48px;object-fit:contain;background:#fff;"
                  class="rounded border"
                >
              </td>
              <td class="fw-medium">{{ product.name }}</td>
              <td>
                <span class="badge bg-secondary">{{ product.category }}</span>
              </td>
              <td class="text-primary fw-semibold">${{ product.price }}</td>
              <td>
                <div class="d-flex gap-1">
                  <router-link
                    :to="`/admin/edit-product/${product.id}`"
                    class="btn btn-sm btn-outline-primary rounded-pill px-3"
                  >Edit</router-link>
                  <button
                    class="btn btn-sm btn-outline-danger rounded-pill px-3"
                    @click="confirmDelete(product)"
                  >Delete</button>
                </div>
              </td>
            </tr>
            <tr v-if="filtered.length === 0">
              <td colspan="6" class="text-center text-muted py-4">No products found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Delete confirmation modal (Bootstrap) -->
    <div
      v-if="deleteTarget"
      class="modal d-block"
      tabindex="-1"
      style="background: rgba(0,0,0,0.5);"
      @click.self="deleteTarget = null"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm Delete</h5>
            <button type="button" class="btn-close" @click="deleteTarget = null" />
          </div>
          <div class="modal-body">
            Are you sure you want to delete <strong>{{ deleteTarget.name }}</strong>? This cannot be undone.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="deleteTarget = null">Cancel</button>
            <button type="button" class="btn btn-danger" @click="doDelete">Delete</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getManagedProducts, deleteManagedProduct } from '../services/productManagement.js'

export default {
  name: 'AdminView',

  data() {
    return {
      products: [],
      search: '',
      filterCategory: '',
      sortKey: '',
      sortDir: 1,
      deleteTarget: null
    }
  },

  computed: {
    categories() {
      return [...new Set(this.products.map(p => p.category))].sort()
    },
    avgPrice() {
      if (!this.products.length) return 0
      return (this.products.reduce((s, p) => s + p.price, 0) / this.products.length).toFixed(0)
    },
    maxPrice() {
      return this.products.reduce((m, p) => Math.max(m, p.price), 0)
    },
    filtered() {
      let list = this.products.slice()
      const q = this.search.toLowerCase()
      if (q) list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
      if (this.filterCategory) list = list.filter(p => p.category === this.filterCategory)
      if (this.sortKey) {
        list.sort((a, b) => {
          const va = typeof a[this.sortKey] === 'string' ? a[this.sortKey].toLowerCase() : a[this.sortKey]
          const vb = typeof b[this.sortKey] === 'string' ? b[this.sortKey].toLowerCase() : b[this.sortKey]
          return va < vb ? -this.sortDir : va > vb ? this.sortDir : 0
        })
      }
      return list
    }
  },

  created() {
    this.load()
  },

  methods: {
    load() {
      this.products = getManagedProducts()
    },
    toggleSort(key) {
      if (this.sortKey === key) {
        this.sortDir = -this.sortDir
      } else {
        this.sortKey = key
        this.sortDir = 1
      }
    },
    sortIndicator(key) {
      if (this.sortKey !== key) return '↕'
      return this.sortDir === 1 ? '↑' : '↓'
    },
    confirmDelete(product) {
      this.deleteTarget = product
    },
    doDelete() {
      deleteManagedProduct(this.deleteTarget.id)
      this.deleteTarget = null
      this.load()
    }
  }
}
</script>

<style scoped>
.sortable {
  cursor: pointer;
  user-select: none;
}
.sortable:hover {
  color: var(--bs-primary);
}
</style>
