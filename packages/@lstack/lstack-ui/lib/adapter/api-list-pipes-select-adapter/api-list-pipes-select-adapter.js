import RListPipesSelect from '../../render/r-list-pipes-select'

export default {
  name: 'ApiListPipesSelectAdapter',
  extends: RListPipesSelect,
  data() {
    return {
      rlListPipesOutRenderName: 'luiSelectInRender',
    }
  },
  computed: {
    renderProps() {
      return { enableListPagination: this.cSlotScopeProps.enableListPagination }
    },
  },
}
