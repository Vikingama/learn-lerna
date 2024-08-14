import RApiListPipes from '../../render/r-api-list-pipes'
import RListPipesPaginationTable from '../../render/r-list-pipes-pagination-table'

export default {
  name: 'ApiListPipePaginationTableAdapter',
  mixins: [RApiListPipes, RListPipesPaginationTable],
  data() {
    return {
      rlApiRequestOutRenderName: 'rlListPipesInRender',
      rlListPipesOutRenderName: 'paginationTableInRender',
    }
  },
  computed: {
    renderProps() {
      return {
        page: this.cSlotScopeProps.page,
        pageSize: this.cSlotScopeProps.pageSize,
        enableListPagination: this.cSlotScopeProps.enableListPagination,
        listTotal: this.cSlotScopeProps.listTotal,
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
