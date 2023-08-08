<script setup>
const props = defineProps([
  'info'
])

</script>

<template>
  <div class="page-list">
    <div class="content">
    	<h5>Pages</h5>
      <div class="items">
      	<PageItem
      		v-for="(item, index) in info"
      		:key="item.id"
      		:info="item"
      	/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.page-list {
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    max-width: 600;
    padding: 50px 20px;

    h2 {
      font-size: 21px;
    }
    
    .items {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
  }
}

</style>
