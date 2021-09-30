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
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl">
    </el-dialog>

    <el-button>开始分析</el-button>
  </el-card>
</template>
<script>
import { pictures } from '@/api/image-analysis'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      files: [],
      fileList: []
    }
  },
  created() {
    // this.fileList.push({
    //   name: 'test',
    //   url: '/dev-api/api/thraex/image/analysis/picture'
    //   // url: 'http://localhost:9716/download'
    // })
    const url = `/dev-api/api/thraex/image/analysis/picture`
    const sid = this.data.id
    pictures(sid).then(({ data }) => {
      this.fileList = data.map(it => ({ url: `${url}/${sid}/${it}` }))
    })
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
    /* handleUpload(file) {
      console.debug(file)
      console.debug(file.raw)
      this.files.push(file.file)
    },
    handleAnalysis() {
      this.$refs.upload.submit()
      const data = new FormData()
      console.debug(this.data, this.files)
      data.set('sid', this.data.id)
      data.append('files', this.files[0])
      console.debug(data)
      console.debug(data.values())
      upload(data).then(res => console.debug(res))
      // upload({ sid: 'sdf' }).then(res => console.debug(res))
    } */
  }
}
</script>
