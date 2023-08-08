<script setup>

const files = ref(null)

onMounted(() => {
  console.log('mounted')

  loadData()
})

async function loadData() {
  const data = await $fetch('/api/penpot/project-files').catch((error) => error.data)

  files.value = data.data

  console.log('data', data)
}

</script>

<template>
  <div>
  	File list
  	<FileItem
  		v-for="(item, index) in files"
  		:key="item.id"
  		:info="item"
  	/>
  </div>
</template>
