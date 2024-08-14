<script>
  import { isFunction } from '@lstack/utils'
  import RlApiRequest from '../rl-api-request'

  export default {
    name: 'RlApiDelete',
    extends: RlApiRequest,
    props: {
      beforeDelete: Function,
      requestMethod: {
        type: String,
        default: 'Delete',
        validator(val) {
          return ['DELETE', 'Delete', 'delete'].indexOf(val) !== -1
        },
      },
      autoCancelBeforeDestroy: {
        type: Boolean,
        default: false,
      },
      autoCancelWhenRepeated: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      aAutoRequestConfig() {
        return {
          enable: false,
          query: { enable: false, ignoreKeys: ['searchKey', 'searchValue'], matchMode: 'Equal' }, // Equal, Same
          paths: { enable: false, ignoreKeys: [], matchMode: 'Equal' }, // Equal, Same
          url: { enable: false, ignoreKeys: [], matchMode: 'Equal' }, // Equal, Same
          body: { enable: false, ignoreKeys: [], matchMode: 'Equal' }, // Equal, Same
          // config: false,
        }
      },
      aSlotScopeProps() {
        return {
          delete: this.delete,
        }
      },
    },
    methods: {
      delete() {
        return this.request()
      },
      aInterceptRequest() {
        return isFunction(this.beforeDelete) ? this.beforeDelete() : false
      },
    },
  }
</script>
