<template>
  <t-frame-left-sidebar-layout
    class="t-frame-left-sidebar"
    :collapsed="collapsed"
    @update:collapsed="val => $emit('update:collapsed', val)"
  >
    <template #header="{ collapsed: pCollapsed }">
      <t-frame-left-sidebar-header :collapsed="pCollapsed" :icon="icon" :title="title" />
    </template>
    <template #default="{ collapsed: pCollapsed }">
      <t-frame-left-sidebar-body :collapsed="pCollapsed" :menus="menus" />
    </template>
    <template #footer="{ collapsed: pCollapsed, locked, changeLockedStatus }">
      <t-frame-left-sidebar-footer :collapsed="pCollapsed" :locked="locked" @update:locked="changeLockedStatus" />
    </template>
  </t-frame-left-sidebar-layout>
</template>

<script>
  import TFrameLeftSidebarLayout from '../../layout/widget/t-frame-left-sidebar-layout'
  import TFrameLeftSidebarHeader from './t-frame-left-sidebar-header'
  import TFrameLeftSidebarFooter from './t-frame-left-sidebar-footer'
  import TFrameLeftSidebarBody from './t-frame-left-sidebar-body'

  export default {
    name: 'TFrameLeftSidebar',
    components: { TFrameLeftSidebarBody, TFrameLeftSidebarFooter, TFrameLeftSidebarHeader, TFrameLeftSidebarLayout },
    props: {
      collapsed: { type: [Boolean, undefined], default: undefined },
      // title,icon,link,divider,items,disabled
      menus: { required: true, type: Array },
      title: { type: String, required: true },
      icon: { type: String, required: true },
      theme: { type: String, default: 'dark' },
    },
  }
</script>
