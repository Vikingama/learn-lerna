<template>
  <side-form-page-template
    ref="templateRef"
    class="side-mirror-page-template"
    :title="title"
    :title-tip="titleTip"
    :subtitle="subtitle"
    :subtitle-tip="subtitleTip"
    :header-introduction="headerIntroduction"
    :before-close="beforeClose"
    :before-close-async="beforeCloseAsync"
    :form-data="formData"
    :form-rules="formRules"
    :form-label-width="''"
  >
    <template v-if="$scopedSlots.headerActions" #headerActions>
      <slot name="headerActions" />
    </template>
    <template v-if="$scopedSlots.headerIntroduction" #headerIntroduction>
      <slot name="headerIntroduction" />
    </template>

    <lui-form-item :prop="codeFromItemProp" class="mirror-form-item" :rules="codeFormItemRules" no-margin>
      <slot name="mirror">
        <component
          :is="mirrorComponent"
          :data="data"
          :value="value"
          :code="code"
          size="match"
          v-bind="$attrs"
          v-on="$listeners"
        />
      </slot>
    </lui-form-item>
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
  </side-form-page-template>
</template>
<script>
  import SideFormPageTemplate from '../side-form-page-template'
  import LuiFormItem from '../../lui/lui-form-item'

  const YamlMirror = () => import('../../compound/mirror/yaml-mirror')
  const JsonMirror = () => import('../../compound/mirror/json-mirror')
  const LuiCodemirror = () => import('../../lui/lui-codemirror')

  export default {
    name: 'SideMirrorPageTemplate',
    components: { SideFormPageTemplate, LuiFormItem },
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

      formData: Object,
      formRules: Object,
      codeFromItemProp: String,
      codeFormItemRules: [Object, Array],
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
        const mirrorTypeLowerCase = (this.mirrorType || '').toLowerCase()
        if (mirrorTypeLowerCase === 'yaml') {
          return YamlMirror
        }
        if (mirrorTypeLowerCase === 'json') {
          return JsonMirror
        }
        return LuiCodemirror
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
<style lang="scss">
  .side-mirror-page-template {
    background-color: white;

    .el-form {
      height: 100%;
    }
    .mirror-form-item {
      height: 100%;
      & > .el-form-item__content {
        height: 100%;
      }
    }
  }
</style>
