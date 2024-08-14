<template>
  <div class="lui-link-shortcut-board">
    <template v-for="shortcut in data">
      <el-link
        :key="shortcut.title"
        class="lui-link-shortcut-board__link"
        :disabled="shortcut.disabled"
        :href="shortcut.href"
      >
        {{ shortcut.title }}
      </el-link>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'LuiLinkShortcutBoard',
    props: {
      data: {
        type: Array,
        default: () => [],
        validator(val) {
          let allHasName = true
          val.forEach(item => {
            const keys = Object.keys(item)
            if (keys.indexOf('title') === -1) {
              allHasName = false
            }
          })
          return allHasName
        },
      },
    },
  }
</script>

<style lang="scss">
  @import './lui-link-shortcut-board.var';

  .lui-link-shortcut-board {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: $lui-link-shortcut-board__vertical--padding $lui-link-shortcut-board__horizontal--padding;
    background-color: inherit;

    .lui-link-shortcut-board__link {
      color: $lui-link-shortcut-board--color;
      font-size: $lui-link-shortcut-board--font-size;
      vertical-align: middle;
    }
    & > .lui-link-shortcut-board__link:not(:first-child) {
      margin-left: $lui-link-shortcut-board__horizontal--margin;
    }
  }
</style>
