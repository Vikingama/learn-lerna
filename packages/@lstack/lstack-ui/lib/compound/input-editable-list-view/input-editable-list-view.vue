<template>
  <editable-list-view :value="value" v-bind="$attrs" v-on="$listeners">
    <template #default="{ listItem, editList, add, remove, index, replace }">
      <lui-form-item :no-margin="index === 0">
        <lui-input slot="valid" :value="listItem" @input="val => replace(val)" />
        <lui-link :underline="false" type="default" margin-left text="移除" @click="remove" />
      </lui-form-item>
    </template>
    <template #afterListView="{ add }">
      <lui-link :underline="false" text="添加" @click="add" />
    </template>
  </editable-list-view>
</template>

<script>
  import EditableListView from '../editable-list-view'
  import BaseFormItemListView from '../../base/base-form-item-list-view'

  export default {
    name: 'InputEditableListView',
    components: { EditableListView },
    extends: BaseFormItemListView,
  }
</script>
i
