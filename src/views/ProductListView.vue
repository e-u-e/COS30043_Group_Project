<template>
  <div class="container mt-4">

    <h1 class="mb-4">Products</h1>

    <div class="d-flex gap-2 mb-3">
      <SearchBar v-model="search" />

      <div class="position-relative w-auto" ref="selectEl">
        <button 
          class="form-select text-start" 
          type="button" 
          style="min-width: 160px;"
          @click="isSortOpen = !isSortOpen"
        >
          {{ sortOptions.find(o => o.value === sortOrder)?.label || 'Sort By' }}
        </button>
        <transition name="slide-down">
          <ul class="dropdown-menu show w-100 position-absolute" v-if="isSortOpen" style="margin-top: 4px; box-shadow: var(--shadow);">
            <li v-for="option in sortOptions" :key="option.value">
              <a class="dropdown-item" href="#" @click.prevent="selectSort(option.value)">
                {{ option.label }}
              </a>
            </li>
          </ul>
        </transition>
      </div>
    </div>

    <div class="row products-grid">
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 product-anim-item"
        v-for="(product, index) in items"
        :key="`${product.id}-${search}-${sortOrder}-${page}`"
        :style="{ '--card-stagger': `${index * 70}ms` }"
        v-parallax="{ speed: 0, translate: 42, opacity: 0, start: 0.92, end: 0.7 }"
      >
        <ProductCard :product="product" />
      </div>
    </div>

    <div class="d-flex justify-content-center mt-3" v-if="total > pageSize">
      <paginate
        v-model="page"
        :page-count="pageCount"
        :page-range="3"
        :margin-pages="1"
        :click-handler="selectPage"
        prev-text="Previous"
        next-text="Next"
        container-class="pagination mb-0"
        page-class="page-item"
        page-link-class="page-link"
        prev-class="page-item"
        prev-link-class="page-link"
        next-class="page-item"
        next-link-class="page-link"
        break-view-class="page-item"
        break-view-link-class="page-link"
        active-class="active"
        disabled-class="disabled"
      />
    </div>

  </div>
</template>

<script>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Paginate from 'vuejs-paginate-next'
import ProductCard from '../components/ProductCard.vue'
import SearchBar from '../components/SearchBar.vue'
import { getProducts } from '../services/api'

export default {
  components: { ProductCard, SearchBar, paginate: Paginate },

  setup() {
    const route = useRoute()
    const items = ref([])
    const total = ref(0)
    const search = ref('')
    const category = ref(route.query.category ? String(route.query.category) : '')
    const sortOrder = ref('')
    const page = ref(1)
    const pageSize = ref(8)
    const isSortOpen = ref(false)
    const selectEl = ref(null)
    const sortOptions = [
      { value: '', label: 'Sort By' },
      { value: 'low', label: 'Price Low to High' },
      { value: 'high', label: 'Price High to Low' }
    ]
    let loadToken = 0

    const pageCount = ref(1)

    async function load() {
      const currentToken = ++loadToken

      const res = await getProducts({
        search: search.value,
        category: category.value,
        sort: sortOrder.value,
        page: page.value,
        pageSize: pageSize.value
      })

      if (currentToken !== loadToken) {
        return
      }

      items.value = res.items
      total.value = res.total
      pageCount.value = Math.max(1, Math.ceil(res.total / pageSize.value))
    }

    function closeSelect(e) {
      if (selectEl.value && !selectEl.value.contains(e.target)) {
        isSortOpen.value = false
      }
    }

    function selectSort(val) {
      sortOrder.value = val
      isSortOpen.value = false
    }

    function selectPage(pageNumber) {
      page.value = pageNumber
    }

    watch(
      () => route.query.category,
      (nextCategory) => {
        category.value = nextCategory ? String(nextCategory) : ''
        page.value = 1
        load()
      }
    )

    onMounted(() => {
      document.addEventListener('click', closeSelect)
      load()
    })

    watch([search, sortOrder, pageSize], () => {
      if (page.value !== 1) {
        page.value = 1
        return
      }

      load()
    })

    watch(page, load)

    onBeforeUnmount(() => {
      document.removeEventListener('click', closeSelect)
    })

    return {items, total, search, category, sortOrder, page, pageSize, pageCount, isSortOpen, selectEl, sortOptions, selectSort, selectPage}
  }
}
</script>

<style scoped> .slide-down-enter-active, .slide-down-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
  transform-origin: top;
}
.slide-down-enter-from, .slide-down-leave-to {
  opacity: 0;
  transform: scaleY(0.8) translateY(-10px);
}
.product-anim-item {
  transform: translateY(var(--parallax-reveal-translate, 42px));
  opacity: var(--parallax-reveal-opacity, 0);
  transition: transform 0.45s ease-out, opacity 0.45s ease-out;
  transition-delay: var(--card-stagger, 0ms);
  will-change: transform, opacity;
}
</style>
