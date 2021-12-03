<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="card-header clearfix">
        <label>
          共计: {{ data.length }}
        </label>
        <el-button-group style="float: right;">
          <el-button
            type="warning"
            size="mini"
            :disabled="disabled"
            @click="handleAnalysis"
          >分析</el-button>
          <el-button type="primary" size="mini" @click="handleNew">新建</el-button>
          <el-button
            type="danger"
            size="mini"
            :disabled="disabled"
            @click="handleRemoveAll"
          >删除</el-button>
        </el-button-group>
      </div>
      <el-table
        ref="table"
        :data="data"
        :height="height"
        stripe
        border
        fit
        highlight-current-row
        @row-click="handleRowClick"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="40" />
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
        <el-table-column label="操作" align="center" width="180">
          <!-- <template slot="header">
            <el-button type="success" size="mini" @click="handleNew">新建样本</el-button>
          </template> -->
          <template slot-scope="scope">
            <el-tooltip content="复制" placement="top">
              <el-button
                type="info"
                size="mini"
                icon="el-icon-document-copy"
                circle
                @click="handleCopy($event, scope.row)"
              />
            </el-tooltip>
            <el-tooltip content="查看结果" placement="top">
              <el-button
                type="success"
                size="mini"
                icon="el-icon-view"
                circle
                @click="handleViewResults($event, scope.row.id)"
              />
            </el-tooltip>
            <el-tooltip content="编辑" placement="top">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                circle
                @click="handleEdit($event, scope.row)"
              />
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                circle
                @click="handleRemove($event, scope.$index, scope.row)"
              />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="基本信息" :visible.sync="form.visible" width="35%">
      <el-form ref="form" :model="form.model" :rules="rules" label-width="120px" size="mini">
        <el-form-item prop="nation" label="国家">
          <el-input v-model.trim="form.model.nation" clearable />
        </el-form-item>
        <el-form-item prop="type" label="样品类型">
          <el-select v-model="form.model.type" clearable style="width: 100%;">
            <el-option
              v-for="(item, ind) in form.types"
              :key="`type-${ind}`"
              :label="item.key"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="location" :label="locationLabel">
          <el-input v-model.trim="form.model.location" clearable />
        </el-form-item>
        <el-form-item prop="era" label="时代">
          <el-input v-model.trim="form.model.era" clearable />
        </el-form-item>
        <el-form-item prop="stratum" label="层位">
          <el-input v-model.trim="form.model.stratum" clearable />
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
import Notify from './notify'
import { list, save, remove } from '@/api/htk'

export default {
  components: {
    ImageItem: () => import('./item')
  },
  mixins: [UsableHeightMixin, Notify],
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
      excludes: ['.card-header'],
      occupy: 20 * 2 + 5 * 2 * 2 + 3,
      data: [],
      form: {
        entity,
        model: Object.assign({}, entity),
        visible: false,
        types: [
          { key: '岩心或岩屑', label: '盆地名称' },
          { key: '野外露头剖面', label: '盆地或位置' }
        ]
      },
      rules: {
        nation: { required: true, message: '请填写' },
        type: { required: true, message: '请选择' },
        location: { required: true, message: '请填写' },
        /* location: { validator: (_, value, callback) => {
          callback(value && value.trim().length > 0
            ? undefined
            : `请填写${this.locationLabel}`)
        } }, */
        era: { required: true, message: '请填写' },
        stratum: { required: true, message: '请填写' }
      },
      selected: []
    }
  },
  computed: {
    locationLabel() {
      const type = this.form.types.find(it => it.key === this.form.model.type)
      return type ? type.label : '待定'
    },
    disabled() {
      return this.selected.length <= 0
    }
  },
  created() {
    list().then(({ data }) => (this.data = data))
  },
  methods: {
    handleRowClick(row) {
      this.$refs.table.toggleRowExpansion(row)
    },
    handleSelectionChange(val) {
      this.selected = val
    },
    handleNew() {
      this.form.model = Object.assign({}, this.form.entity)
      this.form.visible = true
      this.$refs.form && this.$refs.form.clearValidate()
    },
    handleEdit(event, row) {
      event.stopPropagation()

      this.form.model = Object.assign({}, row)
      this.form.visible = true
      this.$refs.form && this.$refs.form.clearValidate()
    },
    handleSave() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.visible = false
          this.handleSubmit(this.form.model)
        }
      })
    },
    handleCopy(event, row) {
      event.stopPropagation()

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
    handleRemove(event, index, { id }) {
      event.stopPropagation()

      this.$confirm('确认删除?', '提示', { type: 'warning' })
        .then(() => this.handleSplice(index, id))
        .catch(() => {})
    },
    handleRemoveAll() {
      this.$confirm('确认删除?', '提示', { type: 'warning' })
        .then(() => {
          this.selected.forEach(({ id }) => {
            const ind = this.data.findIndex(d => d.id === id)
            this.handleSplice(ind, id)
          })
        }).catch(() => {})
    },
    handleSplice(index, id) {
      this.data.splice(index, 1)
      remove(id)
    },
    handleAnalysis() {
      // analysis(this.selected).then(res => console.debug('batch analysis:', res))
      this.startAnalysis(this.selected.map(({ id }) => id).join(','))
    },
    handleViewResults(event, id) {
      event.stopPropagation()
      this.$router.push(`${id}`)
    },
    getMessage(id) {
      const it = this.selected.find(it => it.id === id)
      return `${it.nation}-${it.type}`
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
