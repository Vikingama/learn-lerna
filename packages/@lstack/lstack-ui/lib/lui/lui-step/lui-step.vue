<template>
  <div class="lui-step" :class="[marginBottom ? 'lui-step--margin-bottom' : '']">
    <div v-for="(step, index) in steps" :key="index" class="lui-step__item" :class="[`is-${status[index]}`]">
      <div v-if="index !== 0" class="lui-step__item-line" />
      <div class="lui-step__item-icon">
        <div class="lui-step__item-icon-inner">{{ index + 1 }}</div>
      </div>
      <span class="lui-step__item-label">{{ step.label }}</span>
    </div>
  </div>
</template>

<script>
  import { isFunction } from '@lstack/utils'

  export default {
    name: 'LuiStep',
    props: {
      active: Number,
      finishStatus: { type: String, default: 'finish' },
      processStatus: { type: String, default: 'process' },
      // label, icon, status, description
      steps: { type: Array, default: () => [] },
      marginBottom: Boolean,
      beforeNextStep: Function,
      beforeNextStepAsync: Function,
      onActiveStepMax: Function,
      onActiveStepMin: Function,
    },
    computed: {
      status() {
        return this.steps.map((step, index) => {
          let status
          if (step.status) {
            status = step.status
          } else if (this.cActive > index) {
            status = this.finishStatus
          } else if (this.cActive === index) {
            status = this.processStatus
          } else {
            status = 'wait'
          }
          return status
        })
      },
      cActive: {
        get() {
          return this.active
        },
        set(val) {
          this.$emit('input', val)
        },
      },
    },
    methods: {
      previousStep() {
        if (this.cActive > 0) {
          this.cActive -= 1
        } else if (isFunction(this.onActiveStepMin)) {
          this.onActiveStepMin(this.cActive)
        }
      },
      doNextStep() {
        if (this.cActive < this.steps.length - 1) {
          this.cActive += 1
        } else if (isFunction(this.onActiveStepMax)) {
          this.onActiveStepMax(this.cActive)
        }
      },
      nextStep() {
        if (isFunction(this.beforeNextStep) && this.beforeNextStep()) return
        if (isFunction(this.beforeNextStepAsync)) {
          this.beforeNextStepAsync(this.doNextStep)
        } else {
          this.doNextStep()
        }
      },
    },
  }
</script>
<style lang="scss">
  .lui-step {
    position: relative;
    height: 28px;
    line-height: 28px;
  }
  .lui-step--margin-bottom {
    margin-bottom: 12px;
  }
  .lui-step__item-line {
    width: 60px;
    height: 1px;
    margin-right: 8px;
    vertical-align: middle;
    display: inline-block;
    line-height: 0;
    background-color: #adb0b8;
    font-size: 0;
  }

  .lui-step__item-icon {
    display: inline-block;
    vertical-align: middle;
    width: 16px;
    height: 16px;
    font-size: 12px;
    border: 1px solid;
    position: relative;
    border-radius: 50%;
    border-color: #8a8e99;
    color: #8a8e99;
  }
  .lui-step__item-label {
    font-size: 12px;
    margin-left: 4px;
    margin-right: 8px;
    vertical-align: middle;
  }

  .lui-step__item-icon-inner {
    width: 100%;
    height: 100%;
    line-height: 14px;
    position: absolute;
    text-align: center;
  }
  .lui-step__item {
    display: inline-flex;
    vertical-align: middle;
    align-items: center;

    &.is-finish {
      .lui-step__item-line {
        background-color: #5e7ce0;
      }
      .lui-step__item-label,
      .lui-step__item-icon {
        border-color: #5e7ce0;
        color: #5e7ce0;
      }
    }
    &.is-process {
      .lui-step__item-line {
        background-color: #5e7ce0;
      }
      .lui-step__item-label {
        font-weight: bold;
        color: #5e7ce0;
      }
      .lui-step__item-icon {
        background-color: #5e7ce0;
        border-color: #5e7ce0;
        color: #fff;
      }
    }
    &.is-wait {
      .lui-step__item-line {
        background-color: #adb0b8;
      }
      .lui-step__item-label,
      .lui-step__item-icon {
        border-color: #adb0b8;
        color: #adb0b8;
      }
    }
  }
</style>
