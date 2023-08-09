<script setup>
import fileData from '@/_data/file.json'

const dev = !true
const file = ref(null)
const loadError = ref(null)
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
  file.value = fileData

  if(!dev) {
    loadData()
  }

  // testCall()
})

function setupColors() {
  const root = document.querySelector(':root');

  console.log('setupColors', file.value.data.colors)

  let colorId, color
  for(colorId in file.value.data.colors) {
    color = file.value.data.colors[colorId]

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
  const data = await $fetch(method).catch((error) => {
    console.log('Load error', error)
    loadError.value = error.data
  })

  console.log(method, data)

  if(data && data.data != '') {
    file.value = data.data
  }

  if(file.value.data && file.value.data.colors) {
    setupColors()
  }
}

function toggleTheme() {
  colorPath.value = colorPath.value == 'Light' ? 'Dark' : 'Light'

  setupColors()
}

</script>

<template>
  <div id="app">
    <template v-if="file">
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
    </template>
    <template v-if="!file">
      <p>Loading...</p>
    </template>
  </div>
</template>

<style scoped lang="scss">

#app {
  > p {
    text-align: center;
  }
}

</style>
