<template>
  <el-card>
    <div slot="header" class="clearfix">
      <label>
        共计: {{ total }}
      </label>
      <el-button-group style="float: right;">
        <el-button type="warning" size="mini" @click="handleAnalysis">开始分析</el-button>
        <el-button type="success" size="mini" @click="handleViewResults">查看结果</el-button>
      </el-button-group>
    </div>

    <el-upload
      ref="upload"
      action="/dev-api/api/thraex/image/analysis/upload"
      list-type="picture-card"
      multiple
      :data="{ sid: data.id }"
      :file-list="fileList"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <!-- <el-dialog :visible.sync="preview.visible">
      <img width="100%" :src="preview.url">
    </el-dialog> -->
    <!-- <el-image
      ref="preview"
      :src="preview.url"
      :preview-src-list="fileList.map(it => it.url)"
    /> -->
    <image-viewer :initial-index="0" :url-list="fileList.map(it => it.url)"
      :on-close="closeViewer" v-show="preview.visible" />
  </el-card>
</template>
<script>
import { extname } from 'path'
import Notify from './notify'
import { pictures, delPicture } from '@/api/image-analysis'

// import ImageViewer from 'element-ui/lib/image'
// console.debug(ImageViewer)

export default {
  components: {
    ImageViewer: () => import('element-ui/packages/image/src/image-viewer')
  },
  mixins: [Notify],
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      preview: {
        visible: false,
        url: ''
      },
      fileList: []
    }
  },
  computed: {
    total() {
      const ref = this.$refs.upload
      return ref ? ref.uploadFiles.length : this.fileList.length
    }
  },
  created() {
    const [sid, url] = [this.data.id, `/dev-api/api/thraex/image/analysis/picture`]
    pictures(sid).then(({ data }) =>
      (this.fileList = data.map(it => ({
        name: it,
        path: `${sid}/${it}`,
        url: `${url}/${sid}/${it}`
      }))))
  },
  methods: {
    handleRemove(file) {
      delPicture(file.path).then(res => console.log(res))
    },
    handlePreview(file) {
      this.preview.visible = true
      // this.preview.url = file.url
      // setTimeout(() => this.$refs.preview.$el.querySelector('img').click())
    },
    closeViewer() {
      this.preview.visible = false
    },
    handleSuccess({ data }, file) {
      file.path = `${this.data.id}/${data}${extname(file.name)}`
    },
    handleAnalysis() {
      // analysis(this.data).then(res => console.debug('analysis:', res))
      this.startAnalysis(this.data.id)
    },
    handleViewResults() {
      this.$router.push(`/image/analysis/${this.data.id}`)
    },
    getMessage() {
      const { nation, type } = this.data
      return `${nation}-${type}`
    }
  }
}
</script>
