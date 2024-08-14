<template>
  <el-checkbox-group v-model="cValue">
    <el-checkbox v-for="(option, index) in options" :disabled="optionDisable(option)" :key="index" :label="option">
      <slot :option="option" :index="index" :optionLabel="optionLabel(option)">
        {{ optionLabel(option) }}
      </slot>
    </el-checkbox>
  </el-checkbox-group>
</template>

<script>
  import MultipleSelectable from '../../mixin/multiple-selectable'

  export default {
    name: 'CheckboxGroup',
    mixins: [MultipleSelectable],
  }
</script>
