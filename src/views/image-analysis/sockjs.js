import SockJS from 'sockjs-client'
// import Stomp from 'stompjs'

export default {
  data() {
    return {
      sock: null
    }
  },
  mounted() {
    /* let lock = false
    const ws = new WebSocket('ws://localhost:9718/notify')
    ws.addEventListener('open', event => {
      console.log('socket is open', event)
    })

    ws.addEventListener('message', event => {
      console.debug('Message for server', event)
      !lock && ws.send('gui')
      lock = true
    }) */

    this.sock = new SockJS('http://localhost:9718/notify')
    this.sock.onopen = () => {
      console.debug('client open')
      // this.sock.send('test')
    }

    this.sock.onmessage = e => {
      console.debug('client message:', e.data)
      // sock.close()
      this.handleNotify(e.data)
    }

    this.sock.onclose = function() {
      console.debug('client close...')
    }

    /* const client = Stomp.over(sock)
    client.connect({}, frame => {
      console.debug('frame:', frame)
      client.subscribe('/topic/notification', data => {
        console.log('subscribe:', data)
      })
    }, err => {
      console.error('Client error:', err)
    }) */
  }
}
