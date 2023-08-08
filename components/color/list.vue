<script setup>
const props = defineProps([
  'path',
  'info'
])

const sortedItems = computed(() => {
  return props.info.sort((a, b) => {
    if(a.name < b.name) return -1
    if(a.name > b.name) return 1
    return 0
  })
})

</script>

<template>
  <div class="color-list">
  	<h5>{{ path }}</h5>
    <div class="items">
    	<ColorItem
    		v-for="item in sortedItems"
    		:key="item.id"
    		:info="item"
    	/>
    </div>
  </div>
</template>

<style scoped lang="scss">

.color-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  .items {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;

    > * {
      flex-basis: 100px;
      flex-grow: 1;
    }
  }

  @include media-query(small) {
    .items {
      > * {
        flex-basis: 34%;
      }
    }
  }

  @include media-query(medium) {
    .items {
      > * {
        flex-basis: 34%;
      }
    }
  }

  @include media-query(large) {
    .items {
      > * {
        flex-basis: 26%;
      }
    }
  }
}

</style>
