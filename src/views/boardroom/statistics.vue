<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="card-header">
        <el-date-picker
          ref="picker"
          v-model="now"
          :clearable="false"
          size="mini"
        />
        <div class="thx-legend">
          <span class="thx_event_pending" />审批中
          <span class="thx_event_completed" />审批通过
        </div>
      </div>

      <br-timeline
        :height="`${height}px`"
        :dx="250"
        :now="now"
        :units="units"
        render="tree"
        readonly
        @view-changed="handleViewChange"
      />
    </el-card>

    <el-drawer
      :visible.sync="drawer.visible"
      :with-header="false"
    >
      <br-view :data="drawer.room" />
    </el-drawer>
  </div>
</template>
<script>
import { serverTime, getBoardrooms, getBookEvents } from '@/api/boardroom'

export default {
  components: {
    BrTimeline: () => import('./components/timeline'),
    BrView: () => import('./components/view')
  },
  data() {
    return {
      props: {
        key: 'id',
        label: 'name',
        children: 'children'
      },
      height: 0,
      occupy: 20 * 2 + 5 * 2 + 1 + 2,
      now: null,
      units: [],
      rooms: [],
      remarks: [],
      Link: null,
      drawer: {
        visible: false,
        room: {}
      }
    }
  },
  mounted() {
    Promise.all([
      serverTime(),
      getBoardrooms(),
      this.getLink()
    ]).then(([{ data: now }, { data }, link]) => {
      this.rooms = data
        .map(({ [this.props.children]: childs }) => childs)
        .reduce((acc, cur) => [...acc, ...cur], [])

      this.remarks = data.filter(({ remark }) => remark)
        .map(({ [this.props.key]: key, remark: text }) => ({ key, text, css: 'thx_event_tips' }))

      const label1 = (k, l) => `<span id="${k}" class="section-room">${l}</span>`
      this.units = data.map(({
        [this.props.key]: key,
        [this.props.label]: label,
        [this.props.children]: children
      }) => ({
        key,
        label,
        open: true,
        children: children.map(({
          [this.props.key]: key,
          [this.props.label]: label
        }) => ({ key, label: label1(key, label) }))
      }))

      this.Link = link
      this.now = new Date(now)
    })
  },
  updated() {
    this.$nextTick(() => {
      const bodyHeight = document.body.clientHeight
      // const navHeight = document.querySelector('.navbar')?.clientHeight || 0
      const navbar = document.querySelector('.navbar')
      const navHeight = navbar ? navbar.clientHeight : 0

      const headerHeight = document.querySelector('.card-header').clientHeight
      this.height = bodyHeight - navHeight - headerHeight - this.occupy
    })
  },
  methods: {
    async getLink() {
      const vue = await import('vue').then(({ default: v }) => v)
      return vue.extend({
        props: ['value', 'handler', 'viewer'],
        render(c) {
          const attrs = {
            underline: false
          }
          return c('div', {
            style: {
              textAlign: 'left'
            }
          }, [
            c('el-link', {
              attrs: {
                ...attrs,
                type: 'primary'
              },
              on: {
                click: () => this.handler(this.value.id)
              }
            }, this.value.text),
            c('el-link', {
              attrs: attrs,
              style: {
                marginLeft: '5px'
              },
              on: {
                click: () => this.viewer(this.value.id)
              }
            }, [c('i', { class: 'el-icon-view' })])
          ])
        }
      })
    },
    handleViewChange({ events: addEvents }) {
      this.loadEvents(addEvents).then(() => {
        const els = document.querySelectorAll('.section-room')
        const rooms = []
        els.forEach(({ id, innerText: text }) => rooms.push({ id, text }))
        rooms.forEach(({ id, text }) =>
          new this.Link({
            propsData: {
              value: { id, text },
              handler: rid => this.$router.push({
                path: '/boardroom/booking',
                query: { rid, start: this.now.getTime() }
              }),
              viewer: rid => {
                this.drawer.room = this.rooms.find(({ [this.props.key]: id }) => id === rid)
                this.drawer.visible = true
              }
            }
          }).$mount(document.getElementById(id))
        )
      })
    },
    async loadEvents(addEvents) {
      const [y, m, n] = [this.now.getFullYear(), this.now.getMonth(), this.now.getDate()]
      const remarks = this.remarks.map(it => ({
        ...it,
        start: new Date(y, m, n, 7),
        end: new Date(y, m, n, 23)
      }))

      const date = this.$refs.picker.formatToString(this.now)
      const { data = [] } = await getBookEvents(date)

      const events = data.map(({ roomId, startTime, endTime, state }) => ({
        key: roomId,
        start: new Date(startTime),
        end: new Date(endTime),
        css: state === 20 ? 'thx_event_completed' : 'thx_event_pending'
      }))
      addEvents([...remarks, ...events])
    }
  }
}
</script>
<style lang="scss" scoped>
.el-card {
  ::v-deep .el-card__header {
    padding: 5px;
    text-align: center;
  }
  ::v-deep &__body {
    padding: 0;
  }

  .thx-legend {
    display: -webkit-flex;
    display: flex;
    margin: 0 10px;
    line-height: 22px;
    float: right;
    span {
      margin: 0 5px;
      width: 22px;
      height: 22px;
      display: block;
    }
  }
}
</style>
