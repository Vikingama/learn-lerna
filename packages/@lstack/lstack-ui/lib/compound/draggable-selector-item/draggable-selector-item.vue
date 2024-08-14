<template>
  <div class="draggable-selector-item">
    <lui-row :gutter="20">
      <lui-col v-if="isNotEmptyArray(keys)" :span="10">
        <lui-row v-if="highlightKey">
          <lui-text :text="info[highlightKey]" />
        </lui-row>
        <lui-row v-for="(key, index) in keys" :key="index">
          <slot name="optionItem" :k="key" :value="info[key]" :info="info">
            <lui-label :label="`${kvMap[key]}:${info[key]}`" />
          </slot>
        </lui-row>
      </lui-col>
      <lui-col v-if="isNotEmptyArray(subKeys)" :span="14">
        <lui-row v-for="(key, index) in subKeys" :key="index">
          <slot name="optionItem" :k="key" :value="info[key]" :info="info">
            <lui-label :label="`${kvMap[key]}:${info[key]}`" />
          </slot>
        </lui-row>
      </lui-col>
    </lui-row>
    <slot :info="info" :kvMap="kvMap" />
  </div>
</template>

<script>
  import { isNotEmptyArray } from '@lstack/utils'
  import LuiLabel from '../../lui/lui-label'
  import LuiCol from '../../lui/lui-col'
  import LuiRow from '../../lui/lui-row'

  export default {
    name: 'DraggableSelectorItem',
    components: { LuiLabel, LuiCol, LuiRow },
    props: {
      info: { type: Object, default: () => ({}) },
      kvMap: Object,
      highlightKey: String,
      keys: Array,
      subKeys: Array,
    },
    methods: {
      isNotEmptyArray,
    },
  }
</script>
<style lang="scss">
  .draggable-selector-item {
    text-align: left;
    line-height: 1.5;
    padding: 8px 12px;
  }
</style>
