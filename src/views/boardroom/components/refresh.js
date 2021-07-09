export default {
  data() {
    return {
      timer: null
    }
  },
  mounted() {
    this.timer = setInterval(this.handleData, 2 * 1000)
  },
  destroyed() {
    clearInterval(this.timer)
  }
}
