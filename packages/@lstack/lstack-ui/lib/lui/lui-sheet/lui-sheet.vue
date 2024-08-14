<template>
  <rl-list-edit
    ref="rlListEditRef"
    #default="{ editList, add, remove }"
    :value="options"
    :empty-item="emptyItem"
    :init-value="initSheet"
    @input="(val, oldVal) => $emit('update:options', val, oldVal)"
    @change="(newVal, oldVal) => $emit('change', newVal, oldVal)"
  >
    <div
      class="lui-sheet"
      :class="[
        inline ? 'is-inline' : '',
        marginTop ? 'lui-sheet--margin-top' : '',
        marginRight ? 'lui-sheet--margin-right' : '',
        marginBottom ? 'lui-sheet--margin-bottom' : '',
        marginLeft ? 'lui-sheet--margin-left' : '',
        matchParent ? 'match-parent' : '',
      ]"
    >
      <div class="lui-sheet__sheets" :class="[underline ? 'is-underline' : '', showDivider ? 'show-divider' : '']">
        <lui-list-view no-default-item :list="options" class="lui-sheet__item-container">
          <template #default="{ listItem, index }">
            <rl-forward
              :key="index"
              #default="{ forward }"
              :action="optionForwardAction(optionValue, listItem, index)"
              :to="optionForwardTo(optionValue, listItem, index)"
              :config="optionForwardConfig(optionValue, listItem, index)"
            >
              <div
                class="lui-sheet__item"
                :class="{ 'is-active': isEqual(optionValue(listItem), cValue), 'is-disabled': optionDisable(listItem) }"
                @click="() => handleClick(optionValue(listItem), listItem, index, forward)"
              >
                <slot name="content" :option="listItem" :optionValue="optionValue" :index="index">
                  <span>{{ optionLabel(listItem) }}</span>
                </slot>
                <lui-button
                  v-if="
                    !(
                      !editable ||
                      (!cRemovable(optionValue(listItem), listItem, index, editList) && hideActionWhenUnRemovable)
                    )
                  "
                  :disabled="!cRemovable(optionValue(listItem), listItem, index, editList)"
                  class="remove-button"
                  shape="square"
                  icon="el-icon-close"
                  @click.stop="() => remove(index)"
                />
              </div>
            </rl-forward>
          </template>
        </lui-list-view>

        <template v-if="!(!editable || (unAddable && hideActionWhenUnAddable))">
          <lui-link
            class="lui-sheet__add-action"
            :disabled="unAddable"
            :underline="false"
            @click="() => handleAddAction(add)"
          >
            <slot name="addAction">
              <span>{{ addActionText }}</span>
            </slot>
          </lui-link>
        </template>
      </div>

      <lui-list-view
        v-if="$scopedSlots.panel"
        no-default-item
        #default="{ listItem, index }"
        :list="options"
        class="lui-sheet__panel-container"
      >
        <div v-show="isEqual(optionValue(listItem), cValue)" class="lui-sheet__panel">
          <slot name="panel" :option="listItem" :optionValue="optionValue(listItem)" :index="index" />
        </div>
      </lui-list-view>
    </div>
  </rl-list-edit>
</template>

<script>
  import { get, isEqual, isEmpty, isFunction, isNotEmptyObject, isNotEmptyText } from '@lstack/utils'
  import Selectable from '../../mixin/selectable'
  import LuiButton from '../lui-button'
  import LuiLink from '../lui-link'
  import RlListEdit from '../../renderless/rl-list-edit'
  import LuiListView from '../lui-list-view'

  export default {
    name: 'LuiSheet',
    components: { LuiButton, LuiLink, RlListEdit, LuiListView },
    extends: RlListEdit,
    mixins: [Selectable],
    props: {
      value: {},
      optionLabelKey: { type: String, default: 'label' },
      optionForwardActionKey: { type: String, default: 'action' },
      optionForwardActionApi: { type: [String, Function], default: 'default' },
      optionForwardToKey: { type: String, default: 'to' },
      optionForwardToApi: [String, Object, Function],
      optionForwardConfigKey: { type: String, default: 'config' },
      optionForwardConfigApi: [Object, Function],
      inline: Boolean,
      underline: Boolean,
      marginTop: Boolean,
      marginRight: Boolean,
      marginBottom: Boolean,
      marginLeft: Boolean,
      matchParent: Boolean,
      showDivider: Boolean,
      watchOnlyNotEqual: { type: Boolean, default: true },
      valueInitializeMode: { type: String, default: 'Once' },

      emptyItem: {},
      initSheet: Boolean,
      editable: Boolean,
      addActionText: { type: String, default: '添加' },
      unAddable: Boolean,
      hideActionWhenUnAddable: Boolean,
      unRemovable: {
        type: [Function, Boolean],
        default: (optionValue, option, index, list = []) => {
          return list.length <= 1
        },
      },
      hideActionWhenUnRemovable: Boolean,
      newAddValueAutoSelectDisabled: Boolean,
    },
    data() {
      return {
        mValue: this.value,
      }
    },
    computed: {
      cValue: {
        get() {
          if (isEmpty(this.value)) {
            return this.mValue
          }
          return this.value
        },
        set(val) {
          this.mValue = val
          this.emitChange(val)
        },
      },
    },
    watch: {
      // value: {
      //   handler(nv) {
      //     this.mValue = nv
      //   },
      // },
    },
    methods: {
      isEqual,
      addSheet() {
        return this.$refs.rlListEditRef.add()
      },
      handleClick(optionValue, option, index, forward) {
        if (!this.optionDisable(option)) {
          this.cValue = optionValue
          forward()
        }
      },
      handleAddAction(add) {
        const newOption = add()
        if (!this.newAddValueAutoSelectDisabled) {
          this.cValue = this.optionValue(newOption)
        }
      },
      optionForwardTo(optionValue, option, index) {
        if (isFunction(this.optionForwardToApi)) {
          return this.optionForwardToApi(optionValue, option, index)
        }
        if (isNotEmptyObject(this.optionForwardToApi) || isNotEmptyText(this.optionForwardToApi)) {
          return this.optionForwardToApi
        }
        return get(option, this.optionForwardToKey, undefined)
      },
      optionForwardAction(optionValue, option, index) {
        if (isFunction(this.optionForwardActionApi)) {
          return this.optionForwardActionApi(optionValue, option, index)
        }
        if (isNotEmptyText(this.optionForwardActionApi)) {
          return this.optionForwardActionApi
        }
        return get(option, this.optionForwardActionApi, undefined)
      },
      optionForwardConfig(optionValue, option, index) {
        if (isFunction(this.optionForwardConfigApi)) {
          return this.optionForwardConfigApi(optionValue, option, index)
        }
        if (isNotEmptyObject(this.optionForwardConfigApi)) {
          return this.optionForwardConfigApi
        }
        return get(option, this.optionForwardConfigKey, undefined)
      },
      cRemovable(optionValue, option, index, list) {
        if (isFunction(this.unRemovable)) {
          return !this.unRemovable(optionValue, option, index, list)
        }
        return !this.unRemovable
      },
    },
  }
</script>
<style lang="scss">
  @import 'lui-sheet.var';

  .lui-sheet {
    position: relative;

    &.match-parent {
      width: 100%;
    }

    &.is-inline {
      display: inline-block;
    }
  }

  .lui-sheet--margin-left {
    margin-left: $lui-sheet__horizontal--margin;
  }
  .lui-sheet--margin-right {
    margin-right: $lui-sheet__horizontal--margin;
  }
  .lui-sheet--margin-top {
    margin-top: $lui-sheet__vertical--margin;
  }
  .lui-sheet--margin-bottom {
    margin-bottom: $lui-sheet__vertical--margin;
  }

  .remove-button.lui-button {
    display: none;

    .lui-sheet__item:hover & {
      display: unset;
    }
  }

  .lui-sheet__sheets {
    position: relative;
    display: flex;

    &.is-underline {
      border-bottom: $lui-sheet__bottom-border-width solid $lui-sheet__bottom-border-color;
    }
  }

  .lui-sheet__item-container {
    position: relative;
    display: flex;
    flex: auto;
    overflow: auto;
  }

  .lui-sheet__item {
    flex: none;
    position: relative;
    height: $lui-sheet-item--height;
    line-height: $lui-sheet-item--line-height;
    color: $lui-sheet-item--color;
    font-size: $lui-sheet-item--font-size;
    cursor: pointer;

    .lui-sheet__sheets.show-divider & {
      padding-left: 12px;
      padding-right: 12px;

      &:not(:first-child):before {
        content: '';
        position: absolute;
        bottom: 8px;
        left: -10px;
        width: 1px;
        height: 14px;
        background-color: rgb(223, 225, 230);
      }
    }

    &:not(:first-child) {
      margin-left: $lui-sheet-item__margin-left;
    }

    &:after {
      content: '';
      position: absolute;
      left: 50%;
      right: 50%;
      bottom: 0;
      height: $lui-sheet-item__after--height;
      background-color: $lui-sheet-item__after--background-color;
      transition: left 0.2s ease-in-out, right 0.2s ease-in-out, background 0.2s ease-in-out;
    }

    &.is-active,
    &:not(.is-disabled):hover {
      color: $lui-sheet-item__highlight--color;
      font-weight: $lui-sheet-item__highlight--font-weight;

      &:after {
        left: 0;
        right: 0;
        background-color: $lui-sheet-item__after-highlight--background-color;
      }
    }
    &.is-disabled {
      color: $lui-sheet-item__disabled--color;
      cursor: not-allowed;
    }
  }

  .lui-sheet__add-action {
    flex: none;
  }
</style>
