<template>
  <footer-layout class="right-actions-footer" :inner-class="innerClass">
    <template v-if="$scopedSlots.outside" #outside>
      <slot name="outside"></slot>
    </template>
    <template v-if="$scopedSlots.extension" #top>
      <slot name="extension"></slot>
    </template>
    <template v-if="$scopedSlots.description" #bottomLeft>
      <slot name="description"></slot>
    </template>
    <template v-if="$scopedSlots.actions" #bottomRight>
      <slot name="actions"></slot>
    </template>
  </footer-layout>
</template>

<script>
  import FooterLayout from '../../../layout/footer-layout'

  export default {
    name: 'RightActionsFooter',
    components: { FooterLayout },
    props: {
      innerClass: [String, Object, Array],
    },
  }
</script>
