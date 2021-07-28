<template>
  <lui-tooltip
    v-if="isFunction(refreshApi)"
    :hide-after="2000"
    :open-delay="300"
    placement="top"
    :enterable="false"
    :content="refreshDisabled && refreshDisableTip ? refreshDisableTip : '刷新'"
  >
    <lui-button
      tag="div"
      class="g-va-top"
      shape="square"
      :no-margin="noMargin"
      :disabled="refreshDisabled"
      :icon="loading ? 'el-icon-loading' : 'refresh'"
      :before-click-handle="beforeRefresh"
      :before-click-handle-async="beforeRefreshAsync"
      @click="refreshApi"
    />
  </lui-tooltip>
</template>

<script>
  import { isFunction } from '@lstack/utils'
  import LuiTooltip from '../../lui/lui-tooltip'
  import LuiButton from '../../lui/lui-button'

  export default {
    name: 'RefreshIconButton',
    components: { LuiTooltip, LuiButton },
    props: {
      loading: Boolean,
      noMargin: Boolean,

      refreshApi: Function,
      // 返回值为是否拦截该 forward 事务，true 为拦截，不往下继续执行
      beforeRefresh: Function,
      beforeRefreshAsync: Function,
      refreshDisabled: Boolean,
      refreshDisableTip: String,
    },
    methods: {
      isFunction,
    },
  }
</script>
