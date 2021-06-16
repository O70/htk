export default {
  data() {
    return {
      rules: {
        typeId: { required: true, message: '请选择会议类型' },
        secret: { required: true, message: '请选择是否涉密' },
        num: [
          { required: true, message: '请填写会议人数' },
          { type: 'integer', min: 1, message: '请填写>0的正整数' }
        ],
        orgId: { required: true, message: '请选择院内承办单位' },
        contacts: { required: true, message: '请填写联系人' },
        mobile: { required: true, message: '请填写手机' },
        subject: { required: true, message: '请填写会议主题' },
        introduction: { required: true, message: '请填写会议简介' },
        participateUnits: { required: true, message: '请填写参与单位' },
        projector: { required: true, message: '请选择投影仪' }
      }
    }
  },
  created() {
    const rules = this.items
      .reduce((acc, cur) => [...acc, ...Array.isArray(cur) ? cur : [cur]], [])
      .map(it => this.handleRules(it))
      .reduce((acc, cur) => Object.assign(acc, cur), {})

    Object.assign(this.rules, rules)
  },
  methods: {
    handleRules({ prop, label, options, edit }) {
      let rule = { required: true, message: `请选择${label}` }

      if (edit) {
        if (edit.non) {
          rule = {
            required: true,
            validator: (_, value, callback) => callback(
              value.length === 0 && !this.form[edit.prop] ? `请选择${label}或填写${edit.label}` : undefined)
          }
        }

        if (Number.isInteger(edit.for) && edit.for > -1) {
          rule = [
            rule,
            {
              validator: (_, value, callback) => callback(
                value === options.minor[edit.for] && !this.form[edit.prop] ? `请填写${edit.label}` : undefined)
            }
          ]
        }
      }

      return { [prop]: rule }
    }
  }
}
