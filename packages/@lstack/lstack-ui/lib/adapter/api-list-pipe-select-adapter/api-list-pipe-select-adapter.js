import RApiListPipes from '../../render/r-api-list-pipes'
import RListPipesSelect from '../../render/r-list-pipes-select'

export default {
  name: 'ApiListPipeSelectAdapter',
  mixins: [RListPipesSelect, RApiListPipes],
  data() {
    return {
      rlApiRequestOutRenderName: 'rlListPipesInRender',
      rlListPipesOutRenderName: 'luiSelectInRender',
    }
  },
  computed: {
    renderProps() {
      return {
        enableListPagination: this.cSlotScopeProps.enableListPagination,
      }
    },
  },
}
