import { get } from '@lstack/utils'

export default {
  name: 'BaseView',
  methods: {
    get,
    emptyApi() {},
    selectFirst(optionValues) {
      return optionValues[0]
    },
    selectLast(optionValues = []) {
      return optionValues[optionValues.length - 1]
    },
  },
}
