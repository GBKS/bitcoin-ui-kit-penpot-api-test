<script setup>
const props = defineProps([
  'info',
  'activeId'
])

const emit = defineEmits(['select'])

function select(activeId) {
  emit('select', activeId)
}

</script>

<template>
  <div class="component-filter-list">
    <div class="items">
      <ComponentFilterItem
        v-for="(item, itemId) in info"
        :key="itemId"
        :id="itemId"
        :path="itemId"
        :info="item"
        :activeId="activeId"
        @select="select"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">

.component-filter-list {
  display: flex;
  flex-direction: column;
  flex-basis: 200px;
  flex-shrink: 0;

  .items {
    padding-top: 30px;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
  }
}

</style>
