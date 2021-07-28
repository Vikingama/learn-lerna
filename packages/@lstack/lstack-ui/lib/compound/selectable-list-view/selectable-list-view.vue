<template>
  <lui-list-view #default="{ index, listItem }" v-loading="loading" class="selectable-list-view" :list="options">
    <slot
      :option="listItem"
      :optionValue="optionValue(listItem)"
      :index="index"
      :isActive="isActive(listItem)"
      :isDisabled="optionDisable(listItem)"
      :handleSelect="() => handleClick(optionValue(listItem), listItem, index)"
    />
  </lui-list-view>
</template>

<script>
  import { isEqual } from '@lstack/utils'
  import Selectable from '../../mixin/selectable'
  import LuiListView from '../../lui/lui-list-view'

  export default {
    name: 'SelectableListView',
    components: { LuiListView },
    mixins: [Selectable],
    props: {
      loading: Boolean,
      marginBottom: Boolean,
    },
    methods: {
      handleClick(optionValue, option, index) {
        if (!this.optionDisable(option)) {
          this.cValue = optionValue
        }
      },
      isActive(listItem) {
        return isEqual(this.optionValue(listItem), this.cValue)
      },
    },
  }
</script>
