<template>
  <el-row>
    <el-col :span="item.edit && item.edit.visible ? 12 : 24">
      <el-select
        v-model="form[item.prop]"
        :multiple="item.options.multiple"
        :placeholder="`请选择${item.label}`"
        clearable
        style="width: 100%;"
        @change="handleChange"
      >
        <el-option
          :value="item.options.major"
          :label="item.options.major"
          :disabled="disabled.major"
        />
        <el-option-group
          :label="item.options.tips"
          :disabled="disabled.minor"
        >
          <el-option
            v-for="(it, ind) in item.options.minor"
            :key="`minor-${item.prop}-${ind}`"
            :value="it"
            :label="it"
          />
        </el-option-group>
      </el-select>
    </el-col>
    <el-col
      v-if="item.edit"
      :span="12"
      style="padding-left: 10px;"
    >
      <el-input
        v-show="item.edit.visible"
        v-model.trim="form[item.edit.prop]"
        :placeholder="item.edit.label"
        @input="handleInput"
      />
    </el-col>
  </el-row>
</template>
<script>
export default {
  props: {
    form: {
      type: Object,
      default() {
        return {}
      }
    },
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      disabled: {
        major: false,
        minor: false
      }
    }
  },
  methods: {
    handleChange(val) {
      const { multiple, major, minor } = this.item.options
      if (multiple) {
        this.$set(this.disabled, 'major', val.filter(v => minor.includes(v)).length > 0)
        this.$set(this.disabled, 'minor', val.includes(major))

        const sorts = this.item.options.minor
          .map((it, ind) => ({ [it]: ind }))
          .reduce((acc, item) => Object.assign(acc, item), {})
        this.form[this.item.prop] = val.sort((a, b) => sorts[a] - sorts[b])
      }

      const { edit } = this.item
      if (edit) {
        if (edit.non) {
          this.form[this.item.prop].includes(major) && this.$set(this.form, this.item.edit.prop, null)
        }

        if (Number.isInteger(edit.for) && edit.for > -1) {
          edit.visible = minor[edit.for] === val
          !edit.visible && this.$set(this.form, this.item.edit.prop, null)
        }
      }
    },
    handleChangeV1(val) {
      const { multiple, major, minor } = this.item.options
      if (multiple) {
        const [first] = val
        const sorts = this.item.options.minor
          .map((it, ind) => ({ [it]: ind }))
          .reduce((acc, item) => Object.assign(acc, item), {})
        this.form[this.item.prop] = major === first ? [first]
          : val.filter(it => it !== major).sort((a, b) => sorts[a] - sorts[b])
      }

      const { edit } = this.item
      if (edit) {
        if (edit.non) {
          this.form[this.item.prop].includes(major) && this.$set(this.form, this.item.edit.prop, null)
        }

        if (edit.for !== undefined) {
          edit.visible = minor[edit.for] === val
          !edit.visible && this.$set(this.form, this.item.edit.prop, null)
        }
      }
    },
    handleInput(val) {
      const { edit } = this.item
      if (edit && edit.non && val.trim() &&
        this.form[this.item.prop].includes(this.item.options.major)) {
        this.$set(this.form, this.item.prop, [])
        this.$set(this.disabled, 'minor', false)
      }
    }
  }
}
</script>
