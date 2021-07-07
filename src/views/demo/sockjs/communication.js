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
        sockjs: 'http://localhost:8037/gs-guide-websocket',
        subscribe: '/topic/greetings',
        send: '/app/hello'
      },
      stompClient: null
    }
  },
  methods: {
    connect() {
      const socket = new SockJS(this.urls.sockjs)
      this.stompClient = Stomp.over(socket)
      this.stompClient.connect({}, frame => {
        this.stompClient.subscribe(this.urls.subscribe, greeting => {
          this.data = JSON.parse(greeting.body)
          this.data = (greeting.body)
        })
      })
    },
    disconnect() {
      this.stompClient && this.stompClient.disconnect()
    },
    send() {
      this.stompClient && this.stompClient.send(this.urls.send, {}, JSON.stringify({ name: this.msg }))
    }
  }
}
