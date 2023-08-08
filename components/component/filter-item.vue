<script setup>
const props = defineProps([
  'id',
  'path',
  'info',
  'activeId'
])

const emit = defineEmits(['select'])

function click() {
  select(props.path)
}

function select(id) {
  emit('select', id)
}

const classObject = computed(() => {
  const c = ['component-filter-item']

  if(props.path == props.activeId) {
    c.push('-active')
  }

  return c.join(' ')
})

</script>

<template>
  <div :class="classObject">
    <button 
      @click="click"
    >{{ id }}</button>
    <div class="items">
      <ComponentFilterItem
        v-for="(item, itemId) in info"
        :key="itemId"
        :id="itemId"
        :path="path+' / '+itemId"
        :info="item"
        :activeId="activeId"
        @select="select"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">

.component-filter-item {
  button {
    appearance: none;
    background-color: transparent;
    border-width: 0;
    opacity: 0.5;
    font-size: 13px;
  }

  &.-active {
    button {
      opacity: 1;
      font-weight: 500;
    }
  }

  .items {
    padding-left: 10px;
  }
}

</style>
