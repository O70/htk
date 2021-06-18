import { getBookById } from '@/api/boardroom'

export default {
  data() {
    return {
      book: null
    }
  },
  created() {
    this.modify && getBookById(this.id).then(({ data }) => {
      let result = []
      if (data) {
        this.book = data
        const { roomId: id, roomName: name, mostNumber, startTime } = data
        result = [{ id, name, mostNumber }, new Date(startTime).getTime()]
      }
      return result
    }).then(this.handleData)
  },
  methods: {
    addBookEvent(now, addEvents) {
      if (!this.book) return

      const { startTime, endTime } = this.book
      const [start, end] = [new Date(startTime), new Date(endTime)]

      const [year, month, date] = [now.getFullYear(), now.getMonth(), now.getDate()]
      addEvents([{
        key: this.joinDate(start.getFullYear(), start.getMonth() + 1, start.getDate()),
        start: new Date(year, month, date, start.getHours(), start.getMinutes()),
        end: new Date(year, month, date, end.getHours(), end.getMinutes())
      }])
    }
  }
}
