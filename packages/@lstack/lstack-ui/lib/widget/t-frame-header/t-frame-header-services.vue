<template>
  <div class="t-frame-header-services">
    <div class="t-frame-header-services__overview">
      <lui-link
        :underline="false"
        class="t-frame-header-services__nav"
        type="default"
        theme="dark"
        text="总览"
        :to="consoleIndexHref"
      />
    </div>
    <div class="t-frame-header-services__service">
      <lui-link class="t-frame-header-services__nav" type="default" theme="dark">
        <div class="t-frame-header-services__service-handle">
          <span class="t-frame-header-services__service-title">云产品</span>
          <i class="t-frame-header-services__service-arrows" />
        </div>
        <div class="t-frame-header-services__service-panel">
          <div class="t-frame-header-services__service-inner">
            <div>
              <a
                href="https://cloud.tencent.com/act/event/Online_service?from=console_bar"
                target="_blank"
                class="qc-workorder-info-customer-service"
                data-hot="header.support.online-service"
              >
                在线支持
              </a>
              <a
                href="/workorder"
                target="_blank"
                class="qc-workorder-info-upcoming"
                data-hot="header.support.workorder"
              >
                待办工单
                <i id="topTktNum" class="tea-text-warning">&nbsp;(0)</i>
              </a>
            </div>
          </div>
        </div>
      </lui-link>
    </div>
  </div>
</template>

<script>
  import { console as consoleProject } from '@lstack/project/src/project'

  export default {
    name: 'TFrameHeaderServices',
    computed: {
      consoleIndexHref() {
        return consoleProject.routeMap.Index.getHref()
      },
    },
  }
</script>

<style lang="scss">
  @import '~@lstack/style-scss/lib/token';

  .t-frame-header-services {
    position: relative;

    & > :not(:first-child) .t-frame-header-services__nav {
      padding-left: $s-2;
    }
  }

  .t-frame-header-services__overview,
  .t-frame-header-services__service {
    position: relative;
    display: inline-block;
  }

  .t-frame-header-services__nav {
    display: inline-block;
    height: $form-element-medium-height;
    padding: 0 $s-4;
    line-height: $form-element-medium-height;
  }

  .t-frame-header-services__service-handle {
    cursor: default;
  }

  .t-frame-header-services__service-panel {
    width: 168px;
    background-color: #151822;
    position: absolute;
    left: 0;
    cursor: default;
    z-index: 2000;
    display: none;
    padding: 10px 0 0;
    min-width: 140px;
    box-sizing: border-box;
    text-align: left;

    .t-frame-header-services__nav:hover & {
      display: block;
    }
  }

  .t-frame-header-services__service-inner {
    animation-duration: 0.5s;
    animation-fill-mode: both;

    a {
      color: #c1c6c8;
      padding-left: 44px;
      position: relative;
      display: block;
      line-height: 32px;
      color: #c1c6c8;
      font-size: 12px;
      white-space: nowrap;
      padding-right: 10px;
    }
  }

  .t-frame-header-services__service-arrows {
    display: inline-block;
    width: $icon-s;
    height: $icon-s;
    vertical-align: middle;
    background: url(https://cloudcache.tencent-cloud.com/open_proj/proj_qcloud_v2/mc_2014/global/css/v2/nav/img/slice/arrows-line.svg);
    -webkit-transform-origin: center;
    -webkit-transition: all 0.1s linear;

    .t-frame-header-services__nav:hover & {
      background: url(https://cloudcache.tencent-cloud.com/open_proj/proj_qcloud_v2/mc_2014/global/css/v2/nav/img/slice/arrows-line-white.svg);
      transform: rotate(-180deg);
    }
  }
</style>
