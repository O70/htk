<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="card-header clearfix">
        <a :href="data.excel">Excel</a>
        <el-button
          type="primary"
          size="mini"
          style="float: right;"
          @click="$router.go(-1)"
        >返回</el-button>
      </div>
      <div :style="{ height: `${height}px` }">
        <el-row
          v-for="(item, ind) in data.images"
          :key="`row-image-${ind}`"
          type="flex"
          class="img-row"
        >
          <el-image
            v-for="it in item"
            :key="it"
            :src="it"
            :preview-src-list="item"
            class="img-col"
          />
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
        finals: [],
        desc: {},
        excel: null
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
.img-row {
  margin: 5px 0;
  border: 2px solid;

  .img-col {
    width: 200px;
    height: 200px;
    margin: 0 2px;

    &:nth-child(1) {
      padding-right: 5px;
      border-right: 2px dashed gray;
    }
  }
}
</style>
