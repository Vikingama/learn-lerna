import RApiInfoPipes from '../../render/r-api-info-pipes'

export default {
  name: 'ApiInfoPipesAdapter',
  mixins: [RApiInfoPipes],
  data() {
    return {
      rlApiRequestOutRenderName: 'rlInfoPipesInRender',
    }
  },
}
