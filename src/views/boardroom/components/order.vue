<template>
  <div class="view-container">
    <h3>{{ info.subject }}</h3>

    <el-row v-for="(row, i) in items" :key="`row-${i}`" class="item-row">
      <el-col :span="6" align="right">
        <label>{{ row.label }}:</label>
      </el-col>
      <el-col :span="18" class="item-row-right">
        {{ info[row.key] }}
      </el-col>
    </el-row>
  </div>
</template>
<script>
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
        { key: 'typeName', label: '会议类型' },
        { key: 'secret', label: '是否涉密' },
        { key: 'num', label: '会议人数' },
        { key: 'orgName', label: '院内承办单位' },
        { key: 'contacts', label: '联系人' },
        { key: 'mobile', label: '联系电话' },
        { key: 'introduction', label: '会议简介' },
        { key: 'participateUnits', label: '参与单位' },
        { key: 'leaders', label: '参会领导' },
        { key: 'otherLeaders', label: '其他参会领导' },
        { key: 'photograph', label: '照相' },
        { key: 'tableCard', label: '桌卡' },
        { key: 'banner', label: '横幅' },
        { key: 'signpost', label: '指路牌' },
        { key: 'projector', label: '投影仪' },
        { key: 'computer', label: '电脑' },
        { key: 'paper', label: '摆台纸' },
        { key: 'pen', label: '摆台笔' },
        { key: 'keepSecret', label: '保密' },
        { key: 'remark', label: '备注' }
      ],
      bools: ['否', '是'],
      boolKeys: [
        'secret'
      ]
    }
  },
  computed: {
    info() {
      const data = this.data
      return Object.assign({}, data, this.boolKeys
        .reduce((acc, cur) => ({ ...acc, [cur]: this.bools[data[cur]] }), {}))
    }
  }
}
</script>
<style lang="scss" scoped>
.view-container {
  margin: 10px;

  .item-row {
    margin: 20px 0;

    &-right {
      padding-left: 5px;
    }
  }
}
</style>
