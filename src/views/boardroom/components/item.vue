<template>
  <el-row v-if="item.input">
    <el-input
      v-model="form[item.prop]"
      :placeholder="`请填写${item.input.placeholder}`"
    />
  </el-row>
  <el-row v-else>
    <el-col :span="showEdit ? 12 : 24">
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
        <el-option-group :label="item.options.tips">
          <el-option
            v-for="(it, ind) in item.options.minor"
            :key="`minor-${item.prop}-${ind}`"
            :value="it"
            :label="it"
            :disabled="disabled.minor"
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
        v-show="showEdit"
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
  computed: {
    disabled() {
      let option = { major: false, minor: false }
      if (this.item.options.multiple) {
        const val = this.form[this.item.prop]
        const { major, minor } = this.item.options
        option = {
          major: val.filter(v => minor.includes(v)).length > 0,
          minor: val.includes(major)
        }
      }

      return option
    },
    showEdit() {
      const { edit } = this.item
      if (edit && Number.isInteger(edit.for) && edit.for > -1) {
        const val = this.form[this.item.prop]
        edit.visible = this.item.options.minor[edit.for] === val
      }

      return edit && edit.visible
    }
  },
  methods: {
    handleChange(val) {
      if (this.item.options.multiple) {
        const sorts = this.item.options.minor
          .map((it, ind) => ({ [it]: ind }))
          .reduce((acc, item) => Object.assign(acc, item), {})
        this.form[this.item.prop] = val.sort((a, b) => sorts[a] - sorts[b])
      }

      const { edit } = this.item
      if (edit) {
        if (edit.non) {
          this.form[this.item.prop].includes(this.item.options.major) && this.$set(this.form, edit.prop, null)
        }

        if (Number.isInteger(edit.for) && edit.for > -1) {
          this.$set(this.form, edit.prop, null)
        }
      }
    },
    handleInput(val) {
      const { edit } = this.item
      if (edit && edit.non && val.trim() &&
        this.form[this.item.prop].includes(this.item.options.major)) {
        this.$set(this.form, this.item.prop, [])
      }
    }
  }
}
</script>
