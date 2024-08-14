<template>
  <rl-list-edit
    ref="editList"
    :value="value"
    :before-edit="beforeEdit"
    :before-insert="beforeInsert"
    :before-add="beforeAdd"
    :before-remove="beforeRemove"
    :before-reset="beforeReset"
    :init-value="initValue"
    :empty-item="emptyItem"
    v-on="$listeners"
  >
    <template #default="listEditProps">
      <lui-table v-bind="$attrs" :keys="keys" :kv-map="kvMap" :data="listEditProps.editList">
        <slot v-bind="listEditProps" />
        <el-table-column #default="{ $index, row }" :width="operateColumnWidth" label="操作">
          <slot name="actions" v-bind="listEditProps" :index="$index" :row="row" />
          <lui-tooltip
            :disabled="deletable(listEditProps.listLength, row) || !cUnDeletableTip(listEditProps.listLength, row)"
            :hide-after="2000"
            :open-delay="300"
            :content="cUnDeletableTip(listEditProps.listLength, row)"
            placement="top"
            :enterable="false"
          >
            <lui-link
              :disabled="!deletable(listEditProps.listLength, row)"
              :underline="false"
              text="删除"
              @click="() => listEditProps.remove($index)"
            />
          </lui-tooltip>
        </el-table-column>
        <template #append>
          <slot name="append" v-bind="listEditProps">
            <lui-link :underline="false" @click="listEditProps.add">添加</lui-link>
          </slot>
        </template>
      </lui-table>
    </template>
  </rl-list-edit>
</template>

<script>
  import RlListEdit from '../../renderless/rl-list-edit'
  import LuiTable from '../../lui/lui-table'
  import LuiLink from '../../lui/lui-link'
  import { isFunction } from '@lstack/utils'

  export default {
    name: 'EditableTable',
    components: { RlListEdit, LuiTable, LuiLink },
    props: {
      operateColumnWidth: { type: String, default: '140px' },
      value: Array,
      // 返回值为 true 表示继续
      beforeEdit: Function,
      beforeInsert: Function,
      beforeAdd: Function,
      beforeRemove: Function,
      beforeReset: Function,
      deletable: { type: Function, default: (listLength, listItem) => true },
      initValue: Boolean,
      unDeletableTip: [String, Function],
      kvMap: Object,
      keys: Array,
      emptyItem: {},
    },
    methods: {
      reset() {
        this.$refs.editList.reset()
      },
      cUnDeletableTip(listLength, listItem) {
        if (isFunction(this.unDeletableTip)) {
          return this.unDeletableTip(listLength, listItem)
        }
        return this.unDeletableTip
      },
    },
  }
</script>
