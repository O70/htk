<template>
  <el-card>
    <div slot="header" class="clearfix">
      <el-button-group style="float: right;">
        <el-button type="primary" size="mini" @click="handleAnalysis">开始分析</el-button>
        <el-button type="success" size="mini" @click="handleViewResults">查看结果</el-button>
      </el-button-group>
    </div>

    <el-upload
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
    <el-dialog :visible.sync="preview.visible">
      <img width="100%" :src="preview.url">
      <!-- <el-image
        style="width: 100%;height: 100%;"
        :src="preview.url"
        :preview-src-list="[
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ]">
      </el-image> -->
    </el-dialog>
  </el-card>
</template>
<script>
import { extname } from 'path'
import { pictures, delPicture, analysis } from '@/api/image-analysis'

export default {
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
      this.preview.url = file.url
      this.preview.visible = true
    },
    handleSuccess({ data }, file) {
      file.path = `${this.data.id}/${data}${extname(file.name)}`
    },
    handleAnalysis() {
      analysis(this.data.id).then(res => {
        console.debug('analysis:', res)
      })
    },
    handleViewResults() {
      this.$router.push(`/image/analysis/${this.data.id}`)
    }
  }
}
</script>
