import SockJS from 'sockjs-client'

export default {
  mounted() {
    const sock = new SockJS('http://localhost:9718/echo')
    sock.onopen = function() {
      console.debug('client open')
      sock.send('test')
    }

    sock.onmessage = function(e) {
      console.debug('client message:', e.data)
      // sock.close()
    }

    sock.onclose = function() {
      console.debug('client close...')
    }
  }
}
