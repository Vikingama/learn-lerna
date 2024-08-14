<template>
  <div
    class="lui-sub-card"
    :class="[marginTop ? 'lui-sub-card--margin-top' : '', marginBottom ? 'lui-sub-card--margin-top' : '']"
  >
    <slot></slot>
    <div class="lui-sub-card__actions">
      <lui-link
        v-if="showCloseButton"
        text="移除"
        type="default"
        :underline="false"
        class="lui-sub-card__close"
        @click="handleCloseClick"
      />
    </div>
  </div>
</template>

<script>
  import { logError, isFunction } from '@lstack/utils'
  import LuiLink from '../lui-link'

  export default {
    name: 'LuiSubCard',
    components: { LuiLink },
    props: {
      closeApi: Function,
      showCloseButton: Boolean,
      marginTop: Boolean,
      marginBottom: Boolean,
    },
    methods: {
      handleCloseClick() {
        if (isFunction(this.closeApi)) {
          this.closeApi()
        } else {
          logError('请指定 closeAction')
        }
      },
    },
  }
</script>

<style lang="scss">
  @import './lui-sub-card.var';

  .lui-sub-card {
    position: relative;
    padding: $lui-sub-card--padding;
    width: 100%;
    background-color: $lui-sub-card--background-color;
  }

  .lui-sub-card--margin-top {
    margin-top: 12px;
  }

  .lui-sub-card--margin-bottom {
    margin-bottom: 12px;
  }

  .lui-sub-card__actions {
    position: absolute;
    top: $lui-sub-card__close--top;
    right: $lui-sub-card__close--right;
  }
</style>
