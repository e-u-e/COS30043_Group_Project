<template>
	<nav aria-label="Pagination">
		<ul class="pagination mb-0">
			<li class="page-item" :class="{ disabled: current === 1 }">
				<button class="page-link" @click="change(current - 1)" :disabled="current === 1">Previous</button>
			</li>

			<li
				class="page-item"
				v-for="p in pages"
				:key="p"
				:class="{ active: p === current }"
			>
				<button class="page-link" @click="change(p)">{{ p }}</button>
			</li>

			<li class="page-item" :class="{ disabled: current === totalPages }">
				<button class="page-link" @click="change(current + 1)" :disabled="current === totalPages">Next</button>
			</li>
		</ul>
	</nav>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
	totalItems: { type: Number, required: true },
	pageSize: { type: Number, default: 10 },
	currentPage: { type: Number, default: 1 }
})
const emit = defineEmits(['change'])

const totalPages = computed(() => Math.max(1, Math.ceil(props.totalItems / props.pageSize)))
const current = computed(() => props.currentPage)

const pages = computed(() => {
	const arr = []
	for (let i = 1; i <= totalPages.value; i++) arr.push(i)
	return arr
})

function change(p) {
	if (p < 1) p = 1
	if (p > totalPages.value) p = totalPages.value
	emit('change', p)
}
</script>

<style scoped></style>
