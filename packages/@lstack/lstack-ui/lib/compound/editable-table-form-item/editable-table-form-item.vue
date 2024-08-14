<template>
  <el-form-item :label="label">
    <rl-list-edit v-bind="$attrs" v-on="$listeners">
      <template #default="listEditProps">
        <lui-table :data="listEditProps.editList">
          <template #default="tableProps">
            <slot v-bind="{ ...tableProps, ...listEditProps }"></slot>
            <table-column-form-item #default="{ $index }" label="操作">
              <el-link @click="() => listEditProps.remove($index)">删除</el-link>
            </table-column-form-item>
          </template>
          <template #append>
            <el-link @click="listEditProps.add">添加</el-link>
          </template>
        </lui-table>
      </template>
    </rl-list-edit>
  </el-form-item>
</template>

<script>
  import TableColumnFormItem from '../table-column-form-item'
  import RlListEdit from '../../renderless/rl-list-edit'
  import LuiTable from '../../lui/lui-table'

  export default {
    name: 'EditableTableFormItem',
    components: { RlListEdit, LuiTable, TableColumnFormItem },
    model: { prop: 'list', event: 'change' },
    props: {
      label: String,
    },
  }
</script>
