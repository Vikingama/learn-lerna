<template>
  <div class="lui-page-stack" :class="cStackClasses">
    <div v-if="isModal" class="lui-page-stack__modal"></div>
    <div
      v-for="containerDescription in stack"
      :key="containerDescription.index"
      class="lui-page-stack__container"
      :class="{
        'is-bottom': containerDescription.index === 0,
        'is-top': containerDescription.index === topPageIndex,
        'size-match': size === 'Match',
      }"
    >
      <!--  TODO  这一层需要加一个 RlClose 以提供子页面默认 inject close 支持   -->
      <component
        :is="containerDescription.pageComponentInfo.is"
        v-bind="{ ...containerDescription.pageComponentInfo.attrs, ...containerDescription.pageComponentInfo.props }"
        v-on="containerDescription.pageComponentInfo.on"
        @close="popPage(containerDescription.index)"
        @clearPages="popPage(0)"
        @openPage="openPage"
      />
    </div>
  </div>
</template>

<script>
  import { isObject, isArray, isFunction } from '@lstack/utils'
  import { ProvidePageStack } from '../../mixin'

  export default {
    name: 'LuiPageStack',
    mixins: [ProvidePageStack],
    props: {
      stackClass: [Array, String],
      type: String,
    },
    provide() {
      return {
        pIsPageStack: true,
        pPageStack: this,
      }
    },
    data() {
      return {
        stack: [],
        // 'FullScreen', 'Match'
        size: undefined,
      }
    },
    computed: {
      cStackClasses() {
        let classes = []
        if (this.type === 'popup') {
          classes.push('popup')
        }
        if (isArray(this.stackClass)) {
          classes = classes.concat(this.stackClass)
        } else {
          classes.push(this.stackClass)
        }
        return classes
      },
      isModal() {
        return this.stack.some((containerDescription, index) => containerDescription.modal)
      },
      stackTop() {
        if (this.topPageIndex >= 0) {
          return this.stack[this.topPageIndex]
        }
        return undefined
      },
      topPageIndex() {
        return this.stack.length - 1
      },
    },
    methods: {
      doPopPage(index) {
        if (this.stackTop.index >= index) {
          this.stack.pop()
        }
        this.popPage(index)
      },
      popTopPage() {
        this.popPage(this.topPageIndex)
      },
      /**
       * 推出指定 index 及其出栈方向顶部的所有容器的界面
       * @param index 目标界面容器的ID
       * @param doNextWhenPopSuccess
       */
      popPage(index, doNextWhenPopSuccess) {
        while (isObject(this.stackTop) && this.stackTop.index >= index) {
          if (isFunction(this.stackTop.beforeClose)) {
            const doNext = () => {
              this.doPopPage(index)
            }
            this.stackTop.beforeClose(doNext)
            return false
          }
          this.stack.pop()
        }
        if (isFunction(doNextWhenPopSuccess)) {
          doNextWhenPopSuccess()
        }
        return true
      },
      openPage(pageComponentInfo = {}, containerInfo = {}) {
        const { singleTask } = containerInfo
        if (singleTask) {
          const doNextWhenPopSuccess = () => this.pushPage2Stack(pageComponentInfo, containerInfo)
          this.popPage(0, doNextWhenPopSuccess)
        } else {
          this.pushPage2Stack(pageComponentInfo, containerInfo)
        }
      },
      pushPage2Stack(pageComponentInfo = {}, containerInfo = {}) {
        const stackSizeBefore = this.stack.length
        const containerDescription = {
          index: stackSizeBefore,
          pageComponentInfo,
          ...containerInfo,
        }
        this.stack.push(containerDescription)
      },
      getPageStack() {
        return this
      },
      isStackEmpty() {
        return this.stack.length <= 0
      },
    },
  }
</script>

<style lang="scss">
  @import '~@lstack/style-scss/lib/token';

  .lui-page-stack__modal {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    cursor: not-allowed;
  }

  .lui-page-stack__container {
    z-index: $z-side-page;
    position: absolute;
    left: 30%;
    right: 0;
    top: 0;
    bottom: 0;

    &.size-match {
      left: 0;
    }

    &:not(.size-match):after {
      height: 100%;
      bottom: 0;
      border-right: 1px solid #dcdfe6;
      content: ' ';
      position: absolute;
      left: -6px;
      width: 6px;
      background: linear-gradient(270deg, rgba(197, 219, 232, 0.4), rgba(211, 220, 227, 0));
    }
  }

  .lui-page-stack.popup > .lui-page-stack__container {
    z-index: $z-popup;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);

    //& > div {
    //  width: 80%;
    //  height: 80%;
    //}
  }
</style>
