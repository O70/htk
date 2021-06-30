export default {
  data() {
    return {
      height: 0
    }
  },
  computed: {
    usable() {
      const [excludes, occupy] = [this.excludes, this.occupy]
      excludes === undefined && console.warn('excludes is undefined')
      occupy === undefined && console.warn('occupy is undefined')

      return {
        excludes: [...new Set(['.navbar', ...(excludes || [])])],
        occupy: occupy || 0
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleHeight)
    this.handleHeight()
  },
  updated() {
    this.handleHeight()
  },
  methods: {
    handleHeight() {
      this.$nextTick(() => {
        const bodyHeight = document.body.clientHeight
        const { excludes, occupy } = this.usable
        const occupies = excludes.map(el => document.querySelector(el)).filter(el => el)
          .reduce((acc, cur) => acc + cur.clientHeight, occupy)
        this.height = bodyHeight - occupies
      })
    }
  }
}
