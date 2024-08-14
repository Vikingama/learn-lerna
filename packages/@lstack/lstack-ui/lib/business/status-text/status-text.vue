<template>
  <lui-text :type="cType" :text="cText" v-bind="$attrs" />
</template>

<script>
  import { isEmpty } from '@lstack/utils'
  import LuiText from '../../lui/lui-text'
  import Statusable, { status2textMap } from '../../mixin/statusable'

  export default {
    name: 'StatusText',
    components: { LuiText },
    mixins: [Statusable],
    props: {
      text: String,
    },
    computed: {
      cText() {
        if (!isEmpty(this.text)) {
          return this.text
        }

        return status2textMap[this.cStatus] || this.cStatus
      },
    },
  }
</script>
