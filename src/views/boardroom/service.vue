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
        <el-table-column align="center" prop="time" label="会议时间" width="100" />
        <el-table-column align="center" prop="orgName" label="组织单位" />
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
    getServiceBook().then(({ data }) => (this.data = data.map(it => ({
      ...it,
      secretLabel: this.consts.secret[it.secret],
      stateLabel: this.consts.state[it.state]
    }))))
    // this.data = new Array(123).fill(1).map((_, ind) => ({
    //   id: `ID-${ind}`,
    //   roomName: `Room Name - ${ind}`,
    //   subject: `Subject-${ind}`,
    //   secret: ['否', '是'][ind % 2],
    //   time: '08:00-11:30',
    //   org: `Org-${ind}`,
    //   contacts: '鬼王鬼鬼',
    //   mobile: '13109876543',
    //   leaders: '领导领导领导领导领导领导领导领导领导领导领导领导领导领导领导领导领导领导领导领导领导领导领导领导',
    //   state: ['正常', '已取消', '已过期'][ind % 3]
    // }))
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
