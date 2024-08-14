<template>
  <label-list-view :labels="labels" />
</template>

<script>
  import LabelListView from '../label-list-view'

  export default {
    name: 'KvListView',
    components: { LabelListView },
    props: {
      kvs: { type: Array, default: () => [] },
      kKey: { type: String, default: 'key' },
      vKey: { type: String, default: 'value' },
      separator: { type: String, default: ': ' },
    },
    computed: {
      labels() {
        return this.kvs.map(kv => {
          return `${kv[this.kKey]}${this.separator}${kv[this.vKey]}`
        })
      },
    },
  }
</script>
