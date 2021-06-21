<template>
  <div class="view-container">
    <h3>{{ info.name }}</h3>

    <el-row :gutter="5">
      <el-col :span="12">
        <el-row class="item-row">
          <el-col align="right" :span="item.left">
            投影类型:
          </el-col>
          <el-col class="item-row-right" :span="item.right">
            {{ info.projectionType }}
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row class="item-row">
          <el-col align="right" :span="item.left">
            扩音设备:
          </el-col>
          <el-col class="item-row-right" :span="item.right">
            {{ info.pa }}
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col :span="12">
        <el-row class="item-row">
          <el-col align="right" :span="item.left">
            电脑:
          </el-col>
          <el-col class="item-row-right" :span="item.right">
            {{ info.computer }}
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row class="item-row">
          <el-col align="right" :span="item.left">
            网络:
          </el-col>
          <el-col class="item-row-right" :span="item.right">
            {{ info.network }}
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col :span="12">
        <el-row class="item-row">
          <el-col align="right" :span="item.left">
            容纳人数:
          </el-col>
          <el-col class="item-row-right" :span="item.right">
            {{ info.mostNumber }}
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row class="item-row">
          <el-col align="right" :span="item.left">
            主桌人数:
          </el-col>
          <el-col class="item-row-right" :span="item.right">
            {{ info.mainPerson }}
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col :span="12">
        <el-row class="item-row">
          <el-col align="right" :span="item.left">
            休息间:
          </el-col>
          <el-col class="item-row-right" :span="item.right">
            {{ info.restroom }}
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row class="item-row">
          <el-col align="right" :span="item.left">
            独立卫生间:
          </el-col>
          <el-col class="item-row-right" :span="item.right">
            {{ info.toilet }}
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col :span="12">
        <el-row class="item-row">
          <el-col align="right" :span="item.left">
            无纸化办公:
          </el-col>
          <el-col class="item-row-right" :span="item.right">
            {{ info.paperless }}
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row class="item-row">
          <el-col align="right" :span="item.left">
            地点:
          </el-col>
          <el-col class="item-row-right" :span="item.right">
            {{ info.location }}
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col :span="12">
        <el-row class="item-row">
          <el-col align="right" :span="item.left">
            具体位置:
          </el-col>
          <el-col class="item-row-right" :span="item.right">
            {{ info.address }}
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
      item: {
        left: 12,
        right: 12
      },
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
