<script>
  import { isNotEmptyText } from '@lstack/utils'
  import LuiSpan from '../lui-span'

  export default {
    name: 'LuiPlaceholder',
    props: {
      placeholder: String,
      type: {
        type: String,
        validator(val) {
          return ['dark', 'light'].indexOf(val) !== -1
        },
      },
    },
    computed: {
      cClasses() {
        const classes = ['lui-placeholder']
        if (isNotEmptyText(this.type)) {
          classes.push(`lui-placeholder--${this.type}`)
        }
        return classes
      },
    },
    render(createElement) {
      return createElement(LuiSpan, {
        class: this.cClasses,
        props: { kind: 'caption', size: 'm' },
        scopedSlots: this.$scopedSlots,
      })
    },
  }
</script>
<style lang="scss">
  @import './lui-placeholder.var';

  .lui-placeholder {
    color: $lui-placeholder--color;
    line-height: $lui-placeholder--line-height;
  }
  .lui-placeholder--light {
    color: $lui-placeholder__dark--color;
  }
  .lui-placeholder--dark {
    color: $lui-placeholder__dark--color;
  }
</style>
