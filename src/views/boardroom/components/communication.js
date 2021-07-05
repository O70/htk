/**
 * - New
 * - Update(Cancel/Other...)
 * - Expired
 */
export default {
  data() {
    return {
      operations: {
        add: false,
        cancel: false,
        expired: false
      }
    }
  },
  watch: {
    operations: {
      deep: true,
      handler(val) {
        const { add, cancel, expired } = val
        if (add) {
          const first = this.data[0]
          this.data.splice(0, 0, Object.assign({}, first, { isNew: true }))
        }

        if (cancel) {
          const first = this.data[0]
          first.stateObj = {
            type: 'danger',
            label: '已取消'
          }
        } else {
          const first = this.data[0]
          first.stateObj = {
            type: 'success',
            label: '正常'
          }
        }

        if (expired) {
          const first = this.data[1]
          first.stateObj = {
            type: 'info',
            label: '已过期'
          }
        } else {
          const first = this.data[1]
          first.stateObj = {
            type: 'success',
            label: '正常'
          }
        }
      }
    }
  },
  created() {
    console.debug('communication....')
  }
}
