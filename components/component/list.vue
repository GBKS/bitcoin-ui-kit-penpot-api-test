<script setup>
const props = defineProps([
  'info',
  'colors'
])

</script>

<template>
  <div class="component-list">
    <div class="items">
      <ComponentItem
        v-for="(item, itemId) in info"
        :key="itemId"
        :info="item"
        :colors="colors"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">

.component-list {
  display: flex;
  flex-direction: column;

  .items {
    padding-top: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;

    > * {
      flex-basis: 21%;
    }
  }
}

</style>
