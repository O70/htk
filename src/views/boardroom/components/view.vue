<template>
  <el-card>
    <div slot="header" class="clearfix">
      <label>{{ info.name }}</label>
    </div>
    <el-form label-width="130px">
      <el-row :gutter="5">
        <el-col :span="12">
          <el-form-item label="投影类型:">
            {{ info.projectionType }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="扩音设备:">
            {{ info.pa }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="12">
          <el-form-item label="电脑:">
            {{ info.computer }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="网络:">
            {{ info.network }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="12">
          <el-form-item label="容纳人数:">
            {{ info.mostNumber }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="主桌人数:">
            {{ info.mainPerson }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="12">
          <el-form-item label="休息间:">
            {{ info.restroom }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="独立卫生间:">
            {{ info.toilet }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="12">
          <el-form-item label="无纸化办公系统:">
            {{ info.paperless }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="地点:">
            {{ info.location }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="12">
          <el-form-item label="具体位置:">
            {{ info.address }}
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
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
