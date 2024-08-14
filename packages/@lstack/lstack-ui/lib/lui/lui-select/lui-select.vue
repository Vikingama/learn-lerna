<template>
  <el-select
    ref="select"
    v-model="cValue"
    class="lui-select"
    :class="[
      marginTop ? 'lui-select--margin-top' : '',
      marginRight ? 'lui-select--margin-right' : '',
      marginBottom ? 'lui-select--margin-bottom' : '',
      marginLeft ? 'lui-select--margin-left' : '',
      autoWidth ? 'lui-select--auto-width' : '',
    ]"
    :loading="!enableLoadmore ? loading : false"
    :placeholder="placeholder"
    v-bind="$attrs"
    :allow-create="allowCreate"
    :filterable="cFilterable"
    :filter-method="filterMethod"
    :multiple="multiple"
    :value-key="cSelectValueKey"
    @focus="event => $emit('focus', event)"
  >
    <slot name="beforeOptions"></slot>
    <el-option
      v-for="(option, index) in cOptions"
      :key="index"
      :disabled="optionDisable(optionValue(option), option)"
      :label="optionLabel(option)"
      :value="optionValue(option)"
    >
      <slot :option="option" :index="index" :optionLabel="optionLabel(option)" :optionValue="optionValue(option)" />
    </el-option>
    <template v-if="enableLoadmore">
      <slot v-if="$scopedSlots.loadmoreView" name="loadmoreView"></slot>
      <lui-loadmore-view
        v-else
        :loading="loading"
        :is-max-page="isMaxPage"
        :is-load-error="isLoadError"
        :reload-api="reloadApi"
        :loadmore-api="loadmoreApi"
      />
    </template>
    <slot name="afterOptions"></slot>
  </el-select>
</template>

<script>
  import { isFunction, isNotEmptyText } from '@lstack/utils'
  import LuiLoadmoreView from '../lui-loadmore-view'
  import Selectable from '../../mixin/selectable'

  export default {
    name: 'LuiSelect',
    components: { LuiLoadmoreView },
    mixins: [Selectable],
    props: {
      autoWidth: Boolean,
      enableLoadmore: Boolean,
      loading: Boolean,
      isMaxPage: Boolean,
      isLoadError: Boolean,
      reloadApi: Function,
      loadmoreApi: Function,
      placeholder: String,
      marginTop: Boolean,
      marginRight: Boolean,
      marginBottom: Boolean,
      marginLeft: Boolean,
      filterable: Boolean,
      allowCreate: Boolean,
      filterMethod: Function,
      optionCreateMethod: Function,
    },
    data() {
      return {
        createdOptions: [],
      }
    },
    computed: {
      cFilterable() {
        if (this.filterable) {
          return this.filterable
        }
        return this.cOptions.length > 10
      },
    },
    mounted() {
      if (this.allowCreate) {
        this.$refs.select.$el.addEventListener('keydown', this.handleKeydown, true)
      }
    },
    beforeDestroy() {
      // 销毁事件
      if (this.allowCreate) {
        this.$refs.select.$el.removeEventListener('keydown', this.handleKeydown, true)
      }
    },
    methods: {
      // key enter 事件拦截 获取自定义输入值
      handleKeydown(event) {
        if (event && event.keyCode === 13) {
          const inputValue = this.$refs.select.$refs.reference.value
          if (isNotEmptyText(inputValue)) {
            this.$emit('onOpenOptionCreated', inputValue)
            this.$emit('onKeyEnterDown', inputValue, this.options, this.createdOptions)

            let createdOption
            if (isFunction(this.optionCreateMethod)) {
              createdOption = this.optionCreateMethod(inputValue, this.options, this.createdOptions)
            } else {
              createdOption = inputValue
            }
            if (this.multiple) {
              // TODO: multiple 时不生效，定位为 inputValue 为空，改 bug 后续处理 by 吴斌
              this.createdOptions.push(createdOption)
              setTimeout(() => {
                this.cValue.push(this.optionValue(createdOption))
              })
            } else if (createdOption !== undefined) {
              this.$set(this.createdOptions, 0, createdOption)
              setTimeout(() => {
                this.cValue = this.optionValue(createdOption)
              })
            }

            this.$children[0].blur()
          }
          event.stopPropagation()
        }
      },
    },
  }
</script>
<style lang="scss">
  .lui-select--margin-left {
    margin-left: 8px;
  }
  .lui-select--margin-right {
    margin-right: 8px;
  }
  .lui-select--margin-top {
    margin-top: 12px;
  }
  .lui-select--margin-bottom {
    margin-bottom: 12px;
  }
  .lui-select--auto-width {
    .el-input {
      width: auto;
    }
  }
</style>
