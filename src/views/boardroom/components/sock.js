/**
 * - New
 * - Update(Cancel/Other...)
 * - Expired
 */
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

export default {
  data() {
    return {
      urls: {
        sockjs: 'http://localhost:8037/websocket',
        subscribe: '/topic/book/updated'
      },
      client: null
    }
  },
  created() {
    const socket = new SockJS(this.urls.sockjs)
    this.client = Stomp.over(socket)
    this.client.connect({}, _ => {
      this.client.subscribe(this.urls.subscribe, res => {
        console.debug('res:', res)
      })
    })
  },
  destroyed() {
    this.client && this.client.disconnect()
  }
}
