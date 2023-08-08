<script setup>
const props = defineProps([
  'info'
])

const swatchStyle = computed(() => {
  return {
    backgroundColor: props.info.color
  }
})

</script>

<template>
  <div class="color-item">
    <div
      class="swatch"
      :style="swatchStyle"
    />
    <div class="copy">
      <h6>{{ info.name }}</h6>
      <p>{{ info.color }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">

.color-item {
  display: flex;
  align-items: center;
  @include r('gap', 10, 15);

  .swatch {
    height: 50px;
    border-radius: 5px;
    flex-shrink: 0;
    flex-grow: 0;
    @include r('width', 50, 80);
    @include r('height', 50, 80);
  }

  .copy {
    display: flex;
    flex-direction: column;
    gap: 2px;

    h6 {
      @include r('font-size', 15, 21);
      font-weight: 400;
    }

    p {
      @include r('font-size', 13, 15);
    }
  }

}

</style>
