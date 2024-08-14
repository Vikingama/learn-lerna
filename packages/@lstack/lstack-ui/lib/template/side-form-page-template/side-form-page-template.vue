<template>
  <side-page-frame
    ref="frameRef"
    class="side-form-page-template"
    :title="title"
    :title-tip="titleTip"
    :subtitle="subtitle"
    :subtitle-tip="subtitleTip"
    :introduction="headerIntroduction"
    :before-close="beforeClose"
    :before-close-async="beforeCloseAsync"
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
    @update:headerSheetValue="val => $emit('update:headerSheetValue', val)"
    @headerSheetChange="val => $emit('headerSheetChange', val)"
  >
    <template v-if="$scopedSlots.headerActions" #headerActions>
      <slot name="headerActions" />
    </template>
    <template v-if="$scopedSlots.headerIntroduction" #headerIntroduction>
      <slot name="headerIntroduction" />
    </template>
    <template v-if="$scopedSlots.positiveAction" #positiveAction>
      <slot name="positiveAction" />
    </template>
    <template v-if="$scopedSlots.footerActions" #footerActions>
      <slot name="footerActions" />
    </template>
    <template v-if="$scopedSlots.footerDescription" #footerDescription>
      <slot name="footerDescription" />
    </template>
    <template v-if="$scopedSlots.footerExtension" #footerExtension>
      <slot name="footerExtension" />
    </template>
    <slot name="beforeForm" />
    <slot name="form">
      <el-form ref="form" :model="formData" label-position="left" :rules="formRules" :label-width="formLabelWidth">
        <slot />
      </el-form>
    </slot>
    <slot name="afterForm" />
  </side-page-frame>
</template>

<script>
  import SidePageFrame from '../../frame/side-page-frame'

  export default {
    name: 'SideFormPageTemplate',
    components: { SidePageFrame },
    props: {
      title: String,
      titleTip: String,
      subtitle: String,
      subtitleTip: String,
      headerIntroduction: String,
      // 返回值为是否拦截该 forward 事务，true 为拦截，不往下继续执行
      beforeClose: Function,
      beforeCloseAsync: Function,
      formData: Object,
      formRules: Object,
      formLabelWidth: { type: String, default: '120px' },

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
    },
    data() {
      return {
        formInstance: undefined,
      }
    },
    mounted() {
      if (this.$refs.form) {
        this.formInstance = this.$refs.form
      }
    },
    methods: {
      close() {
        this.$refs.frameRef.close()
      },
    },
  }
</script>
