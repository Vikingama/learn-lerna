<template>
  <lui-form-item
    class="select-form-item"
    :prop="prop"
    :label="label"
    :required="required"
    :rules="rules"
    :label-tip="labelTip"
    :label-width="labelWidth"
    :no-margin="noMargin"
    :inline="inline"
  >
    <lui-select
      slot="valid"
      :value="value"
      :placeholder="placeholder"
      :enable-loadmore="enableLoadmore"
      :loading="loading"
      :is-max-page="isMaxPage"
      :is-load-error="isLoadError"
      :reload-api="reloadApi"
      :loadmore-api="loadmoreApi"
      :option-disable="optionDisable"
      :options="options"
      :option-value-key="optionValueKey"
      :option-label-key="optionLabelKey"
      :select-value-key="selectValueKey"
      :label-map-api="labelMapApi"
      :value-update-immediate="valueUpdateImmediate"
      :value-update-mode="valueUpdateMode"
      :value-update-key="valueUpdateKey"
      :value-initialize-api="valueInitializeApi"
      :value-initialize-mode="valueInitializeMode"
      :multiple="multiple"
      :watch-only-not-equal="watchOnlyNotEqual"
      @input="(val, oldVal) => $emit('input', val, oldVal)"
      @change="(val, oldVal) => $emit('change', val, oldVal)"
      @focus="$emit('focus')"
    >
      <template v-if="$scopedSlots.optionItem" #default="slotScopeProps">
        <slot name="optionItem" v-bind="slotScopeProps" />
      </template>
    </lui-select>
    <div class="inline-wrap">
      <info-tip-icon
        v-if="isNotEmptyArray(infoTipKeys) && isNotEmptyObject(value)"
        margin-left
        :kv-map="kvMap"
        :info="value"
        :keys="infoTipKeys"
      />

      <lui-tooltip placement="top" :disabled="!refreshDisabled || !refreshDisableTip" :content="refreshDisableTip">
        <lui-button
          tag="div"
          class="g-va-top"
          shape="square"
          :disabled="refreshDisabled"
          :icon="loading ? 'el-icon-loading' : 'refresh'"
          @click="handledRefreshClick"
        />
      </lui-tooltip>
      <external-link v-if="createLinkText" :to="createLinkTo" :text="createLinkText" type="primary" />
    </div>
    <slot />
  </lui-form-item>
</template>
<script>
  import { isFunction, isNotEmptyArray, isNotEmptyObject } from '@lstack/utils'
  import LuiFormItem from '../../lui/lui-form-item'
  import LuiSelect from '../../lui/lui-select'
  import LuiButton from '../../lui/lui-button'
  import ExternalLink from '../external-link'
  import InfoTipIcon from '../../business/info-tip-icon'
  import LuiTooltip from '../../lui/lui-tooltip'

  export default {
    name: 'SelectFormItem',
    components: { LuiFormItem, LuiSelect, LuiButton, ExternalLink, InfoTipIcon, LuiTooltip },
    props: {
      value: { required: true },
      enableLoadmore: Boolean,
      placeholder: String,
      loading: Boolean,
      isMaxPage: Boolean,
      isLoadError: Boolean,
      reloadApi: Function,
      loadmoreApi: Function,
      optionDisable: { type: Function, default: (optionValue, option) => false },
      options: { type: Array, default: () => [] },
      optionValueKey: String,
      optionLabelKey: String,
      selectValueKey: String,
      labelMapApi: Function,
      valueUpdateImmediate: Boolean,
      valueUpdateMode: String,
      valueUpdateKey: [String, Array],
      valueInitializeApi: Function,
      valueInitializeMode: { type: String, default: 'WhenUndefined' },
      multiple: Boolean,
      watchOnlyNotEqual: Boolean,

      noMargin: Boolean,
      inline: Boolean,
      label: String,
      labelTip: String,
      labelWidth: String,
      prop: String,
      required: { type: Boolean, default: undefined },
      rules: [Object, Array],

      kvMap: { type: Object, default: () => ({}) },
      infoTipKeys: { type: Array, default: () => [] },

      // 返回值为是否拦截该 forward 事务，true 为拦截，不往下继续执行
      beforeRefresh: Function,
      beforeRefreshAsync: Function,
      refreshApi: Function,
      refreshDisabled: Boolean,
      refreshDisableTip: String,

      createLinkTo: {},
      createLinkText: String,
    },
    methods: {
      isNotEmptyArray,
      isNotEmptyObject,
      handledRefreshClick() {
        if (isFunction(this.beforeRefresh) && this.beforeRefresh()) return
        if (isFunction(this.beforeRefreshAsync)) {
          this.beforeRefreshAsync(this.refreshApi)
        } else {
          this.refreshApi()
        }
      },
    },
  }
</script>
<style lang="scss">
  .select-form-item {
    .inline-wrap {
      display: inline-flex;
      align-items: center;
      vertical-align: top;
    }
  }
</style>
