<template>
  <div v-loading="loading" class="lui-codemirror" :class="[`lui-codemirror--size-${size}`, { merge }]">
    <div class="lui-codemirror__action-bar">
      <div class="lui-codemirror__tip">
        <template v-if="formItemValidateState === 'error' && formItemValidMessage">
          <lui-tip class="g-ml-4" inline type="error">
            <lui-icon type="error" size="xs" icon="el-icon-error" />
            {{ formItemValidMessage }}
          </lui-tip>
        </template>
        <lui-text v-else type="highlight" class="g-ml-4" inline :text="title" />
      </div>
      <div class="lui-codemirror__action-bar-placeholder" />
      <div class="lui-codemirror__actions">
        <slot name="actions">
          <lui-tooltip
            v-if="defaultActions"
            :hide-after="2000"
            :open-delay="300"
            content="导出"
            placement="top"
            :enterable="false"
          >
            <lui-button icon="el-icon-download" no-margin shape="square" />
          </lui-tooltip>
        </slot>
      </div>
    </div>
    <div class="lui-codemirror__content">
      <div v-if="merge" class="lui-codemirror__merge-view-wrap" ref="mergeview"></div>
      <textarea v-else ref="textarea" :name="name" :placeholder="placeholder"></textarea>
    </div>
  </div>
</template>

<script>
  // lib
  import _CodeMirror from 'codemirror'
  import { isEmpty, isFunction, isObject, logError } from '@lstack/utils'
  import Emitter from '../../mixin/emitter'
  import LuiButton from '../lui-button'
  import LuiTooltip from '../lui-tooltip'
  import LuiIcon from '../lui-icon'

  const CodeMirror = window.CodeMirror || _CodeMirror

  // pollfill
  if (typeof Object.assign !== 'function') {
    Object.defineProperty(Object, 'assign', {
      value(target, varArgs) {
        if (target == null) {
          throw new TypeError('Cannot convert undefined or null to object')
        }
        const to = Object(target)
        for (let index = 1; index < arguments.length; index++) {
          // eslint-disable-next-line prefer-rest-params
          const nextSource = arguments[index]
          if (nextSource != null) {
            for (const nextKey in nextSource) {
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey]
              }
            }
          }
        }
        return to
      },
      writable: true,
      configurable: true,
    })
  }

  // export
  export default {
    name: 'LuiCodemirror',
    components: { LuiButton, LuiTooltip, LuiIcon },
    mixins: [Emitter],
    inject: {
      elForm: { default: '' },
      elFormItem: { default: '' },
    },
    props: {
      defaultActions: { type: Boolean, default: true },
      data: {},
      code: String,
      value: String,
      title: { type: String, default: '编辑框' },
      loading: Boolean,
      marker: Function,
      unseenLines: Array,
      name: { type: String, default: 'codemirror' },
      placeholder: { type: String, default: '可通过直接拖动文件至编辑框中的方式导入文件' },
      merge: { type: Boolean, default: false },
      options: { type: Object, default: () => ({}) },
      events: { type: Array, default: () => [] },
      globalOptions: { type: Object, default: () => ({}) },
      globalEvents: { type: Array, default: () => [] },
      size: {
        type: String,
        default: 'middle',
        validator(val) {
          return ['small', 'middle', 'large', 'x-large', 'match'].indexOf(val) !== -1
        },
      },
      theme: {
        type: String,
        default: 'dark',
        validator(val) {
          return ['dark', 'light'].indexOf(val) !== -1
        },
      },
      readOnly: Boolean, // 是否只读
      lineWrapping: Boolean, // 是否自动换行
      validateEvent: { type: Boolean, default: true },
    },
    data() {
      return {
        content: '',
        codemirror: null,
        mInstance: null,
        mergeOption: {
          value: '',
        },
      }
    },
    computed: {
      formItemValidMessage() {
        return (this.elFormItem || {}).validateMessage
      },
      formItemValidateState() {
        return (this.elFormItem || {}).validateState
      },
      iOptions() {
        return undefined
      },
      aOptions() {
        return undefined
      },
      cOptions() {
        const o = {
          readOnly: this.readOnly,
          lineWrapping: this.lineWrapping,
        }
        switch (this.theme) {
          case 'light':
            o.theme = 'eclipse'
            break
          case 'dark':
          default:
            o.theme = 'material'
            break
        }
        if (this.merge) {
          return { ...this.mergeOption, ...o, ...this.aOptions, ...this.iOptions, ...this.options }
        }
        return { ...o, ...this.aOptions, ...this.iOptions, ...this.options }
      },
    },
    watch: {
      cOptions: {
        deep: true,
        handler(cOptions) {
          // eslint-disable-next-line guard-for-in
          for (const key in cOptions) {
            this.mInstance.setOption(key, cOptions[key])
          }

          if (this.merge) {
            this.switchMerge()
          }
        },
      },
      merge() {
        this.$nextTick(this.switchMerge)
      },
      data(newVal) {
        if (!isEmpty(newVal)) {
          this.handleCodeChange(this.translateData2code(newVal))
        }
      },
      code(newVal) {
        this.handleCodeChange(newVal)
      },
      value(newVal) {
        this.handleCodeChange(newVal)
      },
    },
    mounted() {
      this.initialize()
    },
    beforeDestroy() {
      this.destroy()
    },
    methods: {
      translateData2code(data) {
        let code
        if (data !== undefined) {
          try {
            code = JSON.stringify(data)
          } catch (e) {
            logError(e)
          }
        }
        return code
      },
      initialize() {
        const cmOptions = { ...this.globalOptions, ...this.cOptions }
        if (this.merge) {
          this.codemirror = CodeMirror.MergeView(this.$refs.mergeview, cmOptions)
          this.mInstance = this.codemirror.edit
        } else {
          this.codemirror = CodeMirror.fromTextArea(this.$refs.textarea, cmOptions)
          this.mInstance = this.codemirror
        }
        const content = this.translateData2code(this.data) || this.code || this.value || this.content
        this.mInstance.setValue(content)
        if (this.content !== content) {
          this.content = content
          if (this.$emit) {
            this.$emit('input', this.content)
          }
        }
        this.mInstance.on('change', cm => {
          this.content = cm.getValue()
          if (this.$emit) {
            this.$emit('input', this.content)
          }
        })

        // 所有有效事件（驼峰命名）+ 去重
        const tmpEvents = {}
        // eslint-disable-next-line no-unused-vars
        const allEvents = [
          'scroll',
          'changes',
          'beforeChange',
          'cursorActivity',
          'keyHandled',
          'inputRead',
          'electricInput',
          'beforeSelectionChange',
          'viewportChange',
          'swapDoc',
          'gutterClick',
          'gutterContextMenu',
          'focus',
          'blur',
          'refresh',
          'optionChange',
          'scrollCursorIntoView',
          'update',
        ]
          .concat(this.events)
          .concat(this.globalEvents)
          // eslint-disable-next-line no-return-assign
          .filter(e => !tmpEvents[e] && (tmpEvents[e] = true))
          .forEach(event => {
            // 循环事件，并兼容 run-time 事件命名
            this.mInstance.on(event, (...args) => {
              // console.log('当有事件触发了', event, args)
              if (event === 'blur') {
                if (this.validateEvent) {
                  this.dispatch('ElFormItem', 'el.form.blur', this.content)
                }
              }
              this.$emit(event, ...args)
              const lowerCaseEvent = event.replace(/([A-Z])/g, '-$1').toLowerCase()
              if (lowerCaseEvent !== event) {
                this.$emit(lowerCaseEvent, ...args)
              }
            })
          })

        this.$emit('ready', this.codemirror)
        this.unseenLineMarkers()

        // prevents funky dynamic rendering
        this.refresh()
      },
      refresh() {
        this.$nextTick(() => {
          this.mInstance.refresh()
        })
      },
      destroy() {
        // garbage cleanup
        let element = this.merge ? this.codemirror.wrap : this.mInstance.doc.cm.getWrapperElement()
        element && element.remove()
      },
      handleCodeChange(newVal) {
        const cmValue = this.mInstance.getValue()
        if (newVal !== cmValue) {
          const scrollInfo = this.mInstance.getScrollInfo()
          this.mInstance.setValue(newVal)
          this.content = newVal
          this.mInstance.scrollTo(scrollInfo.left, scrollInfo.top)
        }
        this.unseenLineMarkers()
      },
      unseenLineMarkers() {
        if (this.unseenLines !== undefined && this.marker !== undefined) {
          this.unseenLines.forEach(line => {
            const info = this.mInstance.lineInfo(line)
            this.mInstance.setGutterMarker(line, 'breakpoints', info.gutterMarkers ? null : this.marker())
          })
        }
      },
      switchMerge() {
        // Save current values
        const { history, cleanGeneration } = this.mInstance.doc
        this.mergeOption.value = this.mInstance.getValue()

        this.destroy()
        this.initialize()

        // Restore values
        this.mInstance.doc.history = history
        this.mInstance.doc.cleanGeneration = cleanGeneration
      },
    },
  }
</script>
<style lang="scss">
  .lui-codemirror {
    line-height: 1.5;
    display: flex;
    flex-direction: column;

    .CodeMirror-merge-r-chunk {
      background: rgba(255, 255, 255, 0.1);
    }

    .CodeMirror-merge-2pane {
      .CodeMirror-merge-gap {
        width: 3%;
        .CodeMirror-merge-scrolllock-wrap {
          display: none;
        }
      }
      .CodeMirror-merge-pane {
        width: 48.5%;
      }
    }
    .CodeMirror {
      height: 100%;
    }
    .CodeMirror-merge {
      height: 100%;

      .CodeMirror-merge-pane {
        height: 100%;

        .CodeMirror {
          height: 100%;
        }
      }
    }
  }

  .lui-codemirror__action-bar {
    position: relative;
    display: flex;
    align-items: center;
    background-color: #f2f5fc;
    flex: none;
  }

  .lui-codemirror__content {
    position: relative;
    overflow: auto;
    flex: auto;
  }

  .lui-codemirror__merge-view-wrap {
    overflow: hidden;
    height: 100%;
    position: relative;
  }

  .lui-codemirror__action-bar-placeholder {
    flex: auto;
  }

  .lui-codemirror--size-small {
    height: 300px;
  }
  .lui-codemirror--size-middle {
    height: 400px;
  }
  .lui-codemirror--size-large {
    height: 500px;
  }
  .lui-codemirror--size-x-large {
    height: 600px;
  }
  .lui-codemirror--size-match {
    height: 100%;
    position: relative;
  }
</style>
