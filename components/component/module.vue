<script setup>
const props = defineProps([
  'info',
  'colors'
])

const activeFilterId = ref(null)

const filters = computed(() => {
  const paths = {}

  let id, i=0, path, bits, bit, currentPath
  for(id in props.info) {
    path = props.info[id].path
    bits = path.split('/')
    currentPath = paths

    for(i=0; i<bits.length; i++) {
      bit = bits[i].trim()

      if(!currentPath[bit]) {
        currentPath[bit] = {}
      }

      currentPath = currentPath[bit]
    }
  }

  // console.log('f', paths)

  return paths
})

const filteredInfo = computed(() => {
  if(activeFilterId.value) {
    const result = {}

    let id, item
    for(id in props.info) {
      item = props.info[id]
      if(item.path.indexOf(activeFilterId.value) === 0) {
        result[id] = item
      }
    }

    return result
  } else {
    return props.info
  }
})

function setActiveFilterId(value) {
  if(activeFilterId.value == value) {
    activeFilterId.value = null
  } else {
    activeFilterId.value = value
  }
}

</script>

<template>
  <div class="component-module">
    <ComponentFilterList
      :info="filters"
      :activeId="activeFilterId"
      @select="setActiveFilterId"
    />
    <ComponentList
      :info="filteredInfo" 
      :colors="colors"
    />
  </div>
</template>

<style scoped lang="scss">

.component-module {
  display: flex;
}

</style>
