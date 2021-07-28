<template>
  <div class="file-input">
    <input
      ref="input"
      style="display: none; z-index: -9999"
      class="file-input__hide-input"
      type="file"
      :accept="accept"
      @change="onFileInputChange"
    />
    <slot :loading="loading" :input-file="inputFile" />
  </div>
</template>

<script>
  import { isFunction } from '@lstack/utils'
  import Emitter from '../../mixin/emitter'

  export default {
    name: 'RlFileInput',
    mixins: [Emitter],
    props: {
      validateEvent: { type: Boolean, default: true },
      beforeFileInput: Function,
      accept: String,
      typeReadAs: {
        type: String,
        default: 'Text',
        validator(val) {
          return ['ArrayBuffer', 'BinaryString', 'DataURL', 'Text'].indexOf(val) !== -1
        },
      },
      value: {},
    },
    data() {
      return { loading: false }
    },
    methods: {
      inputFile() {
        this.$refs.input.click()
      },
      onFileInputChange(e) {
        const { files } = e.target
        const rawFile = files[0] // only use files[0]
        if (!rawFile) return

        this.$refs.input.value = null // 修复不能选取相同文件的问题

        if (!isFunction(this.beforeFileInput)) {
          this.doRead(rawFile)
        } else if (this.beforeFileInput(rawFile)) {
          this.doRead(rawFile)
        }
      },
      doRead(rawFile) {
        this.loading = true
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = ev => {
            this.loading = false
            const data = ev.target.result
            this.$emit('input', data)
            if (this.validateEvent) {
              this.dispatch('ElFormItem', 'el.form.change', data)
            }
            resolve()
          }
          reader.onabort = () => {
            this.loading = false
            reject()
          }
          reader.onerror = () => {
            this.loading = false
            reject()
          }
          switch (this.typeReadAs) {
            case 'Text':
              reader.readAsText(rawFile)
              break
            case 'ArrayBuffer':
              reader.readAsArrayBuffer(rawFile)
              break
            case 'BinaryString':
              reader.readAsBinaryString(rawFile)
              break
            case 'DataURL':
              reader.readAsDataURL(rawFile)
              break
            default:
              break
          }
        })
      },
    },
  }
</script>
