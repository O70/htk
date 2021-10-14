<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="card-header clearfix">
        <el-button
          type="primary"
          size="mini"
          style="float: right;"
          @click="$router.go(-1)"
        >返回</el-button>
      </div>
      <div :style="{ height: `${height}px` }">
        <div v-for="it in 1000" :key="it">
          <b>Analysis results - {{ it }}</b>
        </div>
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
      occupy: 20 * 2 + 5 * 2 * 2 + 3
    }
  },
  created() {
    console.debug(this.id)
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
