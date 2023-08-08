<script setup>
const props = defineProps([
  'info'
])

const sampleStyle = computed(() => {
  return {
    fontSize: props.info.fontSize+'px',
    fontWeight: props.info.fontWeight,
    fontFamily: props.info.fontFamily,
    lineHeight: props.info.lineHeight,
    letterSpacing: props.info.letterSpacing
  }
})

const meta = computed(() => {
  const result = []

  result.push(props.info.fontFamily)
  result.push(props.info.fontStyle)
  result.push(props.info.fontWeight)
  result.push(props.info.fontSize+'px')
  result.push(props.info.lineHeight+' line height')

  return result.join(', ')
})

</script>

<template>
  <div class="text-style-item">
    <p
      class="sample"
      :style="sampleStyle"
    >The quick brown fox jumps over the lazy dog.</p>
    <p>{{ info.name }}</p>
    <p>{{ meta }}</p>
  </div>
</template>

<style scoped lang="scss">

.text-style-item {
  .sample {
    color: var(--text-dark);
  }
}

</style>
