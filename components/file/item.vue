<script setup>
const props = defineProps([
  'info'
])

onMounted(() => {
  console.log('mounted')
})

</script>

<template>
  <div>
  	<h3>{{ info.name }}</h3>
    <img
      v-if="info.thumbnailUri"
      :src="info.thumbnailUri"
    >
  </div>
</template>
