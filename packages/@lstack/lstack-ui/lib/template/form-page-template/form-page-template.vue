<template>
  <inner-page-frame
    ref="frameRef"
    :title="title"
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
    inner-sheet
    :close-action="cCloseTo ? 'replace' : 'back'"
    :close-to="cCloseTo"
    :before-close="beforeClose"
    :before-close-async="beforeCloseAsync"
    :page-stack-class="pageStackClass"
    @update:headerSheetValue="val => $emit('update:headerSheetValue', val)"
    @headerSheetChange="val => $emit('headerSheetChange', val)"
  >
    <template v-if="$scopedSlots.headerActions" #headerActions>
      <slot name="headerActions" />
    </template>
    <slot name="panel">
      <form-panel
        ref="formPanelRef"
        :steps="steps"
        :active-step="activeStep"
        :before-next-step="beforeNextStep"
        :before-next-step-async="beforeNextStepAsync"
        :on-active-step-max="onActiveStepMax"
        :on-active-step-min="onActiveStepMin"
        :disable-error-tip="disableErrorTip"
        :error-tip="errorTip"
        :form-data="formData"
        :form-rules="formRules"
        :form-label-width="formLabelWidth"
        @update:activeStep="val => $emit('update:activeStep', val)"
      >
        <template v-if="$scopedSlots.form" #form>
          <slot name="form" />
        </template>
        <template v-if="$scopedSlots.footerActions" #footerActions="scopeSlots">
          <slot v-bind="{ ...scopeSlots, close }" name="footerActions" />
        </template>
        <template v-if="$scopedSlots.positiveAction" #positiveAction="scopeSlots">
          <slot v-bind="scopeSlots" name="positiveAction" />
        </template>
        <slot v-bind="{ close }" />
      </form-panel>
    </slot>
  </inner-page-frame>
</template>

<script>
  import FormPanel from '../../widget/form-panel'
  import InnerPageFrame from '../../frame/inner-page-frame'

  export default {
    name: 'FormPageTemplate',
    components: { InnerPageFrame, FormPanel },
    props: {
      title: String,
      pageStackClass: String,

      steps: Array,
      activeStep: Number,
      beforeNextStep: Function,
      beforeNextStepAsync: Function,
      onActiveStepMax: Function,
      onActiveStepMin: Function,

      closeTo: [String, Object],
      // 返回值为是否拦截该 forward 事务，true 为拦截，不往下继续执行
      beforeClose: Function,
      beforeCloseAsync: Function,

      disableErrorTip: Boolean,
      errorTip: String,
      formData: Object,
      formRules: Object,
      formLabelWidth: String,

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
    computed: {
      cCloseTo() {
        if (this.closeTo) return this.closeTo
        if (this.$project && this.$project.routeMap) {
          const currentRoute = this.$project.routeMap[this.$route.name]
          if (currentRoute && currentRoute.family) {
            const listRoute = currentRoute.family.list
            if (listRoute) {
              return listRoute.fullPath
            }
          }
        }
        return undefined
      },
    },
    mounted() {
      if (this.$refs.formPanelRef) {
        this.formInstance = this.$refs.formPanelRef.formInstance
      }
    },
    methods: {
      close() {
        this.$refs.frameRef.close()
      },
      nextStep() {
        this.$refs.formPanelRef.nextStep()
      },
      previousStep() {
        this.$refs.formPanelRef.previousStep()
      },
    },
  }
</script>
<style lang="scss">
  @import 'form-page-template.var';
</style>
