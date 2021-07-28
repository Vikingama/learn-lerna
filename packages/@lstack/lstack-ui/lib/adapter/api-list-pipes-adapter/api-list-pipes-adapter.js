import RApiListPipes from '../../render/r-api-list-pipes'

export default {
  name: 'ApiListPipesAdapter',
  mixins: [RApiListPipes],
  data() {
    return {
      rlApiRequestOutRenderName: 'rlListPipesInRender',
    }
  },
  computed: {
    renderProps() {
      return { enableListPagination: this.cSlotScopeProps.enableListPagination }
    },
  },
}
