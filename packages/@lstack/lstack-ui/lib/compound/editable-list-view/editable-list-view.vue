<template>
  <div class="editable-list-view">
    <slot name="beforeListView" v-bind="slotScopeProps"></slot>
    <lui-list-view
      v-bind="$attrs"
      class="editable-list-view"
      :list-view-tag="listViewTag"
      :list-view-item-tag="listViewItemTag"
      :list-view-class="listViewClass"
      :list-view-item-class="listViewItemClass"
      :list="cValue"
      :no-default-item="noDefaultItem"
    >
      <template #default="scopeProps">
        <slot
          v-bind="{
            ...scopeProps,
            ...slotScopeProps,
            replace: item => replace(scopeProps.index, item),
            remove: () => remove(scopeProps.index),
          }"
        />
      </template>
    </lui-list-view>
    <slot name="afterListView" v-bind="slotScopeProps"></slot>
  </div>
</template>

<script>
  import LuiListView from '../../lui/lui-list-view'
  import RlListEdit from '../../renderless/rl-list-edit'

  export default {
    name: 'EditableListView',
    components: { LuiListView },
    extends: RlListEdit,
    props: {
      listViewTag: String,
      listViewItemTag: String,
      listViewClass: [String, Object, Array],
      listViewItemClass: [String, Object, Array],
      noDefaultItem: Boolean,
    },
  }
</script>

<style lang="scss">
  .editable-list-view {
    position: relative;
  }
</style>
