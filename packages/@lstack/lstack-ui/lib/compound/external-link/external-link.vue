<template>
  <lui-link
    v-show="isNotEmptyText(text)"
    v-bind="$attrs"
    :text="text"
    :to="to"
    external
    class="external-link"
    :icon="!stateful ? 'el-icon-link' : undefined"
  >
    <slot></slot>
    <lui-icon v-if="stateful" slot="icon" icon="el-icon-link" size="xs" margin-left />
  </lui-link>
</template>

<script>
  import { isNotEmptyText } from '@lstack/utils'
  import LuiLink from '../../lui/lui-link'
  import LuiIcon from '../../lui/lui-icon'

  export default {
    name: 'ExternalLink',
    components: { LuiLink, LuiIcon },
    props: {
      text: [String, Number],
      to: [String, Object],
      // 有状态的外链，外链图标在后面
      stateful: Boolean,
    },
    methods: {
      isNotEmptyText,
    },
  }
</script>
