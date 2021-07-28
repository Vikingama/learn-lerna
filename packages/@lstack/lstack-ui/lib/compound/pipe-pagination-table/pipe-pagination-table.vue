<script>
  import RlListPipes from '../../renderless/pipe/list/rl-list-pipes'
  import RListPipesPaginationTable from '../../render/r-list-pipes-pagination-table'

  export default {
    name: 'PipePaginationTable',
    extends: RlListPipes,
    mixins: [RListPipesPaginationTable],
    props: {
      loading: Boolean,
      reloadApi: Function,
      listTotal: Number,
      enableListPagination: Boolean,
    },
    data() {
      return {
        rlListPipesOutRenderName: 'paginationTableInRender',
      }
    },
    computed: {
      renderProps() {
        return {
          loading: this.loading,
          reloadApi: this.reloadApi,
          listTotal: this.listTotal,
          enableListPagination: this.enableListPagination,
        }
      },
      renderListeners() {
        return {
          'update:page': val => this.$emit('update:page', val),
          'update:pageSize': val => this.$emit('update:pageSize', val),
        }
      },
    },
  }
</script>
