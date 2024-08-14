<template>
  <rl-file-input
    :before-file-input="beforeFileInput"
    :accept="accept"
    :type-read-as="typeReadAs"
    :value="value"
    class="file-input-button"
    :class="[
      inline ? 'file-input-button--inline' : '',
      marginTop ? 'file-input-button--margin-top' : '',
      marginRight ? 'file-input-button--margin-right' : '',
      marginBottom ? 'file-input-button--margin-bottom' : '',
      marginLeft ? 'file-input-button--margin-left' : '',
    ]"
    @input="val => $emit('input', val)"
  >
    <template #default="{ loading, inputFile }">
      <lui-button :loading="loading" v-bind="$attrs" @click="inputFile" v-on="$listeners">
        <slot>{{ text }}</slot>
      </lui-button>
      <lui-tip-icon v-if="!!tip" margin-left icon="el-icon-question" :tip="tip" />
    </template>
  </rl-file-input>
</template>

<script>
  import LuiButton from '../../lui/lui-button'
  import LuiTipIcon from '../../lui/lui-tip-icon'
  import RlFileInput from '../../renderless/rl-file-input'

  export default {
    name: 'FileInputButton',
    components: { LuiButton, LuiTipIcon, RlFileInput },
    props: {
      beforeFileInput: Function,
      accept: String,
      text: String,
      typeReadAs: {
        type: String,
        default: 'Text',
        validator(val) {
          return ['ArrayBuffer', 'BinaryString', 'DataURL', 'Text'].indexOf(val) !== -1
        },
      },
      value: {},
      tip: String,
      inline: Boolean,
      marginTop: Boolean,
      marginRight: Boolean,
      marginBottom: Boolean,
      marginLeft: Boolean,
    },
    methods: {},
  }
</script>

<style lang="scss">
  .file-input {
    position: relative;
  }
  .file-input-button--inline {
    display: inline-block;
  }
  .file-input-button--margin-top {
    margin-top: 8px;
  }
  .file-input-button--margin-left {
    margin-left: 8px;
  }
  .file-input-button--margin-right {
    margin-right: 8px;
  }
  .file-input-button--margin-bottom {
    margin-bottom: 8px;
  }
</style>
