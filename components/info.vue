<script setup>
const props = defineProps([
  'info'
])

</script>

<template>
  <div class="info">
    <div class="content">
      <h2>{{ info.name }}</h2>
      <p>Revision: {{ info.revn }}</p>
      <p>Original version: {{ info.origVersion }}</p>
      <p>Created: {{ info.createdAt }}</p>
      <p>Created: {{ info.modifiedAt }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">

.info {
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    max-width: 600;
    padding: 50px 20px;

    h2 {
      font-size: 21px;
    }
  }
}

</style>
