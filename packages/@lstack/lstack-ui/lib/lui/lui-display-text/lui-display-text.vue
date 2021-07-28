<template>
  <div
    class="lui-display-text"
    :class="[
      inline ? 'lui-display-text--is-inline' : '',
      size !== 'none' ? `lui-display-text--size-${size}` : '',
      type !== 'none' ? `lui-display-text--type-${type}` : '',
      theme !== 'none' ? `lui-display-text--theme-${theme}` : '',
      marginTop ? 'lui-display-text--margin-top' : '',
      marginRight ? 'lui-display-text--margin-right' : '',
      marginBottom ? 'lui-display-text--margin-bottom' : '',
      marginLeft ? 'lui-display-text--margin-left' : '',
    ]"
  >
    <slot>{{ text }}</slot>
  </div>
</template>
<script>
  export default {
    name: 'LuiDisplayText',
  }
</script>
