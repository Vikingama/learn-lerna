<script>
  import { isFunction } from '@lstack/utils'

  export default {
    name: 'RlCountdown',
    props: {
      countdownTime: { type: Number, default: 60 },
      intervalTime: { type: Number, default: 1 },
      timeUnit: {
        type: String,
        default: 's',
        validator(val) {
          return ['ms', 's', 'm', 'h', 'd'].indexOf(val) !== -1
        },
      },
      beforeStart: Function,
      countingAction: Function,
      afterStop: Function,
    },
    data() {
      return {
        timer: undefined,
        remainingTimestamp: 0,
      }
    },
    computed: {
      radix() {
        return {
          ms: 1,
          s: 1000,
          m: 60 * 1000,
          h: 60 * 60 * 1000,
          d: 24 * 60 * 60 * 1000,
        }[this.timeUnit]
      },
      countdownTimestamp() {
        return this.countdownTime * this.radix
      },
      intervalTimestamp() {
        return this.intervalTime * this.radix
      },
      remainingTime() {
        return this.remainingTimestamp / this.radix
      },
      slotScopeProps() {
        return {
          countdownTime: this.countdownTime,
          intervalTime: this.intervalTime,
          remainingTime: this.remainingTime,
          timeUnit: this.timeUnit,
          radix: this.radix,
          start: this.start,
          stop: this.stop,
          isFinished: this.isFinished,
        }
      },
      isFinished() {
        return this.remainingTimestamp <= 0
      },
    },
    beforeDestroy() {
      this.clearTimer()
    },
    methods: {
      start() {
        this.clearTimer()
        const { countdownTimestamp, intervalTimestamp } = this
        this.remainingTimestamp = countdownTimestamp
        if (isFunction(this.beforeStart)) {
          this.beforeStart()
        }
        this.timer = setInterval(() => {
          if (this.remainingTimestamp > 0) {
            this.remainingTimestamp -= intervalTimestamp
            if (isFunction(this.countingAction)) {
              this.countingAction(this.remainingTimestamp)
            }
          } else {
            this.stop()
          }
        }, intervalTimestamp)
      },
      stop() {
        this.clearTimer()
        if (isFunction(this.afterStop)) {
          this.afterStop()
        }
      },
      clearTimer() {
        if (this.timer) {
          clearInterval(this.timer)
          this.timer = undefined
        }
      },
    },
    render() {
      if (this.$scopedSlots.default) {
        return this.$scopedSlots.default(this.slotScopeProps)
      }
      return undefined
    },
  }
</script>
