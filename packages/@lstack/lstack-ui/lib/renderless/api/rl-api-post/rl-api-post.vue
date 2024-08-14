<script>
  import { isNotEmptyObject, isFunction, logError } from '@lstack/utils'
  import RlApiRequest from '../rl-api-request'

  export default {
    name: 'RlApiPost',
    extends: RlApiRequest,
    props: {
      requestMethod: {
        type: String,
        default: 'POST',
        validator(val) {
          return ['POST', 'Post', 'post'].indexOf(val) !== -1
        },
      },
      autoCancelBeforeDestroy: { type: Boolean, default: false },
      autoCancelWhenRepeated: { type: Boolean, default: false },
      formInstance: Object,
      onFormValidFailed: Function,
    },
    data() {
      return {
        formData: undefined,
        formRules: undefined,
        // 定义 formData 转换成 requestBody 之后的暂存变量，避免 computed 的自动计算，应该由 post 时在 formData 校验成功后的一次性计算
        computedRequestBody: undefined,
      }
    },
    computed: {
      aRequestBody: {
        set(val) {
          this.computedRequestBody = val
        },
        get() {
          return this.computedRequestBody
        },
      },
      aAutoRequestConfig() {
        return {
          enable: false,
          query: { enable: false, ignoreKeys: ['searchKey', 'searchValue'], matchMode: 'Equal' }, // Equal, Same
          paths: { enable: false, ignoreKeys: [], matchMode: 'Equal' }, // Equal, Same
          url: { enable: false, ignoreKeys: [], matchMode: 'Equal' }, // Equal, Same
          body: { enable: false, ignoreKeys: [], matchMode: 'Equal' }, // Equal, Same
          // config: false,
        }
      },
      aSlotScopeProps() {
        return {
          post: this.post,
          formRules: this.formRules,
          formData: this.formData,
          resetFields: this.resetFields,
          clearValidate: this.clearValidate,
          validate: this.validate,
          validateField: this.validateField,
          form2bodyApi: this.cForm2bodyApi,
        }
      },
      mHasFormInstance() {
        return isNotEmptyObject(this.formInstance)
      },
    },
    methods: {
      post() {
        return this.request()
      },
      /**
       * @param formData 表单数据
       * @returns {undefined}
       */
      iForm2bodyApi(formData) {
        return undefined
      },
      aForm2bodyApi(formData) {
        return formData
      },
      cForm2bodyApi(formData) {
        const iBody = this.iForm2bodyApi(formData)
        return iBody !== undefined ? iBody : this.aForm2bodyApi(formData)
      },
      aRequestBodyValid() {
        const validSucceeded = this.validate()
        if (validSucceeded) {
          this.aRequestBody = this.cForm2bodyApi(this.formData)
        }
        return validSucceeded
      },
      resetFields() {
        if (this.mHasFormInstance) {
          return this.formInstance.resetFields()
        }
        return undefined
      },
      clearValidate(props = []) {
        if (this.mHasFormInstance) {
          return this.formInstance.clearValidate(props)
        }
        return undefined
      },
      validate(callback) {
        const handle = this.mHasFormInstance ? this.formInstance.validate : undefined
        if (!isFunction(handle)) return true
        let succeeded = false
        handle(valid => {
          succeeded = !!valid
          if (isFunction(callback)) {
            callback(valid)
          }
          if (!succeeded && isFunction(this.onFormValidFailed)) {
            this.onFormValidFailed()
          }
        })
        return succeeded
      },
      validateField(props, callback) {
        const handle = this.mHasFormInstance ? this.formInstance.validateField : undefined
        if (!isFunction(handle)) return true
        let succeeded = false
        handle(props, errMsg => {
          succeeded = !errMsg
          if (isFunction(callback)) {
            callback(errMsg)
          }
          if (!succeeded && isFunction(this.onFormValidFailed)) {
            this.onFormValidFailed()
          }
        })
        return succeeded
      },
    },
  }
</script>
