<script>
  export default {
    name: 'RlSwitch',
    model: { prop: 'on', event: 'change' },
    props: {
      disabled: Boolean,
      on: { type: [Boolean, undefined], default: undefined },
      eventType: {
        type: String,
        default: 'click',
        validator(val) {
          return ['none', 'click', 'mouseenter', 'mouseleave'].indexOf(val) !== -1
        },
      },
    },
    data() {
      return {
        mOn: !!this.on,
      }
    },
    computed: {
      cOn: {
        set(val) {
          this.$emit('change', val)
          this.mOn = val
        },
        get() {
          if (this.on !== undefined) {
            return this.on
          }
          return this.mOn
        },
      },
      slotScopeProps() {
        return {
          disabled: this.disabled,
          on: this.cOn,
          switch: this.switch,
          turnOn: this.turnOn,
          turnOff: this.turnOff,
        }
      },
    },
    mounted() {
      if (this.eventType === 'click') {
        this.$el.addEventListener('click', this.switch)
      } else if (this.eventType === 'mouseenter') {
        this.$el.addEventListener('mouseenter', this.turnOn)
        this.$el.addEventListener('mouseleave', this.turnOff)
      } else if (this.eventType === 'mouseleave') {
        this.$el.addEventListener('mouseleave', this.turnOn)
        this.$el.addEventListener('mouseenter', this.turnOff)
      }
    },
    beforeDestroy() {
      if (this.eventType === 'click') {
        this.$el.removeEventListener('click', this.switch)
      } else if (this.eventType === 'mouseenter') {
        this.$el.removeEventListener('mouseenter', this.turnOn)
        this.$el.removeEventListener('mouseleave', this.turnOff)
      } else if (this.eventType === 'mouseleave') {
        this.$el.removeEventListener('mouseleave', this.turnOn)
        this.$el.removeEventListener('mouseenter', this.turnOff)
      }
    },
    methods: {
      switch() {
        if (!this.disabled) {
          this.cOn = !this.cOn
        }
      },
      turnOn() {
        if (!this.cOn) {
          this.switch()
        }
      },
      turnOff() {
        if (this.cOn) {
          this.switch()
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
