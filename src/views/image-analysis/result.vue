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
        <!-- <el-row>
          <el-col align="center">
            <el-image :src="data.final.image" style="width: 100%;height: 400px;" />
          </el-col>
        </el-row> -->
        <!-- <el-row>
          <el-col>
            <el-carousel :interval="4000" type="card">
              <el-carousel-item v-for="item in data.images" :key="item.filename">
                <el-image :src="item.filename" style="width: 100%;height: 400px;" />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row> -->

        <el-row
          v-for="item in data.images"
          :key="item.filename"
          type="flex"
          class="img-item"
        >
          <el-image
            :src="item.filename"
            :preview-src-list="item.results"
            class="img-size img-source"
          />
          <div class="img-result">
            <el-image
              v-for="it in item.results"
              :key="it"
              :src="it"
              class="img-size img-result-item"
            />
          </div>
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
.img-item {
  margin: 5px 0;
  border: 2px solid;
}
.img-size {
  width: 200px;
  height: 200px;
}
.img-source {
  width: 212px;
  padding-right: 10px;
  border-right: 2px dashed gray;
}
.img-result {
  margin-left: 10px;
}
.img-result-item {
  margin: 0 2px;
}
</style>
