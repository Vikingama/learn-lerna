import RListPipesSelectFormItem from '../../render/r-list-pipes-select-form-item'

export default {
  name: 'ApiListPipesSelectFormItemAdapter',
  extends: RListPipesSelectFormItem,
  data() {
    return {
      rlListPipesOutRenderName: 'selectFormItemInRender',
    }
  },
  computed: {
    renderProps() {
      return { enableListPagination: this.cSlotScopeProps.enableListPagination }
    },
  },
}
