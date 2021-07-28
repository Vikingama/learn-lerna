<template>
  <lui-tooltip placement="top" :content="tip" @input="resetTip">
    <lui-icon v-clipboard="value" v-clipboard:success="clipboardSuccessHandler" v-bind="$attrs" icon="copy" />
  </lui-tooltip>
</template>

<script>
  import VClipboard from '../../directive/v-clipboard'
  import LuiIcon from '../../lui/lui-icon'
  import LuiTooltip from '../../lui/lui-tooltip'

  export default {
    name: 'ClipboardIcon',
    components: { LuiIcon, LuiTooltip },
    directives: {
      clipboard: VClipboard,
    },
    props: {
      value: { required: true },
    },
    data() {
      return {
        tip: '点击复制到剪切板',
      }
    },
    methods: {
      clipboardSuccessHandler({ value, event }) {
        this.tip = '已复制到剪切板'
      },
      resetTip(show) {
        if (show) {
          this.tip = '点击复制到剪切板'
        }
      },
    },
  }
</script>
