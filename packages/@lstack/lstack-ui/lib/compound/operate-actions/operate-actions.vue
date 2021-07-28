<template>
  <div class="operate-actions">
    <template v-for="(action, index) in outsideActions">
      <el-tooltip
        :key="`outsideActions${index}`"
        :disabled="!action.disabled || !action.tip"
        :content="action.tip"
        placement="bottom-end"
      >
        <el-link
          type="primary"
          :underline="false"
          :icon="action.icon"
          class="operate-actions__outside-item"
          :disabled="action.disabled"
          @click.stop="action.event(action.data, action)"
        >
          {{ action.label }}
        </el-link>
      </el-tooltip>
    </template>
    <template v-if="dropdownActions.length > 0">
      <lui-dropdown-trigger theme="light" :show-timeout="0" inline :hide-timeout="0" class="trigger">
        <template #default="{ visible }">
          <lui-link :highlight="visible" type="primary" :underline="false">
            <span>{{ toggleText }}</span>
            <lui-icon type="none" margin-left :icon="`el-icon-arrow-${visible ? 'up' : 'down'}`" size="xs" />
          </lui-link>
        </template>
        <template #dropdown>
          <lui-dropdown-panel style="min-width: 168px" no-margin>
            <template #default="{ hideDropdown }">
              <lui-tooltip
                v-for="(action, index) in dropdownActions"
                :key="`dropdownActions${index}`"
                :disabled="!action.disabled || !action.tip"
                :content="action.tip"
                placement="left"
              >
                <lui-menu-item
                  :icon="action.icon"
                  :disabled="action.disabled"
                  :text="action.label"
                  @click="() => action.event(action.data, action) || hideDropdown()"
                />
              </lui-tooltip>
            </template>
          </lui-dropdown-panel>
        </template>
      </lui-dropdown-trigger>
    </template>
  </div>
</template>

<script>
  import { isArray, isFunction } from '@lstack/utils'
  import LuiDropdownTrigger from '../../lui/lui-dropdown-trigger'
  import LuiLink from '../../lui/lui-link'
  import LuiIcon from '../../lui/lui-icon'
  import LuiDropdownPanel from '../../lui/lui-dropdown-panel'
  import LuiTooltip from '../../lui/lui-tooltip'
  import LuiMenuItem from '../../lui/lui-menu-item'

  export default {
    name: 'OperateActions',
    components: {
      LuiDropdownTrigger,
      LuiLink,
      LuiIcon,
      LuiDropdownPanel,
      LuiTooltip,
      LuiMenuItem,
    },
    props: {
      // name, label, event, data, disabled, tip, icon,
      actions: {
        type: Array,
        default: () => [],
        validator(val) {
          if (!isArray(val)) return false
          return val.every(action => {
            const keys = Object.keys(action)
            return keys.indexOf('label') !== -1 && keys.indexOf('event') !== -1 && isFunction(action.event)
          })
        },
      },
      outsideMax: {
        type: Number,
        default: 3,
      },
      toggleText: {
        type: String,
        default: '更多',
      },
      dropdownTrigger: {
        type: String,
        default: 'click',
      },
    },
    computed: {
      outsideActions() {
        if (!isArray(this.actions)) return []
        if (this.actions.length <= this.outsideMax) return this.actions
        return this.actions.slice(0, this.outsideMax - 1)
      },
      dropdownActions() {
        if (!isArray(this.actions) || this.actions.length <= this.outsideMax) return []
        return this.actions.slice(this.outsideMax - 1, this.actions.length)
      },
    },
  }
</script>

<style lang="scss">
  .operate-actions {
    position: relative;
    display: inline-block;
  }
  .operate-actions__outside-item.el-link {
    position: relative;
    display: inline-block;
    margin-right: 8px;
    padding-right: 9px;
    vertical-align: top;
    user-select: none;
  }
  .operate-actions__outside-item.el-link:not(:last-child)::after {
    position: absolute;
    top: 50%;
    right: 0;
    display: inline-block;
    height: 12px;
    border-right: 1px solid #dfe1e6;
    transform: translateY(-6px);
    content: '';
  }
</style>
