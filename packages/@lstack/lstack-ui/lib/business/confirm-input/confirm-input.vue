<template>
  <div class="confirm-input">
    <lui-text margin-bottom>
      <span>{{ `输入“ ` }}</span>
      <lui-text inline type="error">{{ keyword }}</lui-text>
      <span>{{ ` ”确认删除。` }}</span>
    </lui-text>
    <lui-input v-model="input" :placeholder="`输入“ ${keyword} ”确认删除。`" />
  </div>
</template>

<script>
  import LuiInput from '../../lui/lui-input'
  import LuiText from '../../lui/lui-text'

  export default {
    name: 'ConfirmInput',
    components: { LuiText, LuiInput },
    props: {
      keyword: { type: String, default: 'DELETE' },
    },
    data() {
      return { input: undefined }
    },
    computed: {
      confirmed() {
        return this.input === this.keyword
      },
    },
    watch: {
      confirmed: {
        immediate: true,
        handler(val) {
          this.$emit('change', val)
        },
      },
    },
  }
</script>
