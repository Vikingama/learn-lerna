<template>
  <lui-card v-bind="{ ...$attrs, ...$props }" size="middle">
    <template v-if="$scopedSlots.headerActions" #headerActions>
      <slot name="headerActions" />
    </template>
    <el-form label-position="left" :label-width="labelWidth">
      <slot name="info">
        <lui-row :gutter="20">
          <lui-col v-if="isNotEmptyArray(keys)" :span="isNotEmptyArray(subKeys) ? 10 : 24">
            <lui-form-item v-for="(key, index) in keys" :key="index" :no-margin="index === 0" :label="kvMap[key]">
              <slot name="infoItemValue" v-bind="{ key, index, kvMap, info }">
                <lui-text inline>
                  {{ info[key] }}
                </lui-text>
              </slot>
            </lui-form-item>
          </lui-col>
          <lui-col v-if="isNotEmptyArray(subKeys)" :span="14">
            <lui-form-item v-for="(key, index) in subKeys" :key="index" :no-margin="index === 0" :label="kvMap[key]">
              <slot name="infoItemValue" v-bind="{ key, index, kvMap, info }">
                <lui-text inline>
                  {{ info[key] }}
                </lui-text>
              </slot>
            </lui-form-item>
          </lui-col>
        </lui-row>
      </slot>
    </el-form>
  </lui-card>
</template>

<script>
  import { isNotEmptyArray } from '@lstack/utils'
  import LuiText from '../../lui/lui-text'

  export default {
    name: 'InfoCard',
    components: { LuiText },
    props: {
      info: { type: Object, default: () => ({}) },
      kvMap: Object,
      keys: Array,
      subKeys: Array,

      title: String,
      titleTip: String,
      showDivider: Boolean,
      collapsable: Boolean,
      loading: Boolean,
      theme: {
        type: String,
        default: 'light',
        validator(val) {
          return ['none', 'light', 'dark'].indexOf(val) !== -1
        },
      },
      marginTop: Boolean,
      marginRight: Boolean,
      marginBottom: Boolean,
      marginLeft: Boolean,
      labelWidth: { type: String, default: '100px' },
    },
    methods: {
      isNotEmptyArray,
    },
  }
</script>
