<script>
  import { isFunction, isNotEmptyText, isNotEmptyArray, isArray } from '@lstack/utils'
  import RlApiDelete from '../rl-api-delete'

  export default {
    name: 'RlApiDeleteStandard',
    extends: RlApiDelete,
    props: {
      list: { type: [Array, Object], default: () => [] },
      infosKeyInBody: { type: String, default: 'infos' },
      infoValueKeys: { type: [String, Array], default: 'id' },
      infoValueMapApi: Function,
    },
    computed: {
      aRequestBody() {
        const list = isArray(this.list) ? this.list : [this.list]
        let infos
        if (isFunction(this.infoValueMapApi)) {
          infos = list.map(this.infoValueMapApi)
        } else if (isNotEmptyText(this.infoValueKeys)) {
          infos = list.map(item => item[this.infoValueKeys])
        } else if (isNotEmptyArray(this.infoValueKeys)) {
          infos = list.map(item => {
            const result = {}
            this.infoValueKeys.forEach(key => {
              result[key] = item[key]
            })
            return result
          })
        }
        if (isNotEmptyText(this.infosKeyInBody)) {
          const body = {}
          body[this.infosKeyInBody] = infos
          return body
        }
        return infos
      },
    },
  }
</script>
