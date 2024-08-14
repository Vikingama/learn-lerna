<template>
  <form-dialog-template
    ref="templateRef"
    :size="cSize"
    :title="title"
    :title-tip="titleTip"
    :subtitle="subtitle"
    :subtitle-tip="subtitleTip"
    :header-introduction="headerIntroduction"
    :before-close="beforeClose"
    :before-close-async="beforeCloseAsync"
    :form-label-width="''"
    show-right-close-button
    :form-data="formData"
    :form-rules="formRules"
  >
    <template v-if="$scopedSlots.headerActions" #headerActions>
      <slot name="headerActions" />
    </template>
    <template v-if="$scopedSlots.headerIntroduction" #headerIntroduction>
      <slot name="headerIntroduction" />
    </template>

    <slot name="beforeMirror" />
    <lui-form-item :prop="codeFromItemProp" no-margin>
      <slot name="mirror">
        <component
          :is="mirrorComponent"
          :read-only="readOnly"
          :line-wrapping="lineWrapping"
          :loading="loading"
          :data="data"
          :value="value"
          :code="code"
          :merge="merge"
          :size="cSize"
          :orig-right-code="origRightCode"
          :orig-right-data="origRightData"
          v-on="$listeners"
        />
      </slot>
    </lui-form-item>
    <slot name="afterMirror" />
    <template v-if="$scopedSlots.beforeForm" #beforeForm="scopeProps">
      <slot name="beforeForm" v-bind="scopeProps" />
    </template>
    <template v-if="$scopedSlots.afterForm" #afterForm="scopeProps">
      <slot name="afterForm" v-bind="scopeProps" />
    </template>
    <template v-if="$scopedSlots.positiveAction" #positiveAction="scopeProps">
      <slot name="positiveAction" v-bind="scopeProps" />
    </template>

    <template v-if="$scopedSlots.footerActions" #footerActions="scopeProps">
      <slot name="footerActions" v-bind="scopeProps" />
    </template>
    <template v-if="$scopedSlots.footerDescription" #footerDescription>
      <slot name="footerDescription"></slot>
    </template>
    <template v-if="$scopedSlots.footerExtension" #footerExtension>
      <slot name="footerExtension"></slot>
    </template>
  </form-dialog-template>
</template>

<script>
  import FormDialogTemplate from '../form-dialog-template'
  import LuiFormItem from '../../lui/lui-form-item'

  const YamlMirror = () => import('../../compound/mirror/yaml-mirror')
  const YamlMergeMirror = () => import('../../compound/mirror/yaml-merge-mirror')
  const JsonMirror = () => import('../../compound/mirror/json-mirror')
  const LuiCodemirror = () => import('../../lui/lui-codemirror')

  export default {
    name: 'MirrorDialogTemplate',
    components: { FormDialogTemplate, LuiFormItem },
    props: {
      title: String,
      titleTip: String,
      subtitle: String,
      subtitleTip: String,
      headerIntroduction: String,
      // 返回值为是否拦截该 forward 事务，true 为拦截，不往下继续执行
      beforeClose: Function,
      beforeCloseAsync: Function,
      data: {},
      code: String,
      value: String,
      origRightCode: String,
      origRightData: Object,
      loading: Boolean,
      readOnly: Boolean,
      lineWrapping: Boolean,
      merge: Boolean,

      formData: Object,
      formRules: Object,
      codeFromItemProp: String,
      mirrorType: {
        default: 'yaml',
        validator(val = '') {
          return ['yaml', 'json'].indexOf(val.toLowerCase()) !== -1
        },
      },
    },
    data() {
      return {
        formInstance: undefined,
      }
    },
    computed: {
      mirrorComponent() {
        const { merge } = this
        const mirrorTypeLowerCase = (this.mirrorType || '').toLowerCase()
        if (mirrorTypeLowerCase === 'yaml') {
          return merge ? YamlMergeMirror : YamlMirror
        }
        if (mirrorTypeLowerCase === 'json') {
          return JsonMirror
        }
        return LuiCodemirror
      },
      cSize() {
        return this.merge ? 'x-large' : 'large'
      },
    },
    mounted() {
      if (this.$refs.templateRef) {
        this.formInstance = this.$refs.templateRef.formInstance
      }
    },
    methods: {
      close() {
        this.$refs.templateRef.close()
      },
    },
  }
</script>
