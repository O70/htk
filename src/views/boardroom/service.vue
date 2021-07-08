<template>
  <div class="app-container">
    <el-card>
      <el-table
        :data="data"
        :height="height"
        :span-method="handleSpan"
        stripe
        border
        fit
        highlight-current-row
      >
        <el-table-column type="index" align="center" width="50" />
        <el-table-column align="center" prop="roomPlace" label="会议室地点" width="130" />
        <el-table-column align="center" label="会议室名称" class-name="new">
          <template slot-scope="scope">
            <el-badge
              v-if="scope.row.isNew"
              value="New"
              style="padding-right: 15px;z-index: 2001;"
            >
              {{ scope.row.roomName }}
            </el-badge>
            <span v-else>{{ scope.row.roomName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="subject" label="会议主题" />
        <el-table-column align="center" label="是否涉密" width="100">
          <template slot-scope="scope">
            {{ scope.row.secret | filterSecret }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="会议时间" width="120">
          <template slot-scope="scope">
            {{ scope.row | filterTime }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="orgName" label="组织单位" width="200" />
        <el-table-column align="center" prop="contacts" label="联系人" width="80" />
        <el-table-column align="center" prop="mobile" label="手机" width="110" />
        <el-table-column align="center" prop="leaders" label="参会领导" show-overflow-tooltip />
        <el-table-column align="center" label="状态" width="100">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.state | filterState(0)"
              size="mini"
            >{{ scope.row.state | filterState(1) }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import UsableHeightMixin from '@/components/usable-height'
import Sock from './components/sock'
import { getBookService } from '@/api/boardroom'

export default {
  filters: {
    filterSecret: val => ['否', '是'][val],
    filterTime({ startTime, endTime }) {
      const [start, end] = [new Date(startTime), new Date(endTime)]

      const to = p => {
        const n = p.toString()
        return n.length > 1 ? n : `0${n}`
      }
      const [sh, sm] = [start.getHours(), start.getMinutes()]
      const [eh, em] = [end.getHours(), end.getMinutes()]

      return `${to(sh)}:${to(sm)} - ${to(eh)}:${to(em)}`
    },
    filterState(val, ind) {
      const states = {
        20: ['success', '正常'],
        30: ['danger', '已取消'],
        40: ['info', '已过期']
      }

      return (states[val] || ['warning', '未定义'])[ind]
    }
  },
  mixins: [UsableHeightMixin, Sock],
  data() {
    return {
      occupy: 20 * 2 + 5 * 2 + 2,
      data: [],
      spans: {}
    }
  },
  created() {
    getBookService().then(({ data }) => {
      const locs = data.map(({ roomPlace: location }) => location)
      this.spans = [...new Set(locs)]
        .map(l => [locs.indexOf(l), locs.lastIndexOf(l)])
        .map(([min, max]) => ({ [min]: [max - min + 1, 1] }))
        .reduce((acc, cur) => ({ ...acc, ...cur }), {})
      this.data = data
    })
  },
  methods: {
    handleSpan({ rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        return this.spans[rowIndex] || [0, 0]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-card__body {
  padding: 5px;
}

::v-deep .el-table__body-wrapper .new .cell {
  overflow: visible;
}
</style>
