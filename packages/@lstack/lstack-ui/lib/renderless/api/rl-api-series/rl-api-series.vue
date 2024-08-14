<script>
  import { get } from '@lstack/utils'
  import RlApiGet from '../rl-api-get'

  export default {
    name: 'RlApiSeries',
    extends: RlApiGet,
    props: {
      seriesKeyInResponseBizData: { type: String, default: 'series' },
    },
    data() {
      return {
        series: undefined,
      }
    },
    computed: {
      aSlotScopeProps_get() {
        return {
          series: this.series,
          refresh: this.refresh,
        }
      },
    },
    methods: {
      /**
       * 抽象层对 onResponseChange 的实现，这里主要获取了 series 数据并通过 update 事件对外发布
       * @param newVal 新的 response 对象
       * @param oldVal 老的 response 对象
       */
      aOnResponseChange(newVal, oldVal) {
        this.series = get(this.responseBizData, this.seriesKeyInResponseBizData)
        this.$emit('update', this.series)
      },
    },
  }
</script>
