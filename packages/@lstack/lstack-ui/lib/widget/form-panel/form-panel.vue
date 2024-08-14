<template>
  <rl-close ref="closeRef" action="inject">
    <div v-resize:throttle.initial.150="onResize" :style="panelStyle" class="form-panel">
      <lui-step
        v-if="steps"
        ref="stepRef"
        :steps="steps"
        :active="activeStep"
        :before-next-step="beforeNextStep"
        :before-next-step-async="beforeNextStepAsync"
        :on-active-step-max="onActiveStepMax"
        :on-active-step-min="onActiveStepMin"
        margin-bottom
        @input="val => $emit('update:activeStep', val)"
      />
      <slot name="form">
        <el-form
          ref="formRef"
          :model="formData"
          label-position="left"
          :rules="formRules"
          :label-width="formLabelWidth"
          @submit.native.prevent
        >
          <slot />
        </el-form>
      </slot>
      <right-actions-footer
        ref="footer"
        class="form-panel__footer"
        inner-class="form-panel__footer-inner"
        :style="submitBoxStyle"
      >
        <template v-if="$scopedSlots.footerExtension" #extension>
          <slot name="footerExtension" />
        </template>
        <template v-if="$scopedSlots.footerDescription" #description>
          <slot name="footerDescription" />
        </template>
        <template #actions>
          <lui-tip v-if="isErrorTipShow" inline class="g-mr-3" type="error" :tip="cErrorTip" />
          <slot name="footerActions" v-bind="{ nextStep, previousStep, close, showErrorTip }">
            <template v-if="$scopedSlots.positiveAction">
              <rl-close bind-el-event action="inject">
                <lui-button text="取消" />
              </rl-close>
              <slot name="positiveAction" v-bind="{ nextStep, previousStep, close, showErrorTip }" />
            </template>
          </slot>
        </template>
      </right-actions-footer>
    </div>
  </rl-close>
</template>

<script>
  import resize from 'vue-resize-directive'
  import LuiStep from '../../lui/lui-step'
  import LuiButton from '../../lui/lui-button'
  import RightActionsFooter from '../footer/right-actions-footer'
  import RlClose from '../../renderless/rl-close'
  import LuiTip from '../../lui/lui-tip'

  export default {
    name: 'FormPanel',
    components: { LuiStep, RightActionsFooter, RlClose, LuiButton, LuiTip },
    directives: {
      resize,
    },
    props: {
      steps: Array,
      activeStep: Number,
      beforeNextStep: Function,
      beforeNextStepAsync: Function,
      onActiveStepMax: Function,
      onActiveStepMin: Function,
      disableErrorTip: Boolean, // true时 禁用 errorTip， 默认打开 errorTip 提示
      errorTip: { type: String, default: '校验不通过' },
      formData: Object,
      formRules: Object,
      formLabelWidth: { type: String, default: '120px' },
    },
    data() {
      return {
        submitBoxStyle: { width: '100%' },
        panelStyle: {},
        formInstance: undefined,
        isErrorTipShow: false,
        errorTipShowTimeout: undefined,
        cErrorTip: undefined,
      }
    },
    mounted() {
      this.formInstance = this.$refs.formRef
      if (this.formInstance) {
        const formValidate = this.formInstance.validate
        this.formInstance.validate = callback =>
          formValidate((valid, object) => {
            if (!valid) {
              this.showErrorTip()
            } else {
              this.hideErrorTip()
            }
            return callback(valid, object)
          })
      }
    },
    methods: {
      onResize(panelDom) {
        this.submitBoxStyle.width = `${panelDom.clientWidth}px`
        this.panelStyle.paddingBottom = `${this.$refs.footer.$el.clientHeight}px`
      },
      nextStep() {
        this.$refs.stepRef.nextStep()
      },
      previousStep() {
        this.$refs.stepRef.previousStep()
      },
      close() {
        return this.$refs.closeRef.close()
      },
      showErrorTip(errorTip) {
        if (this.disableErrorTip) return
        if (this.errorTipShowTimeout) {
          clearTimeout(this.errorTipShowTimeout)
        }
        this.cErrorTip = errorTip || this.errorTip
        this.isErrorTipShow = true
        this.errorTipShowTimeout = setTimeout(() => {
          this.hideErrorTip()
        }, 3000)
      },
      hideErrorTip() {
        if (this.errorTipShowTimeout) {
          clearTimeout(this.errorTipShowTimeout)
          this.isErrorTipShow = false
        }
      },
    },
  }
</script>
<style lang="scss">
  @import 'form-panel.var';

  .form-panel {
    position: relative;
    margin: 0 auto;
    max-width: 1360px;
    padding-bottom: 60px;
  }
  .form-panel__footer {
    z-index: $form-panel-footer--z-index;
    border-top: 1px solid #dbe3e4;
    background-color: #fff;
    box-shadow: 0 2px 3px 0 var(--cb-color-shadow, rgba(0, 0, 0, 0.16));
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  .form-panel__footer-inner {
    position: relative;
    padding: 20px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
</style>
