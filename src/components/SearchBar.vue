<template>
	<input
		type="text"
		class="form-control"
		:placeholder="placeholder"
		v-model="local"
		@input="$emit('update:modelValue', local)"
	/>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
	modelValue: { type: String, default: '' },
	placeholder: { type: String, default: 'Search products' }
})
const emit = defineEmits(['update:modelValue'])
const local = ref(props.modelValue)

watch(() => props.modelValue, (v) => { local.value = v })

watch(local, (v) => {
	emit('update:modelValue', v)
})
</script>
