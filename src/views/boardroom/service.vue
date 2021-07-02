<template>
  <div class="app-container">
    <el-card>
      <el-table
        :data="data"
        :height="height"
        stripe
        border
        fit
        highlight-current-row
      >
        <el-table-column type="index" align="center" width="50" />
        <el-table-column align="center" label="会议室名称" class-name="new">
          <template slot-scope="scope">
            <el-badge v-if="scope.row.isNew" value="New" style="padding-right: 10px;">
              {{ scope.row.roomName }}
            </el-badge>
            <span v-else>{{ scope.row.roomName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="subject" label="会议主题" />
        <el-table-column align="center" prop="secretLabel" label="是否涉密" width="80" />
        <el-table-column align="center" prop="times" label="会议时间" width="110" />
        <el-table-column align="center" prop="orgName" label="组织单位" width="200" />
        <el-table-column align="center" prop="contacts" label="联系人" width="80" />
        <el-table-column align="center" prop="mobile" label="手机" width="110" />
        <el-table-column align="center" prop="leaders" label="参会领导" show-overflow-tooltip />
        <el-table-column align="center" label="状态" width="100">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.stateObj.type"
              size="mini"
            >{{ scope.row.stateObj.label }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import UsableHeightMixin from '@/components/usable-height'
import { getServiceBook } from '@/api/boardroom'

export default {
  mixins: [UsableHeightMixin],
  data() {
    return {
      occupy: 20 * 2 + 5 * 2 + 2,
      states: {
        20: {
          type: 'success',
          label: '正常'
        },
        30: {
          type: 'danger',
          label: '已取消'
        },
        40: {
          type: 'info',
          label: '已过期'
        }
      },
      data: []
    }
  },
  created() {
    getServiceBook().then(this.handleData)
  },
  methods: {
    handleData({ data = [] }) {
      const secret = ['否', '是']

      this.data = data.map(({ startTime, endTime, ...other }) => {
        const [start, end] = [new Date(startTime), new Date(endTime)]
        const { type = 'warning', label = '未定义' } = this.states[other.state] || {}
        return {
          secretLabel: secret[other.secret],
          startTime: start,
          endTime: end,
          times: this.handleTime(start, end),
          stateObj: { type, label },
          isNew: false,
          ...other
        }
      })
    },
    handleTime(start, end) {
      const to = p => {
        const n = p.toString()
        return n.length > 1 ? n : `0${n}`
      }
      const [sh, sm] = [start.getHours(), start.getMinutes()]
      const [eh, em] = [end.getHours(), end.getMinutes()]

      return `${to(sh)}:${to(sm)} - ${to(eh)}:${to(em)}`
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
