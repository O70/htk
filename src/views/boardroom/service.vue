<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="card-header">
        <el-date-picker
          ref="picker"
          v-model="date"
          :clearable="false"
          size="mini"
        />
      </div>

      <el-table
        :data="data"
        :height="height"
        :span-method="handleSpan"
        stripe
        border
        fit
        highlight-current-row
        @row-click="handleRowClick"
      >
        <el-table-column type="index" align="center" width="50" />
        <el-table-column align="center" prop="roomLocation" label="会议室地点" width="130" />
        <el-table-column align="center" prop="roomName" label="会议室名称" />
        <el-table-column align="left" label="会议主题" class-name="new">
          <template slot-scope="scope">
            <el-badge
              v-if="isApprovedNew(scope.row.state)"
              value="New"
              style="padding-right: 15px;z-index: 1999;"
            >
              {{ scope.row.subject }}
            </el-badge>
            <span v-else>{{ scope.row.subject }}</span>
          </template>
        </el-table-column>
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
        <el-table-column align="center" prop="mobile" label="手机" width="120" />
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

    <el-drawer
      :visible.sync="drawer.visible"
      :with-header="false"
    >
      <br-order :data="drawer.data" />
    </el-drawer>
  </div>
</template>
<script>
import UsableHeightMixin from '@/components/usable-height'
import Refresh from './components/refresh'
import States from './components/states'
import { getBookService, clearNew } from '@/api/boardroom'

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
        21: ['success', '正常'],
        30: ['danger', '已取消']
      }

      return (states[val] || ['warning', '未定义'])[ind]
    }
  },
  components: {
    BrOrder: () => import('./components/order')
  },
  mixins: [UsableHeightMixin, Refresh, States],
  data() {
    return {
      excludes: ['.card-header'],
      occupy: 20 * 2 + 5 * 2 + 5 * 2 + 2 + 1,
      date: new Date(),
      data: [],
      spans: {},
      drawer: {
        visible: false,
        data: null
      }
    }
  },
  watch: {
    date() {
      this.handleData()
    }
  },
  created() {
    this.handleData()
  },
  methods: {
    handleData() {
      getBookService(this.date.getTime()).then(({ data }) => {
        const locs = data.map(({ roomLocation: location }) => location)
        this.spans = [...new Set(locs)]
          .map(l => [locs.indexOf(l), locs.lastIndexOf(l)])
          .map(([min, max]) => ({ [min]: [max - min + 1, 1] }))
          .reduce((acc, cur) => ({ ...acc, ...cur }), {})
        this.data = data
      })
    },
    handleSpan({ column, rowIndex }) {
      if (column.property === 'roomLocation') {
        return this.spans[rowIndex] || [0, 0]
      }
    },
    handleRowClick(row) {
      this.drawer.data = row
      this.drawer.visible = true
      if (this.isApprovedNew(row.state)) {
        row.state = 21
        clearNew(row.id)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-card__header {
  padding: 5px;
  text-align: center;
}
::v-deep .el-card__body {
  padding: 5px;
}

::v-deep .el-table__body-wrapper .new .cell {
  overflow: visible;
}
</style>
