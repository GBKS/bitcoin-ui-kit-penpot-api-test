<script setup>
import fileData from '@/_data/file.json'

const dev = true
const file = ref(null)
const activeTabId = ref('colors')
const colorPath = ref('Light')

const tabInfo = ref({
  'colors': {
    name: 'Colors'
  },
  'text-styles': {
    name: 'Text styles'
  },
  'components': {
    name: 'Components'
  },
  'info': {
    name: 'Info'
  },
  'pages': {
    name: 'Pages'
  }
})

function selectTab(value, info) {
  activeTabId.value = value
  if(tabInfo.value[value] && info) {
    tabInfo.value[value].info = info
  }
}

onMounted(() => {
  if(dev) {
    file.value = fileData

    console.log(fileData)

    setupColors()
  } else {
    loadData()
  }

  // testCall()
})

function setupColors() {
  const root = document.querySelector(':root');

  let colorId, color
  for(colorId in file.value.data.colors) {
    color = file.value.data.colors[colorId]
    console.log(colorId, color)

    if(color.path == colorPath.value) {
      root.style.setProperty('--'+color.name, color.color);
    }
  }
}

async function testCall() {
  const method = '/api/penpot/file'
  const data = await $fetch(method).catch((error) => error.data)

  console.log(method, data)
}

async function loadData() {
  const method = '/api/penpot/file'
  const data = await $fetch(method).catch((error) => error.data)

  console.log('data', data)

  file.value = data.data
}

function toggleTheme() {
  colorPath.value = colorPath.value == 'Light' ? 'Dark' : 'Light'

  setupColors()
}

</script>

<template>
  <div id="app">
    <UiTabs
      :activeId="activeTabId"
      :info="tabInfo"
      theme="theme"
      @selectTab="selectTab"
    />

    <button v-if="false" @click="toggleTheme">Theme</button>

    <Info
      v-if="activeTabId == 'info'"
      :info="file"
    />

    <FileList
      v-if="activeTabId == 'files'"
    />

    <PageList
      v-if="activeTabId == 'pages' && file"
      :info="file.data.pagesIndex"
    />

    <ColorGroups
      v-if="activeTabId == 'colors' && file"
      :info="file.data.colors"
    />

    <TextStyleList
      v-if="activeTabId == 'text-styles' && file"
      :info="file.data.typographies"
    />

    <ComponentModule
      v-if="activeTabId == 'components' && file"
      :info="file.data.components"
      :colors="file.data.colors"
    />
  </div>
</template>

<style scoped lang="scss">

#app {

}

</style>
