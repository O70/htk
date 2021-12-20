import SockJS from 'sockjs-client'
import { notifyAddress } from '@/api/htk'

export default {
  data() {
    return {
      sock: null
    }
  },
  mounted() {
    notifyAddress().then(({ data }) => this.init(data))
  },
  beforeDestroy() {
    this.sock && this.sock.close()
  },
  methods: {
    init(ip) {
      console.log('ip:', ip)
      this.sock = new SockJS(`http://${ip}:9716/notify`)
      // this.sock = new SockJS(`http://${'localhost'}:9716/notify`)
      this.sock.onopen = () => console.log('client open.')
      this.sock.onmessage = e => this.showNotify(e.data)
      this.sock.onclose = () => console.debug('client close.')
    },
    startAnalysis(data) {
      this.sock.send(data)
    },
    showNotify(data) {
      const { id, state } = JSON.parse(data)
      const msg = this.getMessage(id)
      this.$notify({
        title: '提示',
        dangerouslyUseHTMLString: true,
        message: `<b>${msg}</b>分析${state ? '完成' : '失败'}!`,
        type: state ? 'success' : 'error'
      })
    }
  }
}
