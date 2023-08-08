<script setup>
const props = defineProps([
  'info'
])

onMounted(() => {
  console.log('mounted')
})

</script>

<template>
  <div class="page-item">
  	<p>{{ info.name }}</p>
  </div>
</template>

<style scoped lang="scss">

.page-item {

}

</style>
