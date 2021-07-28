<template>
  <rl-close bind-el-event action="inject">
    <div class="outside-close-button">
      <div class="close-button-2JoESI7Ojq">
        <svg
          fill="currentColor"
          preserveAspectRatio="xMidYMid meet"
          height="1em"
          width="1em"
          viewBox="0 0 16 16"
          class="cuk2-icon cuk2-icon-close null"
          style="vertical-align: middle; color: white"
        >
          <g>
            <path
              d="M13.303 3.404a.5.5 0 010 .707l-3.89 3.888 3.89 3.89a.5.5 0 010 .707l-.707.707a.5.5 0 01-.707 0L8 9.413l-3.888 3.89a.5.5 0 01-.707 0l-.707-.707a.5.5 0 010-.707L6.585 8 2.697 4.111a.5.5 0 010-.707l.707-.707a.5.5 0 01.707 0l3.888 3.888 3.89-3.888a.5.5 0 01.707 0l.707.707z"
            ></path>
          </g>
        </svg>
      </div>
    </div>
  </rl-close>
</template>

<script>
  import RlClose from '../../renderless/rl-close'

  export default {
    name: 'OutsideCloseButton',
    components: { RlClose },
  }
</script>

<style lang="scss">
  @import '~@lstack/style-scss/lib/token';

  .outside-close-button {
    z-index: $z-top;
    position: absolute;
    cursor: pointer;
    left: 0;
    top: 90px;
    color: #fff;
    width: 22px;
    height: 22px;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    border-radius: 50%;
    background-color: #9facc3;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
  }
</style>
