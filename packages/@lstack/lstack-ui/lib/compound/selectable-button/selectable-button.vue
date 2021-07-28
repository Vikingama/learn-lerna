<template>
  <el-radio-group v-model="cValue" class="selectable-button" :class="[marginBottom ? 'is-margin-bottom' : '']">
    <lui-tooltip
      v-for="(option, index) in options"
      :key="index"
      placement="top"
      :content="optionDisabledTip(optionValue(option), option)"
      :disabled="!optionDisable(optionValue(option), option) || !optionDisabledTip(optionValue(option), option)"
    >
      <el-radio-button :disabled="optionDisable(optionValue(option), option)" :label="optionValue(option)">
        <slot :option="option" :index="index" :optionLabel="optionLabel(option)" :optionValue="optionValue(option)">
          {{ optionLabel(option) }}
        </slot>
      </el-radio-button>
    </lui-tooltip>
  </el-radio-group>
</template>

<script>
  import Selectable from '../../mixin/selectable'
  import LuiTooltip from '../../lui/lui-tooltip'

  export default {
    name: 'SelectableButton',
    components: { LuiTooltip },
    mixins: [Selectable],
    props: {
      loading: Boolean,
      marginBottom: Boolean,
    },
  }
</script>
<style lang="scss">
  .selectable-button {
    &.is-margin-bottom .el-radio-button {
      margin-bottom: 4px;
    }

    .el-radio-button {
      .el-radio-button__inner {
        margin-left: -1px;
        min-width: 70px;
        border-left: 1px solid #dddddd;
      }
    }
  }
</style>
