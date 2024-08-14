<template>
  <div class="viewport-header-nav-user">
    <div class="viewport-header-nav-user__inner">
      <div class="viewport-header-nav-user__handle">
        <i class="viewport-header-nav-user__icon"></i>
        <span class="viewport-header-nav-user__name">吴斌</span>
        <i class="viewport-header-nav-user__arrows"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ViewportHeaderNavUser',
  }
</script>

<style lang="scss">
  .viewport-header-nav-user {
    display: inline-block;
    min-width: 122px;
    line-height: 50px;
    text-align: right;
    vertical-align: top;
  }
  .viewport-header-nav-user__inner {
    display: inline-block;
    padding: 0 24px 0 12px;
    color: #c1c6c8;
    line-height: 30px;
    vertical-align: middle;
  }
  .viewport-header-nav-user__icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 8px;
    vertical-align: middle;
    background-image: url(https://cloudcache.tencent-cloud.com/open_proj/proj_qcloud_v2/mc_2014/global/css/v2/sprite/global-202007201541.svg);
    background-repeat: no-repeat;
    background-position: 47.55% 60.61%;
    background-size: 1835.0000000000002% 1090%;
  }
  .viewport-header-nav-user__name {
    display: inline-block;
    max-width: 11em;
    overflow: hidden;
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: middle;
    word-break: keep-all;
  }
  .viewport-header-nav-user__arrows {
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url(https://cloudcache.tencent-cloud.com/open_proj/proj_qcloud_v2/mc_2014/global/css/v2/nav/img/slice/arrows-line.svg);
    -webkit-transform-origin: center;
    -webkit-transition: all 0.1s linear;
  }
</style>
