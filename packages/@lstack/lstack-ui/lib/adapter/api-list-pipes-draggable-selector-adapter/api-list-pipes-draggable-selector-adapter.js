import RListPipesDraggableSelector from '../../render/r-list-pipes-draggable-selector'

export default {
  name: 'ApiListPipesDraggableSelectorAdapter',
  extends: RListPipesDraggableSelector,
  data() {
    return {
      rlListPipesOutRenderName: 'draggableSelectorInRender',
    }
  },
  computed: {
    renderProps() {
      return { enableListPagination: this.cSlotScopeProps.enableListPagination }
    },
  },
}
