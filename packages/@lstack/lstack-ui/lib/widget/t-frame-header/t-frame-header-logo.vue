<template>
  <div class="t-frame-header-logo">
    <div class="t-frame-header-logo__inner">
      <lui-link :underline="false" :to="actionTo">
        <i class="t-frame-header-logo__icon" />
      </lui-link>
    </div>
  </div>
</template>

<script>
  import LuiLink from '../../lui/lui-link'

  export default {
    name: 'TFrameHeaderLogo',
    components: { LuiLink },
    props: {
      actionTo: String,
    },
  }
</script>

<style lang="scss">
  @import './t-frame-header-logo.var';

  .t-frame-header-logo {
    position: relative;
  }
  .t-frame-header-logo__inner {
    display: inline-block;
  }

  .t-frame-header-logo__icon {
    display: inline-block;
    width: $t-frame-header-logo-icon--width;
    height: $t-frame-header-logo-icon--height;
    vertical-align: middle;
    background-image: url(./lstack-logo.svg);
    background-repeat: no-repeat;
  }
</style>
