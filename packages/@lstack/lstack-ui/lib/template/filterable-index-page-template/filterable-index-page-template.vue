<template>
  <index-page-template
    :title="title"
    :title-tip="titleTip"
    :header-introduction="headerIntroduction"
    :header-sheet-value="headerSheetValue"
    :header-sheet-options="headerSheetOptions"
    :header-sheet-option-value-key="headerSheetOptionValueKey"
    :header-sheet-option-label-key="headerSheetOptionLabelKey"
    :header-sheet-select-value-key="headerSheetSelectValueKey"
    :header-sheet-value-initialize-api="headerSheetValueInitializeApi"
    :header-sheet-option-disable="headerSheetOptionDisable"
    :header-sheet-option-forward-action-key="headerSheetOptionForwardActionKey"
    :header-sheet-option-forward-action-api="headerSheetOptionForwardActionApi"
    :header-sheet-option-forward-to-key="headerSheetOptionForwardToKey"
    :header-sheet-option-forward-to-api="headerSheetOptionForwardToApi"
    :header-sheet-label-map-api="headerSheetLabelMapApi"
    :page-stack-class="pageStackClass"
    class="filterable-index-page-template"
    @update:headerSheetValue="val => $emit('update:headerSheetValue', val)"
    @headerSheetChange="val => $emit('headerSheetChange', val)"
  >
    <template v-if="$scopedSlots.headerActions" #headerActions>
      <slot name="headerActions" />
    </template>
    <template v-if="$scopedSlots.headerSheet" #headerSheet>
      <slot name="headerSheet" />
    </template>
    <template v-if="$scopedSlots.headerIntroduction" #headerIntroduction>
      <slot name="headerIntroduction" />
    </template>

    <filterable-data-panel :loading="loading" :refresh-api="refreshApi">
      <template v-if="$scopedSlots.actions" #actions>
        <slot name="actions" />
      </template>
      <template v-if="$scopedSlots.filters" #filters>
        <slot name="filters" />
      </template>
      <template v-if="$scopedSlots.filterExtension" #filterExtension>
        <slot name="filterExtension" />
      </template>
      <slot />
    </filterable-data-panel>
  </index-page-template>
</template>

<script>
  import IndexPageTemplate from '../index-page-template'
  import FilterableDataPanel from '../../widget/filterable-data-panel'

  export default {
    name: 'FilterableIndexPageTemplate',
    components: { IndexPageTemplate, FilterableDataPanel },
    props: {
      title: String,
      titleTip: String,
      headerIntroduction: String,
      defaultActiveSheet: [Number, Function],
      pageStackClass: String,

      headerSheetValue: {},
      headerSheetOptions: Array,
      headerSheetOptionValueKey: String,
      headerSheetOptionLabelKey: String,
      headerSheetSelectValueKey: String,
      headerSheetValueInitializeApi: Function,
      headerSheetOptionDisable: Function,
      headerSheetOptionForwardActionKey: String,
      headerSheetOptionForwardActionApi: [String, Function],
      headerSheetOptionForwardToKey: String,
      headerSheetOptionForwardToApi: [String, Object, Function],
      headerSheetLabelMapApi: [Object, Array, Function],

      loading: Boolean,
      refreshApi: Function,
    },
  }
</script>
<style lang="scss">
  @import 'filterable-index-page-template.var';

  .filterable-index-page-template {
    position: relative;
    background-color: $filterable-index-page-template--background-color;
  }
</style>
