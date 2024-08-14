<template>
  <component :is="listViewTag" v-if="noDefaultItem" class="lui-list-view" :class="listViewClass">
    <slot v-for="(item, index) in list" :index="index" :listItem="item" />
  </component>
  <component :is="listViewTag" v-else class="lui-list-view" :class="listViewClass">
    <component
      :is="listViewItemTag"
      v-for="(item, index) in list"
      :key="index"
      class="lui-list-view__item"
      :class="listViewItemClass"
    >
      <slot :index="index" :listItem="item"></slot>
    </component>
  </component>
</template>

<script>
  export default {
    name: 'LuiListView',
    props: {
      list: { type: Array, default: () => [] },
      listViewTag: { type: String, default: 'ul' },
      listViewItemTag: { type: String, default: 'li' },
      listViewClass: [String, Object, Array],
      listViewItemClass: [String, Object, Array],
      noDefaultItem: Boolean,
    },
  }
</script>
