<template>
  <div class="dialog-panel" :class="[`dialog-panel--size-${size}`]">
    <div class="dialog-panel__content">
      <slot name="content">
        <div class="dialog-panel__content-inner">
          <slot />
        </div>
      </slot>
    </div>
    <div class="dialog-panel__footer">
      <div
        v-if="
          $scopedSlots.footer ||
          $scopedSlots.footerExtension ||
          $scopedSlots.footerDescription ||
          $scopedSlots.footerActions
        "
        class="dialog-panel__footer-inner"
      >
        <slot name="footer">
          <div v-if="$scopedSlots.footerExtension" class="dialog-panel__footer-extension">
            <slot name="footerExtension"></slot>
          </div>
          <div v-if="$scopedSlots.footerDescription || $scopedSlots.footerActions" class="dialog-panel__footer-wrap">
            <div v-if="$scopedSlots.footerDescription" class="dialog-panel__footer-description">
              <slot name="footerDescription"></slot>
            </div>
            <div v-if="$scopedSlots.footerActions" class="dialog-panel__footer-actions">
              <slot name="footerActions"></slot>
            </div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DialogPanel',
    props: {
      size: {
        type: String,
        default: 'middle',
        validator(val) {
          return ['small', 'middle', 'large'].indexOf(val) !== -1
        },
      },
    },
  }
</script>
<style lang="scss">
  .dialog-panel {
    width: 100%;
    position: relative;
  }

  .dialog-panel__content-inner {
    padding: 0 20px;
    overflow: auto;

    .dialog-panel--size-small & {
      max-height: 200px;
    }
    .dialog-panel--size-middle & {
      max-height: 400px;
    }
    .dialog-panel--size-large & {
      max-height: 600px;
    }
  }
  .dialog-panel__footer {
    position: relative;
    width: 100%;
  }
  .dialog-panel__footer-inner {
    position: relative;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-end;
    align-content: flex-start;
    padding: 12px 20px 20px 20px;
  }
  .dialog-panel__footer-extension {
    margin-bottom: 8px;
    position: relative;
    flex-basis: 100%;
  }
  .dialog-panel__footer-wrap {
    position: relative;
    flex-basis: 100%;
  }
  .dialog-panel__footer-description {
    position: relative;
    float: left;
  }
  .dialog-panel__footer-actions {
    position: relative;
    float: right;
  }
</style>
