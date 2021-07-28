<template>
  <lui-tip-icon v-bind="$attrs" icon="infomation">
    <template #tip>
      <lui-text v-for="key in keys" :key="key" theme="none" :text="`${kvMap[key]}：${info[key]}`" />
    </template>
  </lui-tip-icon>
</template>

<script>
  import LuiText from '../../lui/lui-text'
  import LuiTipIcon from '../../lui/lui-tip-icon'

  export default {
    name: 'InfoTipIcon',
    components: { LuiTipIcon, LuiText },
    props: {
      info: { type: Object, default: () => ({}) },
      kvMap: { type: Object, default: () => ({}) },
      keys: { type: Array, default: () => [] },
    },
  }
</script>
