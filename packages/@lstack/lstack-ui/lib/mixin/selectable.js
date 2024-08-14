import {
  get,
  isArray,
  isEmpty,
  isEmptyArray,
  isEqual,
  isFunction,
  isNotEmptyArray,
  isNotEmptyText,
  isObject,
  isText,
  logError,
  pick,
} from '@lstack/utils'

export default {
  name: 'Selectable',
  props: {
    // 用于判断 option 是否为 disable 的函数，入参为 option，返回是否 disable 的结果
    optionDisable: { type: Function, default: (optionValue, option) => false },
    optionDisabledTip: { type: Function, default: (optionValue, option) => undefined },
    value: { required: true },
    options: { type: Array, default: () => [] },
    // 指定el-select的value-key
    optionValueKey: String,
    // 指定 el-option 的 label-key,未指定则使用 optionValueKey
    optionLabelKey: String,
    // 当 value 为对象时，指定 el-select 的 value-key
    selectValueKey: String,
    // label 映射转义的函数，入参为 label 原始值，需返回转义后的字符
    labelMapApi: [Object, Array, Function],
    // 如果valueUpdateMode为'Pick',则需指定该参数,用于指定需要比较的keys集合
    valueUpdateImmediate: Boolean,
    // 列表刷新或者数据变化后,this.value的清除模式
    // undefined,即不设置,为select默认逻辑,不清除value
    // Equal,如果新列表中存在一个对象与this.value进行'_isEqual()'计算值为true,则不清除,并用新列表中的对象替换原value值,并分发change事件,否则清除this.value
    // Same,如果新列表中存在一个对象与this.value进行'==='计算值为true,则不清除,并用新列表中的对象替换原value值,并分发change事件,否则清除this.value
    // KeyEqual,该模式需要指定valueUpdateKey参数,比较this.value的valueUpdateKey属性对应的值,如果新列表中存在一个对象的valueUpdateKey属性对应的值与前者进行'_isEqual()'计算值为true,则不清除,并用新列表中的对象替换原value值,并分发change事件,否则清除this.value
    // KeySame,该模式需要指定valueUpdateKey参数,比较this.value的valueUpdateKey属性对应的值,如果新列表中存在一个对象的valueUpdateKey属性对应的值与前者进行'==='计算值为true,则不清除,并用新列表中的对象替换原value值,并分发change事件,否则清除this.value
    // Pick,该模式需要指定 valueUpdateKey 参数,比较this.value中由 valueUpdateKey 中指定的keys的值组成的一个新对象{pickKey1:xxx,pickKey2:xxx,...},如果新列表中存在一个对象的由 valueUpdateKey 属性值组成的对象与前者进行'_isEqual()'计算值为true,则不清除,并用新列表中的对象替换原value值,并分发change事件,否则清除this.value
    // 除了undefined和Same,在成功匹配触发自动清除逻辑后都会用新列表中匹配到的新值自动替换原value,消费之可通过@chang事件接收到该变化
    // 若清除逻辑触发,但是设置了autoSelectFirst=true,则会触发autoSelectFirst逻辑,选择列表第一个对象
    // 枚举值 undefined,'Equal','Same','KeyEqual','KeySame','Pick'
    valueUpdateMode: { type: String, default: 'Equal' },
    // 如果valueUpdateMode为'KeyEqual'或'KeySame',则需指定该参数,用于指定需要比较的key
    valueUpdateKey: [String, Array],
    valueInitializeApi: Function,
    // 在 WhenUndefined 模式下，无论是在触发 valueUpdate 前后，只要 value 为 undefined 都会按照 valueInitializeApi 的逻辑进行 value 的初始化
    // 在 OnlyUndefinedBeforeUpdate 模式下，由触发 valueUpdate 导致的 value 为 undefined 不会执行 valueInitializeApi 的初始化逻辑
    // 在 Once 模式下，valueInitializeApi 成功执行过一次后不会再执行
    valueInitializeMode: {
      type: String,
      default: 'OnlyUndefinedBeforeUpdate',
      validator(val) {
        return ['WhenUndefined', 'OnlyUndefinedBeforeUpdate', 'Once'].indexOf(val) !== -1
      },
    },
    multiple: Boolean,
    watchOnlyNotEqual: Boolean,
    clearValueBeforeDestroy: Boolean,
  },
  data() {
    return {
      valueInitialized: false,
      optionValuesImmediateWatched: false,
      createdOptions: [],
    }
  },
  computed: {
    cValue: {
      get() {
        return this.value
      },
      set(val) {
        this.emitChange(val)
      },
    },
    cOptionValueKey() {
      return this.optionValueKey
    },
    cOptionLabelKey() {
      return !isEmpty(this.optionLabelKey) ? this.optionLabelKey : this.cOptionValueKey
    },
    cValueUpdateKey() {
      if (!isEmpty(this.valueUpdateKey)) {
        return this.valueUpdateKey
      }
      if (isEmpty(this.cOptionValueKey)) {
        return this.cSelectValueKey
      }
      return undefined
    },
    cSelectValueKey() {
      if (isNotEmptyText(this.selectValueKey)) {
        return this.selectValueKey
      }
      if (isEmpty(this.cOptionValueKey)) {
        return this.cOptionLabelKey
      }
      return undefined
    },
    cOptions() {
      return this.createdOptions.concat(this.options)
    },
  },
  watch: {
    cOptions: {
      immediate: true,
      handler(newOptions, oldOptions) {
        // 可能是 el 的 bug，当指定 multiple 时，选中 option 会触发 watch，而这时新旧数据是一致的，显然这不是我们想要的
        if (this.watchOnlyNotEqual || this.multiple) {
          if (isEqual(newOptions, oldOptions)) {
            return
          }
        }

        const newOptionValues = isArray(newOptions) ? this.cOptions.map(option => this.optionValue(option)) : []

        const currentValue = this.cValue
        this.valueInitialized = this.isValueInitialized(currentValue, true)
        if (this.valueInitialized) {
          if (this.valueUpdateImmediate || this.optionValuesImmediateWatched) {
            let updatedValue = this.multiple
              ? this.getUpdatedValues(newOptionValues, currentValue)
              : this.getUpdatedValue(newOptionValues, currentValue)
            if (
              !this.isValueInitialized(updatedValue, false) &&
              isFunction(this.valueInitializeApi) &&
              isNotEmptyArray(newOptionValues)
            ) {
              updatedValue = this.valueInitializeApi(newOptionValues, this.cOptions)
            }
            if (
              (!this.multiple && updatedValue !== currentValue) ||
              (this.multiple && !isEqual(updatedValue, currentValue))
            ) {
              this.cValue = updatedValue
            }
          }
        } else if (isFunction(this.valueInitializeApi) && isNotEmptyArray(newOptionValues)) {
          const initValue = this.valueInitializeApi(newOptionValues, this.cOptions)
          if ((!this.multiple && initValue !== undefined) || (this.multiple && isNotEmptyArray(initValue))) {
            this.cValue = initValue
          }
        }
        this.optionValuesImmediateWatched = true
      },
    },
  },
  beforeDestroy() {
    if (this.clearValueBeforeDestroy) {
      this.cValue = undefined
    }
  },
  methods: {
    get,
    isFunction,
    optionLabel(option) {
      let label
      if (isNotEmptyText(option)) {
        label = option
      } else {
        label = isNotEmptyText(this.cOptionLabelKey) ? get(option, this.cOptionLabelKey, undefined) : option
      }
      if (isFunction(this.labelMapApi)) {
        label = this.labelMapApi(label, option)
      } else if (isObject(this.labelMapApi) || isArray(this.labelMapApi)) {
        label = this.labelMapApi[label]
      }
      return label
    },
    optionValue(option) {
      return isNotEmptyText(this.cOptionValueKey) ? get(option, this.cOptionValueKey, undefined) : option
    },
    emitChange(newVal) {
      setTimeout(() => {
        // 解决下拉框提前展开，自动选中后输入框没有数据问题
        const oldVal = this.value
        this.$emit('input', newVal, oldVal)
        this.$emit('change', newVal, oldVal)
      }, 5)
    },
    getUpdatedValue(optionValues, currentValue) {
      if (this.multiple && ['Equal', 'Same', 'KeyEqual', 'KeySame', 'Pick'].indexOf(this.valueUpdateMode) !== -1) {
        logError(`当前 valueUpdateMode 为 ${this.valueUpdateMode}，并不适用于 multiple 模式。`)
      }
      if (currentValue === undefined || (this.multiple && isEmptyArray(currentValue))) return currentValue
      let result = currentValue
      switch (this.valueUpdateMode) {
        case 'Equal':
          result = optionValues.find(optionValue => isEqual(currentValue, optionValue))
          break
        case 'Same':
          result = optionValues.find(optionValue => optionValue === currentValue)
          break
        case 'KeyEqual':
          if (isText(currentValue)) {
            result = optionValues.find(optionValue => isEqual(currentValue, optionValue))
            logError(
              `${this.$vnode.tag}，当前 valueUpdateMode: KeyEqual，而 currentValue: ${this.currentValue}为字符类型，你期望的 valueUpdateMode 或许是 Equal ？`
            )
          } else if (isNotEmptyText(this.cValueUpdateKey)) {
            const filtered = optionValues.filter(optionValue => {
              const valueKeyData = get(currentValue, this.cValueUpdateKey, undefined)
              const optionValueKeyData = get(optionValue, this.cValueUpdateKey, undefined)

              return isEqual(valueKeyData, optionValueKeyData)
            })
            if (filtered.length > 1) {
              result = filtered[0]
              logError(
                `${this.$vnode.tag}，当前 valueUpdateMode: KeyEqual，当前 cValueUpdateKey 为 ${this.cValueUpdateKey}，匹配到多个符合的值 ${filtered}，请指定合适的能够代表唯一性的 key`
              )
            } else if (filtered.length === 1) {
              result = filtered[0]
            } else {
              result = undefined
            }
          } else {
            result = optionValues.find(optionValue => isEqual(currentValue, optionValue))
            logError(
              `${this.$vnode.tag}，当 valueUpdateMode 设定为 KeyEqual 时，cValueUpdateKey 需要指定为非空字符类型，当前为${this.cValueUpdateKey}`
            )
          }
          break
        case 'KeySame':
          if (isText(currentValue)) {
            result = optionValues.find(optionValue => currentValue === optionValue)
            logError(
              `${this.$vnode.tag}，当前 valueUpdateMode: KeySame，而 currentValue: ${this.currentValue}为字符类型，你期望的 valueUpdateMode 或许是 Same ？`
            )
          } else if (isNotEmptyText(this.cValueUpdateKey)) {
            const filtered = optionValues.filter(optionValue => {
              const valueKeyData = get(currentValue, this.cValueUpdateKey, undefined)
              const optionValueKeyData = get(optionValue, this.cValueUpdateKey, undefined)

              return valueKeyData === optionValueKeyData
            })
            if (filtered.length > 1) {
              result = filtered[0]
              logError(
                `${this.$vnode.tag}，当前 valueUpdateMode 设定为 KeySame，当前 cValueUpdateKey 为 ${this.cValueUpdateKey}，匹配到多个符合的值 ${filtered}，请指定合适的能够代表唯一性的 key`
              )
            } else if (filtered.length === 1) {
              result = filtered[0]
            } else {
              result = undefined
            }
          } else {
            result = optionValues.find(optionValue => currentValue === optionValue)
            logError(
              `${this.$vnode.tag}，当 valueUpdateMode 设定为 KeySame 时，cValueUpdateKey 需要指定为非空字符类型，当前为${this.cValueUpdateKey}`
            )
          }
          break
        case 'Pick':
          if (isText(currentValue)) {
            result = optionValues.find(optionValue => currentValue === optionValue)
            logError(
              `${this.$vnode.tag}，当前 valueUpdateMode: Pick，而 currentValue: ${this.currentValue}为字符类型，你期望的 valueUpdateMode 或许是 Equal 或 Same ？`
            )
          } else if (isNotEmptyArray(this.cValueUpdateKey)) {
            const filtered = optionValues.filter(optionValue => {
              const valuePickData = pick(currentValue, this.cValueUpdateKey)
              const optionValuePickData = pick(optionValue, this.cValueUpdateKey)

              return isEqual(valuePickData, optionValuePickData)
            })
            if (filtered.length > 1) {
              result = filtered[0]
              logError(
                `${this.$vnode.tag}，当前 valueUpdateMode 设定为 Pick，当前 cValueUpdateKey 为 ${this.cValueUpdateKey}，匹配到多个符合的值 ${filtered}，请指定合适的能够代表唯一性的 keys`
              )
            } else if (filtered.length === 1) {
              result = filtered[0]
            } else {
              result = undefined
            }
          } else {
            logError(
              `${this.$vnode.tag}，当 valueUpdateMode 设定为 Pick 时，cValueUpdateKey 需要指定为非空字符数组，当前为${this.cValueUpdateKey}`
            )
          }
          break
        case 'Exist':
          result = currentValue.filter(currentValueItem => {
            return optionValues.indexOf(currentValueItem) !== -1
          })
          break
        case 'None':
          result = undefined
          break
        case 'Default':
        default:
          break
      }
      return result
    },
    getUpdatedValues(optionValues, currentValues) {
      if (!isArray(optionValues) || !isArray(currentValues)) return []
      if (isEmptyArray(optionValues)) return []
      if (isEmptyArray(currentValues)) return currentValues

      let result = []
      switch (this.valueUpdateMode) {
        case 'Equal':
          currentValues.forEach(selectedOption => {
            optionValues.forEach(newOption => {
              if (isEqual(selectedOption, newOption)) {
                result.push(newOption)
              }
            })
          })
          break
        case 'Same':
          currentValues.forEach(selectedOption => {
            optionValues.forEach(newOption => {
              if (selectedOption === newOption) {
                result.push(newOption)
              }
            })
          })
          break
        case 'KeyEqual':
          currentValues.forEach(selectedOption => {
            optionValues.forEach(newOption => {
              if (isText(newOption) || isText(selectedOption)) {
                logError(
                  `${this.$vnode.tag}，当前 valueUpdateMode: KeyEqual，而 option 为字符类型，你期望的 valueUpdateMode 或许是 Equal ？`
                )
              } else if (isArray(this.cValueUpdateKey)) {
                logError(
                  `${this.$vnode.tag}，当前 valueUpdateMode: KeyEqual，当前 cValueUpdateKey 为数组类型 ${this.cValueUpdateKey}，你期望的 valueUpdateMode 或许是 pick`
                )
              } else if (
                isEqual(
                  get(selectedOption, this.cValueUpdateKey, undefined),
                  get(newOption, this.cValueUpdateKey, undefined)
                )
              ) {
                result.push(newOption)
              }
            })
          })
          break
        case 'KeySame':
          currentValues.forEach(selectedOption => {
            optionValues.forEach(newOption => {
              if (isText(newOption) || isText(selectedOption)) {
                logError(
                  `${this.$vnode.tag}，当前 valueUpdateMode: KeySame，而 option 为字符类型，你期望的 valueUpdateMode 或许是 Same ？`
                )
              } else if (isArray(this.cValueUpdateKey)) {
                logError(
                  `${this.$vnode.tag}，当前 valueUpdateMode: KeySame，当前 cValueUpdateKey 为数组类型 ${this.cValueUpdateKey}，你期望的 valueUpdateMode 或许是 pick`
                )
              } else if (
                get(selectedOption, this.cValueUpdateKey, undefined) === get(newOption, this.cValueUpdateKey, undefined)
              ) {
                result.push(newOption)
              }
            })
          })
          break
        case 'Pick':
          currentValues.forEach(selectedOption => {
            optionValues.forEach(newOption => {
              if (isText(newOption) || isText(selectedOption)) {
                logError(
                  `${this.$vnode.tag}，当前 valueUpdateMode: KeySame，而 option 为字符类型，你期望的 valueUpdateMode 或许是 Equal ？`
                )
              } else if (!isArray(this.cValueUpdateKey)) {
                logError(
                  `${this.$vnode.tag}，当前 valueUpdateMode: Pick，当前 cValueUpdateKey ${this.cValueUpdateKey} 并非数组类型`
                )
              } else if (isEqual(pick(selectedOption, this.cValueUpdateKey), pick(newOption, this.cValueUpdateKey))) {
                result.push(newOption)
              }
            })
          })
          break
        case 'None':
          break
        case 'Default':
        default:
          result = currentValues
          break
      }
      return result
    },
    isValueInitialized(currentValue, beforeUpdate) {
      if (beforeUpdate) {
        if (this.valueInitializeMode === 'WhenUndefined' || this.valueInitializeMode === 'OnlyUndefinedBeforeUpdate') {
          if (this.multiple) {
            return isNotEmptyArray(currentValue)
          }
          return currentValue !== undefined
        }
        // this.valueInitializeMode === Once
        return (
          this.valueInitialized ||
          // multiple 模式下，空数组其实也属于未初始化
          (!this.multiple && currentValue !== undefined) ||
          (this.multiple && isNotEmptyArray(currentValue))
        )
      }
      if (this.valueInitializeMode === 'WhenUndefined') {
        if (this.multiple) {
          return currentValue !== undefined && isNotEmptyArray(currentValue)
        }
        return currentValue !== undefined
      }
      return true
    },
  },
}
