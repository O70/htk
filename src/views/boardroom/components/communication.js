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
      stompClient: null
    }
  },
  methods: {
    connect() {
      const socket = new SockJS('http://localhost:8037/gs-guide-websocket')
      this.stompClient = Stomp.over(socket)
      this.stompClient.connect({}, frame => {
        console.log('Connected:', frame)
        this.stompClient.subscribe('/topic/greetings', greeting => {
          console.log(typeof greeting, greeting)
          this.data = JSON.parse(greeting.body)
          this.data = (greeting.body)
        })
      })
    },
    disconnect() {
      this.stompClient && this.stompClient.disconnect()
      console.log('Disconnected')
    },
    send() {
      console.debug('send:', this.stompClient)
      this.stompClient && this.stompClient.send('/app/hello', {}, JSON.stringify({ name: this.msg }))
    }
  }
}
