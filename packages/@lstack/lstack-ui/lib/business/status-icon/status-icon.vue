<template>
  <lui-icon :type="cType" :icon="cIcon" v-bind="$attrs" />
</template>

<script>
  import { isEmpty } from '@lstack/utils'
  import LuiIcon from '../../lui/lui-icon'
  import Statusable, { status2iconMap } from '../../mixin/statusable'

  export default {
    name: 'StatusIcon',
    components: { LuiIcon },
    mixins: [Statusable],
    props: {
      icon: String,
    },
    computed: {
      cIcon() {
        if (!isEmpty(this.icon)) {
          return this.icon
        }
        return status2iconMap[this.cStatus]
      },
    },
  }
</script>
