<script>
  import jsyaml from 'js-yaml'
  import { isNotEmptyArray, logError } from '@lstack/utils'
  import LuiCodemirror from '../../../lui/lui-codemirror'
  import BaseMirrorConfig from '../config/base-mirror-config'
  import YamlMirrorConfig from '../config/yaml-mirror-config'

  export default {
    name: 'YamlMirror',
    extends: LuiCodemirror,
    mixins: [BaseMirrorConfig, YamlMirrorConfig],
    props: {
      title: { type: String, default: 'YAML 编辑框' },
      dumpMode: {
        type: String,
        default: 'default',
        validator(val) {
          return ['default', 'separator'].indexOf(val) !== -1
        },
      },
    },
    methods: {
      translateData2code(data) {
        let code
        if (data !== undefined) {
          try {
            if (isNotEmptyArray(data) && this.dumpMode === 'separator') {
              code = data.reduce((prev, currentValue, index) => {
                const currentCode = index >= 1 ? `\n---\n${jsyaml.dump(currentValue)}` : jsyaml.dump(currentValue)
                return prev + currentCode
              }, '')
            } else {
              code = jsyaml.dump(data)
            }
          } catch (e) {
            logError(e)
          }
        }
        return code
      },
    },
  }
</script>
