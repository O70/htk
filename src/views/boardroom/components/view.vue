<template>
  <div class="view-container">
    <h3>{{ info.name }}</h3>

    <el-row v-for="(row, i) in items" :key="`row-${i}`" :gutter="5">
      <el-col v-for="(col, j) in row" :key="`col-${i}-${j}`" :span="12">
        <el-row class="item-row">
          <el-col align="right" :span="10">
            {{ col.label }}:
          </el-col>
          <el-col class="item-row-right" :span="14">
            {{ info[col.key] }}
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { Ployfills } from '@/api/boardroom'

export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      items: [
        [
          { key: 'projectionType', label: '投影类型' },
          { key: 'pa', label: '扩音设备' }
        ],
        [
          { key: 'computer', label: '电脑' },
          { key: 'network', label: '网络' }
        ],
        [
          { key: 'mostNumber', label: '容纳人数' },
          { key: 'mainPerson', label: '主桌人数' }
        ],
        [
          { key: 'restroom', label: '休息间' },
          { key: 'toilet', label: '独立卫生间' }
        ],
        [
          { key: 'paperless', label: '无纸化办公' },
          { key: 'location', label: '地点' }
        ],
        [{ key: 'address', label: '具体位置' }]
      ],
      bools: ['否', '是'],
      boolKeys: [
        'pa',
        'computer',
        'network',
        'restroom',
        'toilet',
        'paperless'
      ]
    }
  },
  computed: {
    info() {
      const data = Ployfills.room(this.data)
      return Object.assign({}, data,
        this.boolKeys.reduce((acc, cur) => ({ ...acc, [cur]: this.bools[data[cur]] }), {}))
    }
  }
}
</script>
<style lang="scss" scoped>
.view-container {
  margin: 10px;

  .item-row {
    margin: 10px 0;

    &-right {
      padding-left: 5px;
    }
  }
}
</style>
