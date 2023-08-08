<script setup>
const props = defineProps([
  'info'
])

const groupedItems = computed(() => {
  const result = {}

  let i=0, item
  for(let colorId in props.info) {
    item = props.info[colorId]

    if(!result[item.path]) {
      result[item.path] = []
    }

    result[item.path].push(item)
  }

  return result
})

</script>

<template>
  <div class="color-groups">
    <div class="items">
    	<ColorList
    		v-for="(item, path) in groupedItems"
    		:key="path"
    		:info="item"
        :path="path"
    	/>
    </div>
  </div>
</template>

<style scoped lang="scss">

.color-groups {
  display: flex;
  flex-direction: column;
  align-items: center;

  .items {
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 50px 0;
  }
}

</style>
