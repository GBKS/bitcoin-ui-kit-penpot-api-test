<script setup>
const props = defineProps([
  'info'
])

const sortedStyles = computed(() => {
  const styles = []
  for(let id in props.info) {
    styles.push(props.info[id])
  }

  return styles.sort((a, b) => {
    if(a.fontSize > b.fontSize) return -1
    if(a.fontSize < b.fontSize) return 1
    return 0
  })
})

</script>

<template>
  <div class="text-style-list">
    <div class="items">
    	<TextStyleItem
    		v-for="(item, index) in sortedStyles"
    		:key="item.id"
    		:info="item"
    	/>
    </div>
  </div>
</template>

<style scoped lang="scss">

.text-style-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 20px;

  .items {
    display: flex;
    flex-direction: column;
    max-width: 1000px;
    gap: 15px;
  }
}

</style>
