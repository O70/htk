<template>
  <div class="app-container">
    <el-card>
      <el-table
        :data="data"
        :height="height"
        stripe
        border
        fit
        highlight-current-row
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <image-item :data="scope.row" />
          </template>
        </el-table-column>
        <el-table-column type="index" align="center" />
        <el-table-column prop="nation" label="国家" align="center" width="200" />
        <el-table-column prop="type" label="样品类型" align="center" width="150" />
        <el-table-column prop="location" label="盆地名称/盆地或位置" align="center" />
        <el-table-column prop="era" label="时代" align="center" />
        <el-table-column prop="stratum" label="层位" align="center" />
        <el-table-column align="center" width="170">
          <template slot="header">
            <el-button type="success" size="mini" @click="handleNew">新建样本</el-button>
          </template>
          <template slot-scope="scope">
            <el-tooltip content="复制" placement="top">
              <el-button
                type="info"
                size="mini"
                icon="el-icon-document-copy"
                circle
                @click="handleCopy(scope.row)"
              />
            </el-tooltip>
            <el-tooltip content="编辑" placement="top">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                circle
                @click="handleEdit(scope.row)"
              />
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                circle
                @click="handleRemove(scope.$index, scope.row)"
              />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="基本信息" :visible.sync="form.visible" width="35%">
      <el-form :model="form.model" label-width="90px" size="mini">
        <el-form-item label="国家">
          <el-input v-model="form.model.nation" clearable />
        </el-form-item>
        <el-form-item label="样品类型">
          <el-select v-model="form.model.type" clearable style="width: 100%;">
            <el-option
              v-for="(item, ind) in form.types"
              :key="`type-${ind}`"
              :label="item.key"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="locationLabel">
          <el-input v-model="form.model.location" clearable />
        </el-form-item>
        <el-form-item label="时代">
          <el-input v-model="form.model.era" clearable />
        </el-form-item>
        <el-form-item label="层位">
          <el-input v-model="form.model.stratum" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave">保存</el-button>
          <el-button @click="form.visible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import UsableHeightMixin from '@/components/usable-height'
import { list, save, remove } from '@/api/image-analysis'

export default {
  components: {
    ImageItem: () => import('./item.vue')
  },
  mixins: [UsableHeightMixin],
  data() {
    const entity = {
      id: null,
      nation: null,
      type: null,
      location: null,
      era: null,
      stratum: null
    }
    return {
      occupy: 20 * 2 + 5 * 2 + 3,
      height: 0,
      data: [],
      form: {
        entity,
        model: Object.assign({}, entity),
        visible: false,
        types: [
          { key: '岩心或岩屑', label: '盆地名称' },
          { key: '野外露头剖面', label: '盆地或位置' }
        ]
      }
    }
  },
  computed: {
    locationLabel() {
      const type = this.form.types.find(it => it.key === this.form.model.type)
      return type ? type.label : '待定'
    }
  },
  created() {
    list().then(({ data }) => (this.data = data))
  },
  methods: {
    handleNew() {
      this.form.model = Object.assign({}, this.form.entity)
      this.form.visible = true
    },
    handleEdit(row) {
      this.form.model = Object.assign({}, row)
      this.form.visible = true
    },
    handleSave() {
      this.form.visible = false
      this.handleSubmit(this.form.model)
    },
    handleCopy(row) {
      const copy = Object.assign({}, row, { id: null })
      this.handleSubmit(copy)
    },
    handleSubmit(model) {
      const { id } = model
      save(model).then(({ data }) => {
        if (id) {
          const ind = this.data.findIndex(it => it.id === id)
          this.data.splice(ind, 1, data)
        } else {
          this.data.splice(0, 0, data)
        }
      })
    },
    handleRemove(index, { id }) {
      console.debug('TODO: remove', 'remove record/image/result')
      this.data.splice(index, 1)
      remove(id).then(res => console.debug(res))
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-card__header {
  padding: 5px;
}
::v-deep .el-card__body {
  padding: 5px;
}
</style>
