<template>
  <div class="lui-grid-view">
    <lui-row v-for="(cols, rowNumber) in colRows" :key="rowNumber" :gutter="horizontalGutter">
      <lui-col
        v-for="(col, colNumber) in cols"
        :key="colNumber"
        :style="rowNumber !== 0 ? colStyle : undefined"
        :span="24 / rowCount"
      >
        <slot
          :colRows="colRows"
          :rowCount="rowCount"
          :cols="cols"
          :col="col"
          :rowNumber="rowNumber"
          :colNumber="colNumber"
          :getIndex="() => getIndex(colNumber, rowNumber, rowCount)"
        />
      </lui-col>
    </lui-row>
  </div>
</template>

<script>
  import LuiRow from '../lui-row'
  import LuiCol from '../lui-col'

  export default {
    name: 'LuiGridView',
    components: { LuiRow, LuiCol },
    props: {
      horizontalGutter: Number,
      verticalGutter: Number,
      list: { type: Array, default: () => [] },
      rowCount: { type: Number, required: true },
    },
    computed: {
      colStyle() {
        return this.verticalGutter
          ? {
              marginTop: `${this.verticalGutter}px`,
            }
          : undefined
      },
      colRows() {
        const rows = []
        this.list.forEach((item, index) => {
          const mRowCount = this.rowCount
          const position = index + 1
          const row =
            position % mRowCount === 0
              ? parseInt(`${position / mRowCount}`, 10)
              : parseInt(`${position / mRowCount}`, 10) + 1
          const col = position % mRowCount === 0 ? mRowCount : position % mRowCount

          let cols = rows[row - 1]
          if (!cols) {
            cols = []
            rows[row - 1] = cols
          }
          cols[col - 1] = item
        })
        return rows
      },
    },
    methods: {
      getIndex(col, row, count) {
        return col + row * count
      },
    },
  }
</script>
