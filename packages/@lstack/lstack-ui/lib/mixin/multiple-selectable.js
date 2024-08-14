import {
  contains,
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
  name: 'MultipleSelectable',
  props: {
    value: { type: Array, required: true, default: () => [] },
    // 用于判断 option 是否为 disable 的函数，入参为 option，返回是否 disable 的结果
    optionDisable: { type: Function, default: (optionValue, option) => false },
    options: { type: Array, default: () => [] },
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
    // 在 WhenEmpty 模式下，无论是在触发 valueUpdate 前后，只要 value 为 undefined 都会按照 valueInitializeApi 的逻辑进行 value 的初始化
    // 在 OnlyEmptyBeforeUpdate 模式下，由触发 valueUpdate 导致的 value 为 undefined 不会执行 valueInitializeApi 的初始化逻辑
    // 在 Once 模式下，valueInitializeApi 成功执行过一次后不会再执行
    valueInitializeMode: {
      type: String,
      default: 'OnlyEmptyBeforeUpdate',
      validator(val) {
        return ['WhenEmpty', 'OnlyEmptyBeforeUpdate', 'Once'].indexOf(val) !== -1
      },
    },
    optionPropertiesBackupKeys: [String, Array],
    // 约定由 optionPropertiesBackupApi 备份字段后返回的对象必须与源数据对象是同一对象
    optionPropertiesBackupApi: Function,
    watchOnlyNotEqual: Boolean,
    clearValueBeforeDestroy: Boolean,
  },
  data() {
    return {
      valueInitialized: false,
      optionsImmediateWatched: false,
      unselectedOptions: [],
    }
  },
  computed: {
    cValue: {
      get() {
        return this.value
      },
      set(newVal) {
        const oldVal = this.value
        this.$emit('input', newVal, oldVal)
        this.$emit('change', newVal, oldVal)
      },
    },
    cOptionLabelKey() {
      return !isEmpty(this.optionLabelKey) ? this.optionLabelKey : this.cSelectValueKey
    },
    cValueUpdateKey() {
      return !isEmpty(this.valueUpdateKey) ? this.valueUpdateKey : this.cSelectValueKey
    },
    cSelectValueKey() {
      return isNotEmptyText(this.selectValueKey) ? this.selectValueKey : undefined
    },
    needBackupOptionProperties() {
      return !isEmpty(this.optionPropertiesBackupKeys) || isFunction(this.optionPropertiesBackupApi)
    },
  },
  watch: {
    options: {
      immediate: true,
      handler(newOptions, oldOptions) {
        if (this.watchOnlyNotEqual && isEqual(newOptions, oldOptions)) return

        if (this.needBackupOptionProperties) {
          if (isNotEmptyText(this.cSelectValueKey)) {
            if (isNotEmptyArray(oldOptions) && isNotEmptyArray(newOptions)) {
              oldOptions.forEach(oldOption => {
                newOptions.forEach(newOption => {
                  const newOptionKeyValue = get(newOption, this.cSelectValueKey, undefined)
                  const oldOptionKeyValue = get(oldOption, this.cSelectValueKey, undefined)

                  if (!isEmpty(newOptionKeyValue) && !isEmpty(oldOptionKeyValue)) {
                    if (newOptionKeyValue === oldOptionKeyValue) {
                      this.optionPropertiesBackup(newOption, oldOption)
                    }
                  } else {
                    logError(
                      `cSelectValueKey = ${this.cSelectValueKey}，newOptionKeyValue = ${newOptionKeyValue}，oldOptionKeyValue = ${oldOptionKeyValue}，请正确指定 selectValueKey 作为 option 对象的唯一值索引 key，确保对象唯一性。`
                    )
                  }
                })
              })
            }
          } else {
            logError(
              `如果你希望备份 option 的部分属性，需要 selectValueKey 作为 option 对象的唯一值索引 key，同时需要注意的是 option 需为对象`
            )
          }
        }

        const currentValue = this.cValue
        let updatedValue
        this.valueInitialized = this.isValueInitialized(currentValue, true)
        if (this.valueInitialized) {
          if (this.valueUpdateImmediate || this.optionsImmediateWatched) {
            updatedValue = this.getUpdatedValue(newOptions, currentValue)
            if (
              !this.isValueInitialized(updatedValue, false) &&
              isFunction(this.valueInitializeApi) &&
              isNotEmptyArray(newOptions)
            ) {
              updatedValue = this.valueInitializeApi(newOptions, this.cSelectValueKey)
            }
            if (!isEqual(updatedValue, currentValue)) {
              this.cValue = updatedValue
            }
          }
        } else if (isFunction(this.valueInitializeApi) && isNotEmptyArray(newOptions)) {
          updatedValue = this.valueInitializeApi(newOptions, this.cOptionValueKey)
          if (isNotEmptyArray(updatedValue)) {
            this.cValue = updatedValue
          }
        }
        this.unselectedOptions = this.getUpdatedUnselectedOptions(newOptions, updatedValue)
        this.optionsImmediateWatched = true
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
  beforeDestroy() {
    if (this.clearValueBeforeDestroy) {
      this.cValue = []
    }
  },
  methods: {
    get,
    optionLabel(option) {
      let label
      if (isNotEmptyText(option)) {
        label = option
      } else {
        label = isNotEmptyText(this.cOptionLabelKey) ? get(option, this.cOptionLabelKey, undefined) : option
      }
      if (isFunction(this.labelMapApi)) {
        label = this.labelMapApi(label)
      } else if (isObject(this.labelMapApi) || isArray(this.labelMapApi)) {
        label = this.labelMapApi[label]
      }
      return label
    },
    getUpdatedUnselectedOptions(newOptions, selectedOptions) {
      if (!isArray(newOptions)) return []
      if (!isArray(selectedOptions)) return [...newOptions]
      if (isEmptyArray(newOptions)) return []
      if (isEmptyArray(selectedOptions)) return [...newOptions]
      return newOptions.filter(newOption => {
        // 约定由 optionPropertiesBackupApi 备份字段后返回的对象必须与源数据对象是同一对象
        return !contains(selectedOptions, newOption, 'KeySame')
      })
    },
    getUpdatedValue(newOptions, selectedOptions) {
      if (!isArray(newOptions) || !isArray(selectedOptions)) return []
      if (isEmptyArray(newOptions)) return []
      if (isEmptyArray(selectedOptions)) return selectedOptions

      let result = []
      switch (this.valueUpdateMode) {
        case 'Equal':
          selectedOptions.forEach(selectedOption => {
            newOptions.forEach(newOption => {
              if (isEqual(selectedOption, newOption)) {
                result.push(newOption)
              }
            })
          })
          break
        case 'Same':
          selectedOptions.forEach(selectedOption => {
            newOptions.forEach(newOption => {
              if (selectedOption === newOption) {
                result.push(newOption)
              }
            })
          })
          break
        case 'KeyEqual':
          selectedOptions.forEach(selectedOption => {
            newOptions.forEach(newOption => {
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
          selectedOptions.forEach(selectedOption => {
            newOptions.forEach(newOption => {
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
          selectedOptions.forEach(selectedOption => {
            newOptions.forEach(newOption => {
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
          result = selectedOptions
          break
      }
      return result
    },
    isValueInitialized(currentValue, beforeUpdate) {
      if (beforeUpdate) {
        if (this.valueInitializeMode === 'WhenEmpty' || this.valueInitializeMode === 'OnlyEmptyBeforeUpdate') {
          return isNotEmptyArray(currentValue)
        }
        // this.valueInitializeMode === Once
        return this.valueInitialized || isNotEmptyArray(currentValue)
      }
      if (this.valueInitializeMode === 'WhenEmpty') {
        return isNotEmptyArray(currentValue)
      }
      return true
    },
    optionPropertiesBackup(newVal, oldVal) {
      let keys
      if (isNotEmptyText(this.optionPropertiesBackupKeys)) {
        keys = [this.optionPropertiesBackupKeys]
      } else if (isNotEmptyArray(this.optionPropertiesBackupKeys)) {
        keys = [...this.optionPropertiesBackupKeys]
      }

      if (isNotEmptyArray(keys)) {
        keys.forEach(key => {
          this.$set(newVal, key, get(oldVal, key))
        })
      }

      if (isFunction(this.optionPropertiesBackupApi)) {
        const result = this.optionPropertiesBackupApi(newVal, oldVal)
        if (result !== newVal) {
          logError(
            `经过 optionPropertiesBackupApi 进行属性备份后，更新对象已被替换，及返回对象并非传入的源对象，备份逻辑将不会生效。如需进行属性备份，请确保返回值与 optionPropertiesBackupApi 形参 newVal 是同一对象，及直接对 newVal 进行编辑。`
          )
        }
      }
      return newVal
    },
  },
}
