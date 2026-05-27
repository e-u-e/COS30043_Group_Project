<template>
  <div class="container mt-4">

    <h1 class="mb-4">Products</h1>

    <div class="d-flex gap-2 mb-3">
      <SearchBar v-model="search" />

      <select v-model="sortOrder" class="form-select w-auto">
        <option value="">Sort By</option>
        <option value="low">Price Low to High</option>
        <option value="high">Price High to Low</option>
      </select>
    </div>

    <div class="row">
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
        v-for="product in items"
        :key="product.id"
      >
        <ProductCard :product="product" />
      </div>
    </div>

    <div class="d-flex justify-content-center mt-3" v-if="total > pageSize">
      <Pagination
        :total-items="total"
        :page-size="pageSize"
        :current-page="page"
        @change="page = $event"
      />
    </div>

  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import SearchBar from '../components/SearchBar.vue'
import Pagination from '../components/Pagination.vue'
import { getProducts } from '../services/api'

export default {
  components: { ProductCard, SearchBar, Pagination },

  setup() {
    const items = ref([])
    const total = ref(0)
    const search = ref('')
    const sortOrder = ref('')
    const page = ref(1)
    const pageSize = ref(8)

    async function load() {
      const res = await getProducts({
        search: search.value,
        sort: sortOrder.value,
        page: page.value,
        pageSize: pageSize.value
      })

      items.value = res.items
      total.value = res.total
    }

    onMounted(load)

    watch([search, sortOrder, pageSize], () => {
      page.value = 1
      load()
    })

    watch(page, load)

    return {
      items,
      total,
      search,
      sortOrder,
      page,
      pageSize
    }
  }
}
</script>