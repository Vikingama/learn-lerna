<template>
  <vertical-flex-layout class="vertical-compound-layout" :header-class="headerClass" :footer-class="fixedFooterClass">
    <template v-if="$scopedSlots.fixedHeader" #header>
      <slot name="fixedHeader" />
    </template>
    <template v-if="$scopedSlots.fixedFooter" #footer>
      <slot name="fixedFooter" />
    </template>
    <template #outside>
      <slot name="outside" />
    </template>
    <flow-layout :header-class="headerClass" :footer-class="footerClass" :body-class="bodyClass">
      <template v-if="$scopedSlots.header" #header>
        <slot name="header" />
      </template>
      <template v-if="$scopedSlots.footer" #footer>
        <slot name="footer" />
      </template>
      <slot />
    </flow-layout>
  </vertical-flex-layout>
</template>

<script>
  import VerticalFlexLayout from '../vertical-flex-layout'
  import FlowLayout from '../flow-layout'

  export default {
    name: 'VerticalCompoundLayout',
    components: { VerticalFlexLayout, FlowLayout },
    props: {
      fixedHeaderClass: [String, Object, Array],
      headerClass: [String, Object, Array],
      bodyClass: [String, Object, Array],
      footerClass: [String, Object, Array],
      fixedFooterClass: [String, Object, Array],
    },
  }
</script>
