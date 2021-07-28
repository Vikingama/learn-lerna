<script>
  import { isEmpty } from '@lstack/utils'
  import RlApiList from '../rl-api-list'

  export default {
    name: 'RlApiListStandard',
    extends: RlApiList,
    props: {
      apiSearchKey: String,
      apiSearchValue: String,
      apiFirstSearchValues: String,
      apiFirstSearchKey: String,
    },
    computed: {
      aRequestQuery_list() {
        return {
          searchKey: !isEmpty(this.apiSearchValue) ? this.apiSearchKey : undefined,
          searchValue: !isEmpty(this.apiSearchValue) ? this.apiSearchValue : undefined,
          firstSearchValues: this.apiFirstSearchValues,
          firstSearchKey: this.apiFirstSearchValues ? this.apiFirstSearchKey : undefined,
        }
      },
    },
  }
</script>
