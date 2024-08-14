<script>
  import SideMirrorPageTemplate from '../side-mirror-page-template'

  export default {
    name: 'SideYamlMirrorPageTemplate',
    extends: SideMirrorPageTemplate,
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
