<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="card-header clearfix">
        <a :href="data.final.file">Excel</a>
        <el-button
          type="primary"
          size="mini"
          style="float: right;"
          @click="$router.go(-1)"
        >返回</el-button>
      </div>
      <div :style="{ height: `${height}px` }">
        <el-row>
          <el-col align="center">
            <el-image :src="data.final.image" style="width: 100%;height: 400px;" />
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
import UsableHeightMixin from '@/components/usable-height'
import { results } from '@/api/image-analysis'

export default {
  mixins: [UsableHeightMixin],
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      excludes: ['.card-header'],
      occupy: 20 * 2 + 5 * 2 * 2 + 3,
      data: {
        images: [],
        final: {
          image: null,
          file: null
        }
      }
    }
  },
  created() {
    const prefix = '/dev-api/api/thraex/image/analysis/picture'
    results(this.id, prefix).then(({ data }) => {
      console.debug(data)
      this.data = data
    })
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-card__header {
  padding: 5px;
}
::v-deep .el-card__body {
  padding: 5px;
  overflow: auto;
}
</style>
