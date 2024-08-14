<template>
  <div class="lui-info-grid" :class="['lui-info-grid__col' + colCount]">
    <div v-for="(subKeys, index) in keysGroup" :key="index" class="lui-info-grid__col">
      <lui-list-view :list="subKeys" :render-li="false">
        <template #default="{ listItem }">
          <slot :info="info" :prop="listItem" :kvMap="kvMap">
            <lui-info-grid-item :prop="listItem" />
          </slot>
        </template>
      </lui-list-view>
    </div>
  </div>
</template>

<script>
  import { LuiListView } from '../index'
  import LuiInfoGridItem from '../lui-info-grid-item'

  export default {
    name: 'LuiInfoGrid',
    components: { LuiListView, LuiInfoGridItem },
    props: {
      colCount: { type: Number, default: 1 },
      info: Object,
      keys: { type: Array, default: () => [] },
      kvMap: Object,
    },
    provide() {
      return {
        luiInfoGrid: this,
      }
    },
    computed: {
      keysGroup() {
        const group = []
        for (let col = 0; col < this.colCount; col++) {
          group.push([])
        }
        this.keys.forEach((key, index) => {
          group[index % this.colCount].push(key)
        })
        return group
      },
    },
  }
</script>
<style lang="scss">
  .lui-info-grid {
    position: relative;

    &:after {
      display: table;
      content: '';
      clear: both;
    }
  }
  .lui-info-grid__col {
    float: left;
    width: 100%;

    .lui-info-grid__col2 & {
      width: 50%;
    }

    .lui-info-grid__col3 & {
      width: 33.33%;
    }

    .lui-info-grid__col4 & {
      width: 25%;
    }

    .lui-info-grid__col5 & {
      width: 20%;
    }
  }
</style>
