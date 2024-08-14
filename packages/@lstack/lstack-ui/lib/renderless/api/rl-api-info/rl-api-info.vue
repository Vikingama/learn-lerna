<script>
  import { get } from '@lstack/utils'
  import RlApiGet from '../rl-api-get'

  export default {
    name: 'RlApiInfo',
    extends: RlApiGet,
    props: {
      infoKeyInResponseBizData: String,
    },
    data() {
      return {
        info: undefined,
      }
    },
    computed: {
      aSlotScopeProps_get() {
        return {
          info: this.info,
        }
      },
    },
    methods: {
      /**
       * 抽象层对 ResponseChange 实现，这里主要获取了 series 数据并通过 update 事件对外发布
       * @param newVal 新的 response 对象的回调
       * @param oldVal 老的 response 对象的回调
       */
      aOnResponseChange(newVal, oldVal) {
        this.info = this.infoKeyInResponseBizData
          ? get(this.responseBizData, this.infoKeyInResponseBizData)
          : this.responseBizData
        this.$emit('update', this.info)
      },
    },
  }
</script>
