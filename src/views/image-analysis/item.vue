<template>
  <el-card>
    <el-upload
      action="/dev-api/api/thraex/image/analysis/upload"
      list-type="picture-card"
      multiple
      :data="{ sid: data.id }"
      :file-list="fileList"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="preview.visible">
      <img width="100%" :src="preview.url">
    </el-dialog>

    <el-button>开始分析</el-button>
  </el-card>
</template>
<script>
import { pictures, delPicture } from '@/api/image-analysis'

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
    }
  }
}
</script>
