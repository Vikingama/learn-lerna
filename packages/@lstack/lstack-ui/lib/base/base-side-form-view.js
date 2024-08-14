import { deepCopy } from '@lstack/utils'
import BaseFormView from './base-form-view'

export default {
  name: 'BaseSideFormView',
  extends: BaseFormView,
  props: {
    action: {
      type: String,
      default: 'Create',
      validator(val) {
        return ['Create', 'Update'].indexOf(val) !== -1
      },
    },
    info: Object,
  },
  data() {
    let formData
    if (this.action === 'Update') {
      formData = deepCopy(this.info)
    }

    return {
      formData,
      formRules: undefined,
    }
  },
  methods: {
    emitEventAndCloseAfterValid() {
      this.$refs.formPage.formInstance.validate(valid => {
        if (valid) {
          if (this.action === 'Update') {
            this.$emit('updated', this.formData)
          } else if (this.action === 'Create') {
            this.$emit('created', this.formData)
          }
          this.$refs.formPage.close()
        }
      })
    },
  },
}
