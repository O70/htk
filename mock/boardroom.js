const locations = [
  {
    id: 'location-0',
    name: '主楼',
    remark: '260备有双投影、双幕布，分屏投影，请自带2台笔记本电脑'
  },
  {
    id: 'location-1',
    name: '科技会议中心',
    remark: '第一、第三、第六备有双投影、双幕布，分屏投影，请自带2台笔记本电脑'
  },
  {
    id: 'location-2',
    name: '数据中心'
  }
]

const rooms = [
  { name: '第四会议室(234)', locationId: 'location-0' },
  { name: '第五会议室(222、555)', locationId: 'location-0' },
  { name: '第九会议室(678)', locationId: 'location-0' },
  { name: '137圆桌会议室(137)', locationId: 'location-0', report: 1 },
  { name: '139视频会议室(139)', locationId: 'location-0', report: 0 },
  { name: '260阶梯会议室(260-261)', locationId: 'location-0' },
  { name: '第一会议室', locationId: 'location-1' },
  { name: '第二会议室', locationId: 'location-1' },
  { name: '第三会议室', locationId: 'location-1' },
  { name: '第六会议室', locationId: 'location-1' },
  { name: '第二会议室(917-919)', locationId: 'location-2' },
  { name: '第三会议室(921-923)', locationId: 'location-2' },
  { name: '第四会议室(999-999)', locationId: 'location-2' },
  { name: '第五会议室(999-999)', locationId: 'location-2' },
  { name: '第六会议室(999-999)', locationId: 'location-2' }
].map((it, i) => Object.assign(it, {
  id: `room-${i}`,
  computer: it.locationId === 'location-2' ? 0 : 1,
  mostNumber: 20 * i
}))

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 10; j++) {
    rooms.push({
      id: `BOARDROOM-${i}-${j}`,
      name: `Boardroom-${i}-${j}`,
      locationId: `location-${i}`,
      mostNumber: 32
    })
  }
}

const data = locations.map(it => Object.assign(it,
  { children: rooms.filter(({ locationId }) => locationId === it.id) }))

// eslint-disable-next-line
function sleep(delay) {
  for (var t = Date.now(); Date.now() - t <= delay;);
}

module.exports = [
  {
    url: '/api/thraex/server/time',
    type: 'get',
    response: _ => ({ code: 20000, data: Date.now() })
  },
  {
    url: '/api/thraex/orgs',
    type: 'get',
    response: _ => ({ code: 20000, data: new Array(50).fill('ORG').map((it, ind) => ({
      id: `org-${ind}`,
      name: `${it}-${ind}`
    })) })
  },
  {
    url: '/api/thraex/boardrooms/book/info',
    type: 'get',
    response: _ => {
      const data = {
        types: Array.of('普通会议', '科研会', '院务会', '其它').map((it, ind) => ({ id: `type-${ind}`, name: it })),
        leaders: new Array(10).fill('Leader').map((it, ind) => ({ id: `LEADER-${ind}`, name: `${it}-${ind}` }))
      }

      return { code: 20000, data }
    }
  },
  {
    url: '/api/thraex/boardrooms/book/events',
    type: 'get',
    response: config => {
      const { day: date } = config.query
      const nd = new Date(date)
      const [y, m, d] = [nd.getFullYear(), nd.getMonth(), nd.getDate()]
      const data = date === '2021-05-30' ? [] : rooms.map(({ id }, i) => ({
        id: `event-${i}`,
        roomId: id,
        startTime: new Date(y, m, d, 8),
        endTime: new Date(y, m, d, 10, 30),
        state: [10, 20][i % 2]
      }))

      return { code: 20000, data }
    }
  },
  {
    url: '/api/thraex/boardrooms/book/marks',
    type: 'get',
    response: config => {
      const { roomId, dates } = config.query
      const data = dates.map((it, i) => {
        const nd = new Date(it)
        const [y, m, d] = [nd.getFullYear(), nd.getMonth(), nd.getDate()]

        return {
          id: `mark-${i}`,
          roomId,
          startTime: new Date(y, m, d, 12),
          endTime: new Date(y, m, d, 13, 30),
          state: [10, 20][i % 2]
        }
      })

      return { code: 20000, data }
    }
  },
  {
    url: '/api/thraex/boardrooms/book',
    type: 'get',
    response: config => {
      console.debug(config.url)
      return { code: 20000, data: 'gui' }
    }
  },
  {
    url: '/api/thraex/boardrooms/book',
    type: 'post',
    response: config => {
      const { book: { roomId }, dates } = config.body
      return roomId === 'room-1'
        ? { code: 20006, message: dates.map(({ start, end }) => `${start}&${end}`).join(',') }
        : { code: 20000, data: dates.length }
    }
  },
  {
    url: '/api/thraex/boardrooms/group',
    type: 'get',
    response: _ => ({ code: 20000, data })
  },
  {
    url: '/api/thraex/boardrooms',
    type: 'get',
    response: config => {
      const id = config.url.split('/').reverse()[0]
      return { code: 20000, data: rooms.find(it => it.id === id) }
    }
  }
]
