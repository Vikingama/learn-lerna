<template>
  <component
    :is="cTargetComponent"
    ref="targetRef"
    :title="title"
    :title-tip="titleTip"
    :subtitle="subtitle"
    :subtitle-tip="subtitleTip"
    :info-route-href="cInfoRouteHref"
    :loading="loading"
    :refresh-api="refreshApi"
    :header-introduction="headerIntroduction"
    :close-action="cCloseTo ? 'replace' : 'back'"
    :close-to="cCloseTo"
    :before-close="beforeClose"
    :before-close-async="beforeCloseAsync"
    :page-stack-class="pageStackClass"
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
    <template v-if="$scopedSlots.headerSheet" #headerSheet>
      <slot name="headerSheet" />
    </template>
    <template v-if="$scopedSlots.headerActions" #headerActions>
      <slot name="headerActions" />
    </template>
    <template v-if="$scopedSlots.headerIntroduction" #headerIntroduction>
      <slot name="headerIntroduction" />
    </template>
    <slot />
  </component>
</template>

<script>
  import { isObject, isFunction, get, isNotEmptyObject } from '@lstack/utils'
  import RlClose from '../../renderless/rl-close'
  import StandardHeader from '../../widget/header/standard-header'
  import OutsideCloseButton from '../../business/outside-close-button'
  import FlowLayout from '../../layout/flow-layout'
  import SideInfoPageFrame from '../side-info-page-frame'
  import InnerInfoPageFrame from '../inner-info-page-frame'

  export default {
    name: 'InfoPageFrame',
    components: { StandardHeader, OutsideCloseButton, FlowLayout, RlClose },
    inject: {
      pIsPageStack: { default: false },
    },
    props: {
      title: String,
      titleTip: String,
      subtitle: String,
      subtitleTip: String,
      headerIntroduction: String,

      closeToWhenInner: [String, Object], //

      // 返回值为是否拦截该 forward 事务，true 为拦截，不往下继续执行
      beforeClose: Function,
      beforeCloseAsync: Function,
      pageStackClass: String, //

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

      infoRouteHref: String,
      loading: Boolean,
      refreshApi: Function,
      route: Object,
      queryInfo: Object,
    },
    computed: {
      cTargetComponent() {
        if (this.pIsPageStack) {
          return SideInfoPageFrame
        }
        return InnerInfoPageFrame
      },
      cRoute() {
        if (isObject(this.route)) {
          return this.route
        }
        if (this.$project && this.$project.routeMap) {
          const currentRoute = this.$project.routeMap[this.$route.name]
          if (!this.pIsPageStack) {
            return currentRoute
          }
          if (currentRoute && currentRoute.family) {
            return currentRoute.family.info
          }
        }
        return undefined
      },
      cQueryInfo() {
        if (isNotEmptyObject(this.queryInfo)) {
          return this.queryInfo
        }
        if (!this.pIsPageStack) {
          return this.$route.query
        }
        return {}
      },
      cCloseTo() {
        if (this.closeToWhenInner) {
          return this.closeToWhenInner
        }
        if (this.cRoute && this.cRoute.family) {
          return get(this.cRoute.family, 'list.fullPath')
        }
        return undefined
      },
      cInfoRouteHref() {
        return this.cRoute && isFunction(this.cRoute.getHref) ? this.cRoute.getHref(this.cInfoRouteQuery) : undefined
      },
      cInfoRouteQuery() {
        return this.cRoute && isFunction(this.cRoute.getQueryByInfo) ? this.cRoute.getQueryByInfo(this.cQueryInfo) : {}
      },
    },
    methods: {
      close() {
        this.$refs.targetRef.close()
      },
    },
  }
</script>
