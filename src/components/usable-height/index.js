export default {
  data() {
    return {
      height: 0
    }
  },
  computed: {
    usable() {
      const [excludes, occupy] = [this.excludes, this.occupy]
      !excludes && console.warn(`excludes is ${excludes}`)
      !occupy && console.warn(`occupy is ${occupy}`)

      return {
        excludes: excludes || [],
        occupy: occupy || 0
      }
    }
  },
  updated() {
    this.$nextTick(() => {
      const bodyHeight = document.body.clientHeight
      const { excludes, occupy } = this.usable
      const occupies = excludes.map(el => document.querySelector(el)).filter(el => el)
        .reduce((acc, cur) => acc + cur.clientHeight, occupy)
      this.height = bodyHeight - occupies
    })
  }
}
