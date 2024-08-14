<script>
  import { Checkbox } from 'element-ui'

  export default {
    name: 'LuiCheckbox',
    extends: Checkbox,
    props: {
      value: {},
      label: {},
      indeterminate: Boolean,
      disabled: Boolean,
      checked: Boolean,
      name: String,
      trueLabel: [String, Number],
      falseLabel: [String, Number],
      id: String, // 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系
      controls: String, // 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系
      border: Boolean,
      size: String,
    },
  }
</script>
