<template>
  <div class="lui-dialog">
    <div class="lui-dialog__inner">
      <div class="lui-dialog__header">
        <div class="lui-dialog__title">
          <lui-title :title="title" :level="3"></lui-title>
          关闭
        </div>
      </div>
      <slot name="beforeBody"></slot>
      <div class="lui-dialog__body">
        <slot></slot>
      </div>
      <slot name="afterBody"></slot>
      <div class="lui-dialog__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import LuiTitle from '../lui-title'

  export default {
    name: 'LuiDialog',
    components: { LuiTitle },
    props: {
      title: String,
      bodyStyle: {},
      bodyClass: String,
    },
  }
</script>

<style lang="scss" scoped>
  .lui-dialog {
    position: relative;
    width: 550px;
    background-color: #fff;

    .lui-dialog__inner {
      padding: 20px;
    }
    .lui-dialog__body {
      max-height: 375px;
      overflow: auto;
    }
    //width: 50%;
    /*min-height: 50%;*/
    /*max-height: 80%;*/
    /*position: relative;*/
    //background: $color-background;
    //border-radius: $border-radius-small;
    //box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    //box-sizing: border-box;
    //position: absolute;
    //top: 0;
    //margin-top: 20vh;

    //.lsh-dialog__header {
    //  position: relative;
    //  height: $space-48px;
    //  line-height: $space-48px;
    //  padding: 0 $space-16px;
    //
    //  .el-dialog__title {
    //    line-height: $font-line-height-h2;
    //    font-size: $font-size-h2;
    //    color: $color-text-primary;
    //  }
    //
    //  .el-divider--horizontal {
    //    margin: 0px;
    //  }
    //}
    //
    //.lsh-dialog__body {
    //  padding: $space-16px;
    //  color: $color-text-regular;
    //  min-height: $space-48px;
    //  /*max-height: 320px;*/
    //  /*overflow-y: auto;*/
    //  overflow: auto;
    //  font-size: $font-size-base;
    //  word-break: break-all;
    //}
    //
    //.lsh-dialog__footer {
    //  height: $space-56px;
    //  line-height: $space-56px;
    //  padding: 0 $space-16px;
    //  text-align: right;
    //  position: relative;
    //  box-sizing: border-box;
    //
    //  /*&:before {*/
    //  /*content: '';*/
    //  /*position: absolute;*/
    //  /*left: 0;*/
    //  /*top: 0;*/
    //  /*width: 100%;*/
    //  /*height: 1px;*/
    //  /*  background-color: $color-border;*/
    //  /*}*/
    //
    //  .el-button + .el-button {
    //    margin-left: $space-16px;
    //  }
    //}
  }
</style>
