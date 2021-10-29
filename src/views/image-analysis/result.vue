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
        <el-row>
          <el-col :span="6">
            <div
              v-for="[k, v] in Object.entries(data.desc)"
              :key="`${k}-${v}`"
              style="line-height: 1.7;"
            >
              <label>{{ k }}: </label>
              <el-tag type="success" size="mini">{{ v }}</el-tag>
            </div>
          </el-col>
          <el-col :span="18">
            <el-image
              v-for="it in data.finals"
              :key="it"
              :src="it"
              :preview-src-list="data.finals"
              class="img-size"
            />
          </el-col>
        </el-row>
        <el-divider />
        <template
          v-for="(item, ind) in data.images"
        >
          <el-row
            :key="`row-image-${ind}`"
            type="flex"
            class="img-row"
          >
            <el-col>
              <el-image
                v-for="it in item"
                :key="it"
                :src="it"
                :preview-src-list="item"
                class="img-col"
              />
            </el-col>
          </el-row>
          <el-divider :key="`row-image-divider-${ind}`" />
        </template>
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
    results(this.id, prefix).then(({ data }) => (this.data = data))
      .then(() => console.debug(JSON.parse(JSON.stringify(this.data))))
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
.img-size {
  width: 200px;
  height: 200px;
}
.el-divider {
  margin: 5px 0;
}
.img-row {
  margin: 5px 0;

  .img-col {
    width: 200px;
    height: 200px;
    margin: 0 2px;

    &:nth-child(1) {
      width: 207px;
      padding-right: 5px;
      border-right: 2px solid #DCDFE6;;
    }
  }
}
</style>
