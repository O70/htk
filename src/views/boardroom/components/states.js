export default {
  methods: {
    isApproved(state) {
      return [20, 21].includes(state)
    },
    isApprovedNew(state) {
      return state === 20
    },
    isApprovedNotNew(state) {
      return state === 21
    }
  }
}
