<template>
  <el-table-column class-name="table-column-form-item" :width="width" :min-width="minWidth">
    <template #header>
      <lui-text v-if="required" margin-right inline type="error" text="*" />
      <slot name="label">
        <span>{{ label }}</span>
      </slot>
      <lui-tip-icon v-if="!!labelTip" size="xs" icon="question" :tip="labelTip" margin-left />
    </template>
    <template #default="scope">
      <lui-form-item
        :key="formItemKeyGenerateApi(scope.$index)"
        no-margin
        :rules="rules"
        :prop="obtainProp(scope.$index)"
      >
        <template #valid="eScope">
          <slot name="valid" v-bind="{ ...eScope, ...scope }" />
        </template>
        <slot v-bind="{ ...scope }" />
      </lui-form-item>
    </template>
  </el-table-column>
</template>

<script>
  import LuiFormItem from '../../lui/lui-form-item'
  import LuiText from '../../lui/lui-text'

  export default {
    name: 'TableColumnFormItem',
    components: { LuiFormItem, LuiText },
    props: {
      baseProp: String,
      subProp: String,
      rules: [Object, Array],
      label: String,
      labelTip: String,
      width: {},
      minWidth: {},
      fixedProp: String,
      required: Boolean,
      formItemKeyGenerateApi: { type: Function, default: index => index },
    },
    methods: {
      obtainProp(index) {
        let prop
        if (this.fixedProp) {
          prop = this.fixedProp
        } else if (!this.baseProp) {
          prop = undefined
        } else if (!this.subProp) {
          prop = `${this.baseProp}.${index}`
        } else {
          prop = `${this.baseProp}.${index}.${this.subProp}`
        }
        return prop
      },
    },
  }
</script>

<style lang="scss">
  .table-column-form-item {
    .el-form-item--mini.el-form-item,
    .el-form-item--small.el-form-item,
    .el-form-item {
      margin-bottom: 0;
    }
    .el-input {
      width: auto;
    }
  }
</style>
