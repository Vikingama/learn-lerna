import RListPipesSelectableButton from '../../render/r-list-pipes-selectable-button'

export default {
  name: 'ApiListPipesSelectableButtonAdapter',
  extends: RListPipesSelectableButton,
  data() {
    return {
      rlListPipesOutRenderName: 'selectableButtonInRender',
    }
  },
  computed: {
    renderProps() {
      return { enableListPagination: this.cSlotScopeProps.enableListPagination }
    },
  },
}
