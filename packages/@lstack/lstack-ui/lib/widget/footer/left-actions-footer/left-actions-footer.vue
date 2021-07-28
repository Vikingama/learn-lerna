<template>
  <footer-layout class="left-actions-footer">
    <template v-if="$scopedSlots.outside" #outside>
      <slot name="outside"></slot>
    </template>
    <template v-if="$scopedSlots.extension" #top>
      <slot name="extension"></slot>
    </template>
    <template v-if="$scopedSlots.actions" #bottomLeft>
      <slot name="actions"></slot>
    </template>
    <template v-if="$scopedSlots.description" #bottomRight>
      <slot name="description"></slot>
    </template>
  </footer-layout>
</template>

<script>
  import FooterLayout from '../../../layout/footer-layout'

  export default {
    name: 'LeftActionsFooter',
    components: { FooterLayout },
  }
</script>
