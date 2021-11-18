import SockJS from 'sockjs-client'

export default {
  data() {
    return {
      sock: null
    }
  },
  mounted() {
    this.sock = new SockJS('http://localhost:9718/notify')
    this.sock.onopen = () => console.log('client open.')
    this.sock.onmessage = e => this.showNotify(e.data)
    this.sock.onclose = () => console.debug('client close.')
  },
  beforeDestroy() {
    this.sock.close()
  },
  methods: {
    startAnalysis(data) {
      this.sock.send(data)
    },
    showNotify(data) {
      const { id, type, label } = JSON.parse(data)
      const msg = this.getMessage(id)
      this.$notify({
        title: '提示',
        dangerouslyUseHTMLString: true,
        message: `<b>${msg}</b>分析${label}!`,
        type
      })
    }
  }
}
