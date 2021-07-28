<template>
  <div class="draggable-selector">
    <div class="draggable-selector__inner">
      <div class="draggable-selector__body">
        <div class="draggable-selector__cell draggable-selector__panel">
          <header-layout top-class="draggable-selector__panel-header">
            <template #topLeft>
              <slot name="leftTitle">
                <lui-text inline type="highlight" :text="cLeftTitle" />
                <lui-tip-icon v-if="leftTitleTip" size="xs" icon="el-icon-question" margin-left :tip="leftTitleTip" />
              </slot>
            </template>

            <template #topRight>
              <slot name="leftActions"></slot>
              <lui-tooltip
                v-if="isFunction(refreshApi)"
                placement="top"
                :disabled="!refreshDisabled || !refreshDisableTip"
                :content="refreshDisableTip"
              >
                <lui-button
                  tag="div"
                  class="g-va-top"
                  shape="square"
                  :disabled="refreshDisabled"
                  :icon="loading ? 'el-icon-loading' : 'el-icon-refresh'"
                  :before-click-handle="beforeRefresh"
                  :before-click-handle-async="beforeRefreshAsync"
                  @click="refreshApi"
                />
              </lui-tooltip>
            </template>
          </header-layout>
          <div class="draggable-selector__panel-body">
            <draggable
              v-model="unselectedOptions"
              class="draggable-selector__option-container"
              v-bind="dragOptions"
              :move="onMove"
              draggable=".list-group-item:not(.is-disabled)"
              tag="div"
              @start="isDragging = true"
              @end="isDragging = false"
            >
              <transition-group type="transition" :name="'flip-list'" class="draggable-selector__option-list" tag="ul">
                <li
                  v-for="(unselectedOption, index) in unselectedOptions"
                  :key="index"
                  class="list-group-item"
                  :class="[optionDisable(unselectedOption) ? 'is-disabled' : '']"
                >
                  <slot name="optionItem" v-bind="{ option: unselectedOption, index }">
                    <slot name="unselectedOptionItem" v-bind="{ option: unselectedOption, index }">
                      <span>{{ optionLabel(unselectedOption) }}</span>
                    </slot>
                  </slot>
                </li>
              </transition-group>
            </draggable>
          </div>
        </div>
        <div class="draggable-selector__cell separator-cell"></div>
        <div class="draggable-selector__cell draggable-selector__panel">
          <header-layout top-class="draggable-selector__panel-header">
            <template #topLeft>
              <lui-text type="highlight" :text="cRightTitle" />
              <lui-tip-icon v-if="rightTitleTip" size="xs" icon="el-icon-question" margin-left :tip="rightTitleTip" />
            </template>
          </header-layout>
          <div class="draggable-selector__panel-body">
            <draggable
              v-model="cValue"
              tag="div"
              class="draggable-selector__option-container"
              :class="[formItemValidateState === 'error' ? 'is-valid-error' : '']"
              v-bind="dragOptions"
              :move="onMove"
            >
              <transition-group name="no" class="draggable-selector__option-list" tag="ul">
                <li v-for="(selectedOption, index) in cValue" :key="index" class="list-group-item">
                  <slot name="optionItem" v-bind="{ option: selectedOption, index }">
                    <slot name="selectedOptionItem" v-bind="{ option: selectedOption, index }">
                      {{ optionLabel(selectedOption) }}
                    </slot>
                  </slot>
                </li>
              </transition-group>
            </draggable>
          </div>
        </div>
      </div>
      <footer-layout class="draggable-selector__footer">
        <lui-tip slot="bottomLeft" tip="拖动数据项进行选择" />
        <lui-tip slot="bottomRight" type="error" :tip="formItemValidMessage" />
      </footer-layout>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'

  import { isFunction, isNotEmptyText } from '@lstack/utils'
  import Emitter from '../../mixin/emitter'
  import MultipleSelectable from '../../mixin/multiple-selectable'
  import FooterLayout from '../../layout/footer-layout'
  import HeaderLayout from '../../layout/header-layout'
  import LuiButton from '../../lui/lui-button'
  import LuiTooltip from '../../lui/lui-tooltip'

  export default {
    name: 'DraggableSelector',
    components: { draggable, FooterLayout, HeaderLayout, LuiButton, LuiTooltip },
    mixins: [Emitter, MultipleSelectable],
    inject: {
      elForm: { default: '' },
      elFormItem: { default: '' },
    },
    props: {
      leftTitle: String,
      leftTitleTip: String,
      rightTitle: String,
      rightTitleTip: String,
      loading: Boolean,

      refreshApi: Function,
      // 返回值为是否拦截该 forward 事务，true 为拦截，不往下继续执行
      beforeRefresh: Function,
      beforeRefreshAsync: Function,
      refreshDisabled: Boolean,
      refreshDisableTip: String,
    },
    data() {
      return {
        editable: true,
        isDragging: false,
        delayedDragging: false,
      }
    },
    computed: {
      formItemValidMessage() {
        return (this.elFormItem || {}).validateMessage
      },
      formItemValidateState() {
        return (this.elFormItem || {}).validateState
      },
      cLeftTitle() {
        if (isNotEmptyText(this.leftTitle)) {
          return this.leftTitle
        }
        return `共 ${this.unselectedOptions.length} 条数据可选`
      },
      cRightTitle() {
        if (isNotEmptyText(this.leftTitle)) {
          return this.leftTitle
        }
        return `已选择 ${this.cValue.length} 条`
      },
      dragOptions() {
        return {
          animation: 0,
          group: 'description',
          disabled: !this.editable,
          ghostClass: 'ghost',
        }
      },
    },
    watch: {
      cValue: {
        handler(newVal) {
          this.dispatch('ElFormItem', 'el.form.change', newVal)
        },
      },
      isDragging(newValue) {
        if (newValue) {
          this.delayedDragging = true
          return
        }
        this.$nextTick(() => {
          this.delayedDragging = false
        })
      },
    },
    methods: {
      isFunction,
      onMove({ relatedContext, draggedContext }) {
        const relatedElement = relatedContext.element
        const draggedElement = draggedContext.element
        return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      },
    },
  }
</script>

<style lang="scss">
  .draggable-selector {
    width: 1080px;
    max-width: 100%;
    box-sizing: border-box;
    background-color: #f2f2f2;
    padding: 8px 12px 12px 12px;
    user-select: none;
  }

  .draggable-selector__body {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  .draggable-selector__footer {
    color: #ababab;
    margin-top: 8px;
  }

  .draggable-selector__cell {
    display: table-cell;
    font-size: 12px;
    position: relative;
  }

  .draggable-selector__cell.separator-cell {
    width: 32px;
    text-align: center;
    vertical-align: middle;
  }

  .draggable-selector__panel-body {
    height: 280px;
  }

  .draggable-selector__panel-header {
    min-height: 28px;
  }

  .draggable-selector__option-container {
    border: 1px solid #ddd;
    overflow-y: auto;
    background-color: #fff;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 100%;

    &.is-valid-error {
      border: 1px solid #f66f6a;
    }
  }

  .draggable-selector__option-list {
    height: 100%;
  }

  .ghost {
    opacity: 0.5;
    background: #b9ccfa;
  }

  .list-group-item {
    cursor: move;
    border-bottom: 1px solid #e6ebf2;

    &.is-disabled {
      cursor: no-drop;
    }
  }

  .list-group-item i {
    cursor: pointer;
  }
</style>
