<template>
  <el-input class="search-input" v-bind="$attrs" v-on="{ ...$listeners }" @keyup.enter.native="handleSearchAction">
    <i slot="suffix" class="el-icon-search el-input__icon" @click="handleSearchAction"></i>
  </el-input>
</template>
<script>
  import { isFunction } from '@lstack/utils'

  export default {
    name: 'SearchInput',
    props: {
      searchAction: Function,
    },
    methods: {
      handleSearchAction() {
        if (isFunction(this.searchAction)) {
          return this.searchAction()
        }
        return undefined
      },
    },
  }
</script>
