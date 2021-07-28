<template>
  <div class="t-frame-left-sidebar-footer">
    <rl-switch :on="locked" @change="val => $emit('update:locked', val)">
      <div class="t-frame-left-sidebar-footer__fold" :class="{ 'is-locked': locked }">
        <div class="t-frame-left-sidebar-footer__fold-inner">
          <i class="t-frame-left-sidebar-footer__fold-icon" />
        </div>
      </div>
    </rl-switch>
  </div>
</template>

<script>
  import RlSwitch from '../../renderless/rl-switch'

  export default {
    name: 'TFrameLeftSidebarFooter',
    components: { RlSwitch },
    props: {
      locked: Boolean,
      collapsed: Boolean,
    },
  }
</script>

<style lang="scss">
  @import './t-frame-left-sidebar-footer.var';

  .t-frame-left-sidebar-footer {
    height: $t-frame-left-sidebar-footer--height;
    background-color: $t-frame-left-sidebar-footer--background-color;
  }
  .t-frame-left-sidebar-footer__fold {
    position: relative;
    bottom: 0;
    left: 0;
    width: 56px;
    height: 100%;
    cursor: pointer;
    &:hover {
      background-color: $t-frame-left-sidebar-footer-fold__hover--background-color;
    }
  }
  .t-frame-left-sidebar-footer__fold-inner {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 36px;
    height: 36px;
    border-radius: 36px;
  }
  .t-frame-left-sidebar-footer__fold-icon {
    position: absolute;
    top: 10px;
    left: 10px;
    display: inline-block;
    width: 16px;
    height: 16px;
    font-size: 0;
    vertical-align: middle;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTEgMmgxNHYySDF6bTAgNWg3djJIMXptMCA1aDE0djJIMXptMTQtMVY1TDkuOCA4eiIgZmlsbD0iIzdjODc4ZSIvPjwvc3ZnPg==);
    background-repeat: no-repeat;
    background-position: inherit;
    transform: rotate(180deg);

    .is-locked & {
      transform: unset;
    }
  }
</style>
