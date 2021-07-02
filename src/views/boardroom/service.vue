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
        <el-table-column align="center" prop="roomName" label="会议室名称" />
        <el-table-column align="center" prop="subject" label="会议主题" />
        <el-table-column align="center" prop="secretLabel" label="是否涉密" width="80" />
        <el-table-column align="center" prop="times" label="会议时间" width="110" />
        <el-table-column align="center" prop="orgName" label="组织单位" width="200" />
        <el-table-column align="center" prop="contacts" label="联系人" width="80" />
        <el-table-column align="center" prop="mobile" label="手机" width="110" />
        <el-table-column align="center" prop="leaders" label="参会领导" show-overflow-tooltip />
        <el-table-column align="center" prop="stateLabel" label="状态" width="100" />
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
      consts: {
        secret: ['否', '是'],
        state: ['正常', '已取消', '已过期']
      },
      data: []
    }
  },
  created() {
    getServiceBook().then(this.handleData)
  },
  methods: {
    handleData({ data }) {
      this.data = data.map(({ startTime, endTime, ...other }) => {
        const [start, end] = [new Date(startTime), new Date(endTime)]
        return {
          startTime: start,
          endTime: end,
          times: this.handleTime(start, end),
          secretLabel: this.consts.secret[other.secret],
          stateLabel: this.consts.state[other.state],
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
.el-card {
  ::v-deep &__body {
    padding: 5px;
  }
}
</style>
