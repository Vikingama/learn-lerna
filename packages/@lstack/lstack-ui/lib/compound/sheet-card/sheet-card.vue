<template>
  <lui-card class="sheet-card" v-bind="{ ...$attrs, marginTop, marginRight, marginBottom, marginLeft }" size="middle">
    <template #header>
      <lui-sheet
        ref="sheetRef"
        :value="sheetValue"
        :options="sheetOptions"
        :option-value-key="sheetOptionValueKey"
        :option-label-key="sheetOptionLabelKey"
        :select-value-key="sheetSelectValueKey"
        :value-initialize-api="sheetValueInitializeApi"
        :value-initialize-mode="sheetValueInitializeMode"
        :option-disable="sheetOptionDisable"
        :option-forward-action-key="sheetOptionForwardActionKey"
        :option-forward-action-api="sheetOptionForwardActionApi"
        :option-forward-to-key="sheetOptionForwardToKey"
        :option-forward-to-api="sheetOptionForwardToApi"
        :watch-only-not-equal="sheetWatchOnlyNotEqual"
        :value-update-key="sheetValueUpdateKey"
        :value-update-mode="sheetValueUpdateMode"
        underline
        match-parent
        show-divider
        inline
        :empty-item="sheetEmptyItem"
        :init-sheet="initSheet"
        :add-action-text="sheetAddActionText"
        :editable="sheetEditable"
        :un-addable="sheetUnAddable"
        :hide-action-when-un-addable="sheetHideActionWhenUnAddable"
        :un-removable="sheetUnRemovable"
        :hide-action-when-un-removable="sheetHideActionWhenUnRemovable"
        :new-add-value-auto-select-disabled="sheetNewAddValueAutoSelectDisabled"
        @input="val => $emit('update:sheetValue', val)"
        @change="(newVal, oldVal) => $emit('sheetChange', newVal, oldVal)"
      >
        <template v-if="$scopedSlots.sheet" #content="options">
          <slot name="sheet" v-bind="options" />
        </template>
        <template v-if="$scopedSlots.sheetAddAction" #addAction="slotScopeProps">
          <slot name="sheetAddAction" v-bind="slotScopeProps" />
        </template>
        <template v-if="$scopedSlots.sheetPanel" #panel="slotScopeProps">
          <slot name="sheetPanel" v-bind="slotScopeProps" />
        </template>
      </lui-sheet>
    </template>
    <slot />
  </lui-card>
</template>
<script>
  import LuiCard from '../../lui/lui-card'
  import LuiSheet from '../../lui/lui-sheet'

  export default {
    name: 'SheetCard',
    components: { LuiCard, LuiSheet },
    props: {
      sheetValue: {},
      sheetOptions: Array,
      sheetOptionValueKey: String,
      sheetOptionLabelKey: String,
      sheetSelectValueKey: String,
      sheetValueInitializeApi: Function,
      sheetValueInitializeMode: String,
      sheetOptionDisable: Function,
      sheetOptionForwardActionKey: String,
      sheetOptionForwardActionApi: [String, Function],
      sheetOptionForwardToKey: String,
      sheetOptionForwardToApi: [String, Object, Function],
      sheetWatchOnlyNotEqual: {},
      sheetValueUpdateKey: String,
      sheetValueUpdateMode: String,
      marginTop: Boolean,
      marginRight: Boolean,
      marginBottom: Boolean,
      marginLeft: Boolean,

      initSheet: Boolean,
      sheetEmptyItem: {},
      sheetAddActionText: String,
      sheetEditable: Boolean,
      sheetUnAddable: Boolean,
      sheetHideActionWhenUnAddable: Boolean,
      sheetUnRemovable: {},
      sheetHideActionWhenUnRemovable: { type: Boolean, default: true },
      sheetNewAddValueAutoSelectDisabled: Boolean,
    },
    methods: {
      addSheet() {
        return this.$refs.sheetRef.add()
      },
    },
  }
</script>
<style lang="scss">
  .sheet-card > .lui-card__inner {
    padding-top: 8px;
  }
</style>
