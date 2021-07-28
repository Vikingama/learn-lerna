<script>
  import RlListPipes from '../../renderless/pipe/list/rl-list-pipes'
  import RListPipesSelect from '../../render/r-list-pipes-select'

  export default {
    name: 'PipeSelect',
    extends: RlListPipes,
    mixins: [RListPipesSelect],
    props: {
      loading: Boolean,
      reloadApi: Function,
    },
    data() {
      return {
        rlListPipesOutRenderName: 'luiSelectInRender',
      }
    },
    computed: {
      renderProps() {
        return {
          loading: this.loading,
          reloadApi: this.reloadApi,
        }
      },
    },
  }
</script>
