<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix card-header">
        <el-button
          type="primary"
          size="mini"
          style="float: right;"
        >新建样本</el-button>
      </div>
      <div :style="{ height: `${height}px` }">
        <el-table
          :data="data"
          stripe
          border
          fit
          highlight-current-row
        >
          <el-table-column type="index" align="center" />
          <el-table-column prop="nation" label="国家" align="center" width="200" />
          <el-table-column prop="type" label="样品类型" align="center" width="150" />
          <el-table-column prop="location" label="盆地名称/盆地或位置" align="center" />
          <el-table-column prop="era" label="时代" align="center" />
          <el-table-column prop="stratum" label="层位" align="center" />
          <el-table-column align="center" width="150">
            <template slot-scope="scope">
              <el-tooltip content="复制" placement="top">
                <el-button type="info" size="mini" icon="el-icon-message" circle />
              </el-tooltip>
              <el-tooltip content="编辑" placement="top">
                <el-button type="primary" size="mini" icon="el-icon-edit" circle />
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button type="danger" size="mini" icon="el-icon-delete" circle />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>
<script>
import UsableHeightMixin from '@/components/usable-height'

export default {
  mixins: [UsableHeightMixin],
  data() {
    return {
      excludes: ['.card-header'],
      occupy: 20 * 2 + 5 * 2 + 3,
      height: 0,
      data: []
    }
  },
  created() {
    this.data = new Array(20).fill('Item').map((it, i) => ({
      id: `ID-${i}`,
      nation: `Nation-${i}`,
      // type: `Type-${i}`,
      type: `野外露头剖面`,
      location: `location-${i}`,
      era: `era-${i}`,
      stratum: `stratum-${i}`
    }))
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-card__header {
  padding: 5px;
}
::v-deep .el-card__body {
  padding: 0;
}
</style>
