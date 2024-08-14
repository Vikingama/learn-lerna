<script>
  import MirrorDialogTemplate from '../mirror-dialog-template'

  export default {
    name: 'JsonMirrorDialogTemplate',
    extends: MirrorDialogTemplate,
    props: {
      mirrorType: {
        type: String,
        default: 'json',
        validator(val = '') {
          return ['json'].indexOf(val.toLowerCase()) !== -1
        },
      },
    },
  }
</script>
