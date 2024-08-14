<script>
  import MirrorDialogTemplate from '../mirror-dialog-template'

  export default {
    name: 'YamlMirrorDialogTemplate',
    extends: MirrorDialogTemplate,
    props: {
      mirrorType: {
        type: String,
        default: 'yaml',
        validator(val = '') {
          return ['yaml'].indexOf(val.toLowerCase()) !== -1
        },
      },
    },
  }
</script>
