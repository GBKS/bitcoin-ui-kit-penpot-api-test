<script setup>
const props = defineProps([
  'info',
  'colors'
])

const log = false
const ViewerNode = ref(null)

const sampleStyle = computed(() => {
  return {
    fontSize: props.info.fontSize,
    fontWeight: props.info.fontWeight,
    fontFamily: props.info.fontFamily,
    lineHeight: props.info.lineHeight
  }
})

function click() {
  console.log('objects', toRaw(props.info))
  console.log('root', componentRoot.value)
}

const componentRoot = computed(() => {
  let result = null

  for(let id in props.info.objects) {
    if(props.info.objects[id].savedComponentRoot) {
      result = props.info.objects[id]
      break
    }
  }

  return result
})

function getRoot() {
  let result = null

  let object
  for(let id in props.info.objects) {
    object = props.info.objects[id]
    if(object.savedComponentRoot || object.id == props.info.id) {
      result = object
      break
    }
  }

  return result
}

function getChildren(parentId) {
  let result = null

  for(let id in props.info.objects) {
    if(props.info.objects[id].parentId == parentId) {
      if(!result) {
        result = []
      }

      result.push(props.info.objects[id])
    }
  }

  return result
}

function render() {
  const root = getRoot()

  if(root) {
    if(log) console.log('render', toRaw(root))

    const offset = { x: root.x, y: root.y }

    const children = renderChildren(root.id, offset)

    if(log) console.log('render final', children)

    ViewerNode.value = renderChild(root, offset)
    
    // ViewerNode.value = h('div', {
    //   style: {
    //     width: root.width+'px',
    //     height: root.height+'px'
    //   }
    // }, children)
  } else {
    if(log) console.log('No root', toRaw(props.info))
  }
}

function renderChildren(parentId, offset) {
  const children = getChildren(parentId)
  let result = null

  if(log) console.log('renderChildren', parentId, children)

  if(children && children.length > 0) {
    result = []

    let i=0, child
    for(; i<children.length; i++) {
      child = children[i]

      result.push(renderChild(child, offset))
    }
  }

  return result
}

function renderChild(child, offset) {
  let result = null

  if(log) console.log('---')
  if(log) console.log('renderChild', child.id, child.type, toRaw(child))

  const props = gatherProps(child)
  const children = renderChildren(child.id, offset)

  if(child.type == 'path') {
    props.d = renderPath(child.content, offset)
    props['fill-rule'] = "evenodd"
    props['clip-rule'] = "evenodd"
    result = h('path', props, children)
  } else if(child.type == 'group') {
    result = h('div', props, children)
  } else if(child.type == 'frame') {
    result = h('div', props, children)
  } else if(child.type == 'text') {
    result = renderText(child, offset, children)
  } else if(child.type == 'circle') {
    props.style.borderRadius = '1000px'
    result = h('div', props, children)
  }

  if(log) console.log('renderChild result', result)

  if(child.svgViewbox) {
    return h('svg', {
      viewbox: child.svgViewbox.x+' '+child.svgViewbox.y+' '+child.svgViewbox.width+' '+child.svgViewbox.height
    }, [result])
  } else {
    return result
  }
}

function gatherProps(child) {
  const result = { style: {} }

  if(child.fills && child.fills.length > 0) {
    const fill = child.fills[0]
    if(child.svgViewbox) {
      result.fill = fill.fillColor
    } else {
      if(fill.fillColorRefId) {
        const color = props.colors[fill.fillColorRefId]
        result.style.backgroundColor = 'var(--'+color.name+')'
      } else {
        result.style.backgroundColor = fill.fillColor
      }
    }
  }

  if(child.strokes && child.strokes.length > 0) {
    const stroke = child.strokes[0]
    result.style.border = stroke.strokeWidth+'px '+stroke.strokeStyle+' '+stroke.strokeColor
  }

  if(child.rx || child.ry) {
    result.style.borderRadius = (child.rx || child.ry) + 'px'
  }

  if(child.layout == 'flex') {
    result.style.display = 'flex'
    result.style.alignItems = child.layoutAlignItems
    result.style.justifyContent = child.layoutAlignContent
    result.style.flexDirection = child.layoutFlexDir
    result.style.gap = (child.layoutFlexDir == 'column' ? child.layoutGap.columnGap : child.layoutGap.rowGap)+'px'
  }

  if(child.layoutPadding) {
    result.style.paddingTop = child.layoutPadding.p1 + 'px'
    result.style.paddingRight = child.layoutPadding.p2 + 'px'
    result.style.paddingBottom = child.layoutPadding.p3 + 'px'
    result.style.paddingLeft = child.layoutPadding.p4 + 'px'
  }

  if(!child.layout) {
    if(child.width) result.style.width = child.width+'px'
    if(child.height) result.style.height = child.height+'px'
  }

  return result
}

function renderText(child, offset, children) {
  if(log) console.log('renderText', toRaw(child))

  let i=0, localChild
  for(; i<child.content.children.length; i++) {
    localChild = child.content.children[i]

    switch(localChild.type) {
      case 'paragraph-set':
        children = renderParagraphSet(localChild, children)
        break
    }
  }

  return h('div', null, children)
}

function renderParagraphSet(child, children) {
  if(log) console.log('renderParagraphSet', toRaw(child))

  const params = {
    style: {},
    contentEditable: true
  }
  let i=0, localChild
  for(; i<child.children.length; i++) {
    localChild = child.children[i]

    switch(localChild.type) {
      case 'paragraph':
        children = renderParagraph(localChild, children, params)
        break
    }
  }

  return h('p', params, children)
}

function renderParagraph(child, children, params) {
  if(log) console.log('renderParagraph', toRaw(child))

  const props = [
    'fontWeight',
    'lineHeight',
    'fontStyle',
    'fontFamily',
    'textAlign',
    'textDecoration',
    'textTransform'
  ]

  let k=0, prop
  for(; k<props.length; k++) {
    prop = props[k]
    if(child[prop]) {
      params.style[prop] = child[prop]
    }
  }

  if(child.fills && child.fills.length > 0) {
    params.style.color = child.fills[0].fillColor || null
    params.style.fontSize = child.fontSize+'px'
  }

  let i=0, localChild
  for(; i<child.children.length; i++) {
    localChild = child.children[i]

    if(localChild.text) {
      if(!children) children = []
      children.push(localChild.text)
    }
  }

  return children
}

function renderPath(commands, offset) {
  const templates = {
    "move-to": "M{x} {y}",
    "line-to": "L{x} {y}",
    "curve-to": "C {c1x} {c1y} {c2x} {c2y} {x} {y}",
    "close-path": "Z"
  }

  const bits = [] 
  let i=0, bit, template, k, value
  for(; i<commands.length; i++) {
    bit = commands[i]

    template = templates[bit.command]

    if(template) {
      for(k in bit.params) {
        value = bit.params[k]

        if(offset) {
          if(k.indexOf('x') !== -1) value -= offset.x
          else if(k.indexOf('y') !== -1) value -= offset.y
        }

        template = template.replace('{'+k+'}', value)
      } 

      bits.push(template)
    } else {
      // ?
    }
  }

  // if(log) console.log('path', commands, bits)

  return bits.join('')
}

const visible = computed(() => {
  return true
  const path = 'Button / Medium / Outline'
  const name = 'Active'
  return props.info.path == path && props.info.name == name
})

onBeforeMount(() => {
  if(visible.value) {
    if(log) console.log('onBeforeMount', toRaw(props.info))
    render()
  }
})

</script>

<template>
  <div class="component-item" @click="click" v-if="visible">
    <div class="display">
      <ViewerNode />
    </div>
    <div class="copy">
      <p>{{ info.path }}</p>
      <h6>{{ info.name }}</h6>
    </div>
  </div>
</template>

<style scoped lang="scss">

.component-item {
  display: flex;
  flex-direction: column;
  @include r('gap', 10, 15);

  .display {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    aspect-ratio: 1.5;

    :deep(svg) {
      max-width: 100%;
      height: auto;
    }
  }

  .copy {
    display: flex;
    flex-direction: column;
    gap: 2px;

    h6 {
      @include r('font-size', 15, 17);
      font-weight: 400;
    }

    p {
      @include r('font-size', 11, 13);
    }
  }
}

</style>
