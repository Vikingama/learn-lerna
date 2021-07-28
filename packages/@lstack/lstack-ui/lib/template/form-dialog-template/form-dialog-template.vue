<template>
  <dialog-template
    ref="templateRef"
    :size="size"
    :title="title"
    :title-tip="titleTip"
    :subtitle="subtitle"
    :subtitle-tip="subtitleTip"
    :header-introduction="headerIntroduction"
    :before-close="beforeClose"
    :before-close-async="beforeCloseAsync"
    :show-right-close-button="showRightCloseButton"
  >
    <template v-if="$scopedSlots.headerActions" #headerActions>
      <slot name="headerActions" />
    </template>
    <template v-if="$scopedSlots.headerIntroduction" #headerIntroduction>
      <slot name="headerIntroduction" />
    </template>

    <slot name="beforeForm" />
    <slot name="form">
      <el-form ref="form" :model="formData" label-position="left" :rules="formRules" :label-width="formLabelWidth">
        <slot />
      </el-form>
    </slot>
    <slot name="afterForm" />

    <template v-if="$scopedSlots.footerExtension" #footerExtension>
      <slot name="footerExtension" />
    </template>
    <template v-if="$scopedSlots.footerDescription" #footerDescription>
      <slot name="footerDescription" />
    </template>

    <template v-if="$scopedSlots.positiveAction" #positiveAction="scopeProps">
      <slot name="positiveAction" v-bind="scopeProps" />
    </template>

    <template v-if="$scopedSlots.footerActions" #footerActions="scopeProps">
      <slot name="footerActions" v-bind="scopeProps" />
    </template>
  </dialog-template>
</template>

<script>
  import DialogTemplate from '../dialog-template'

  export default {
    name: 'FormDialogTemplate',
    components: { DialogTemplate },
    props: {
      title: String,
      titleTip: String,
      subtitle: String,
      subtitleTip: String,
      headerIntroduction: String,
      showRightCloseButton: Boolean,
      size: { type: String, default: 'middle' },
      // 返回值为是否拦截该 forward 事务，true 为拦截，不往下继续执行
      beforeClose: Function,
      beforeCloseAsync: Function,
      formData: Object,
      formRules: Object,
      formLabelWidth: { type: String, default: '120px' },
    },
    data() {
      return {
        formInstance: undefined,
      }
    },
    mounted() {
      this.formInstance = this.$refs.form
    },
    methods: {
      close() {
        this.$refs.templateRef.close()
      },
    },
  }
</script>
