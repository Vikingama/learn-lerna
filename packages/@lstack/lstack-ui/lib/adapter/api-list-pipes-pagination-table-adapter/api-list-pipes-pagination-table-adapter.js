import RListPipesPaginationTable from '../../render/r-list-pipes-pagination-table'

export default {
  name: 'ApiListPipesPaginationTableAdapter',
  extends: RListPipesPaginationTable,
  data() {
    return {
      rlListPipesOutRenderName: 'paginationTableInRender',
    }
  },
  computed: {
    renderProps() {
      return {
        page: this.cSlotScopeProps.page,
        pageSize: this.cSlotScopeProps.pageSize,
        listTotal: this.cSlotScopeProps.listTotal,
        enableListPagination: this.cSlotScopeProps.enableListPagination,
      }
    },
    renderListeners() {
      return {
        'update:page': this.updatePage,
        'update:pageSize': this.updatePageSize,
      }
    },
  },
}
