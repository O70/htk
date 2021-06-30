<template>
  <div class="app-container booking-form">
    <el-card class="timeline">
      <div slot="header" class="clearfix">
        <label>{{ boardroom.name || 'Unknown' }}</label>
      </div>

      <el-form ref="form" :rules="rules" size="mini">
        <el-form-item prop="dates">
          <br-timeline
            ref="brTimeline"
            :units="units"
            :readonly="modify"
            height="135px"
            @view-changed="handleViewChange"
            @drag-end="$refs.form.clearValidate()"
          />
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <br-edit
        ref="brEdit"
        :data="modifyObj"
        :capacity="boardroom.mostNumber"
        :style="{ height: `${height}px` }"
      />
    </el-card>

    <footer>
      <el-button size="small" type="primary" @click="handleSubmit">提交</el-button>
      <el-button size="small" @click="$router.go(-1)">返回</el-button>
    </footer>
  </div>
</template>
<script>
import UsableHeightMixin from '@/components/usable-height'
import Modify from './components/modify'
import { serverTime, getBoardroom, getBookMarks, saveBook, updateBook } from '@/api/boardroom'

export default {
  components: {
    BrTimeline: () => import('./components/timeline'),
    BrEdit: () => import('./components/edit')
  },
  mixins: [UsableHeightMixin, Modify],
  props: {
    // Boardroom id or Booking id
    id: {
      type: String,
      default: null
    },
    start: {
      type: String,
      default: null
    },
    modify: Boolean
  },
  data() {
    return {
      excludes: ['.booking-form .el-card.timeline', '.booking-form footer'],
      occupy: 5 * 2 + 20 * 2 + 10 * 2 + 4,
      units: [],
      boardroom: {},
      rules: {
        dates: {
          validator: (_, value, callback) => callback('请选择日期')
        }
      }
    }
  },
  computed: {
    modifyObj() {
      return this.book
    }
  },
  created() {
    !this.modify && getBoardroom(this.id)
      .then(({ data }) => [data, this.start]).then(this.handleData)
  },
  methods: {
    handleData([room, start]) {
      if (room) {
        this.boardroom = room
        this.handleUnits(start).then(units => (this.units = units))
      } else {
        this.handleRoute()
      }
    },
    handleRoute() {
      this.$router.push(this.modify ? '/boardroom/booking/my' : '/boardroom')
    },
    joinDate(y, m, d, cn) {
      const to = p => {
        const n = p.toString()
        return n.length > 1 ? n : `0${n}`
      }
      return cn ? `${y}年${m}月${d}日` : `${y}-${to(m)}-${to(d)}`
    },
    async handleUnits(start) {
      let timestamp = Number.parseInt(start)
      Number.isNaN(timestamp) && (timestamp = await serverTime().then(({ data: time }) => time))

      const begin = new Date(timestamp)
      const [year, month, date] = [begin.getFullYear(), begin.getMonth(), begin.getDate()]

      const units = [{
        key: this.joinDate(year, month + 1, date),
        label: this.joinDate(year, month + 1, date, true)
      }]
      for (let i = 1; i < 2; i++) {
        const next = new Date(year, month, date + i)
        const [y, m, d] = [next.getFullYear(), next.getMonth() + 1, next.getDate()]
        units.push({ key: this.joinDate(y, m, d), label: this.joinDate(y, m, d, true) })
      }

      return units
    },
    handleViewChange({ now, events: addEvents, marks: addMarks }) {
      this.addBookEvent && this.addBookEvent(now, addEvents)

      getBookMarks({
        roomId: this.boardroom.id,
        dates: this.units.map(({ key }) => key)
      }).then(({ data }) => {
        const [year, month, date] = [now.getFullYear(), now.getMonth(), now.getDate()]
        const marks = data.filter(it => it.id !== this.id)
        addMarks(marks.map(({ startTime, endTime, state }) => [
          new Date(startTime),
          new Date(endTime),
          state
        ]).map(([start, end, state]) => ({
          key: this.joinDate(start.getFullYear(), start.getMonth() + 1, start.getDate()),
          start: new Date(year, month, date, start.getHours(), start.getMinutes()),
          end: new Date(year, month, date, end.getHours(), end.getMinutes()),
          css: state === 20 ? 'thx_event_completed' : 'thx_event_pending'
        })))
      })
    },
    getBookEvents() {
      return new Promise((resolve, reject) => {
        const events = this.$refs.brTimeline.getNewEvents()
        if (events.length > 0) {
          resolve(events)
        } else {
          this.$refs.form.validateField(Object.keys(this.rules))
          reject()
        }
      })
    },
    emptyFunction() {
      return () => {}
    },
    handleSubmit() {
      Promise.all([
        this.$refs.brEdit.getFormData().then(data =>
          Object.assign(data, { roomId: this.boardroom.id })),
        this.getBookEvents()
      ]).then(([book, dates]) => this.handleSave({ book, dates }))
        .catch(this.emptyFunction)
    },
    handleSave(data) {
      const msg = (pre = '', items, post = '') => `
        ${pre}
        ${items.map(([start, end]) => `<div><strong>${start} 至 ${end}</strong></div>`).join('')}
        ${post}
        `
      const cfg = {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: true,
        dangerouslyUseHTMLString: true
      }
      const save = this.modify ? updateBook(data.book)
        : this.$confirm(msg('您预定的时间段为:',
          data.dates.map(({ start, end }) => [start, end]), '确认提交?'), '确认', cfg)
          .then(() => saveBook(data))
      save.then(({ code, message }) => code === 200
        ? this.handleRoute()
        : this.$alert(msg('以下时间段已被占用:', message), '提示', cfg).catch(this.emptyFunction))
        .catch(this.emptyFunction)
    }
  }
}
</script>
<style lang="scss" scoped>
.booking-form {
  .el-card {
    margin-bottom: 5px;

    ::v-deep .el-card__header {
      padding: 5px;
    }
    ::v-deep .el-card__body {
      padding: 10px;
    }
    &.timeline {
      ::v-deep .el-card__body {
        padding: 0;
      }
    }
  }

  form, .content {
    overflow-x: hidden;
    overflow-y: scroll;
  }

  footer {
    text-align: center;
  }
}
</style>
