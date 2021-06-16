# Boardroom

## DhtmlxScheduler v4.1.0

Plugins(`public/static/dhtmlxScheduler`):

- `dhtmlxscheduler.css` -> `scheduler.css`
- `dhtmlxscheduler.js` -> `scheduler.js`
- `dhtmlxscheduler_timeline.js` -> `timeline.js`
- `dhtmlxscheduler_treetimeline.js` -> `treetimeline.js`
- `dhtmlxscheduler_collision.js` -> `collision.js`
- `dhtmlxscheduler_limit.js` -> `limit.js`
- `dhtmlxscheduler_tooltip.js` -> `tooltip.js`
- `locale_cn.js`

ES6 import: `components/scheduler/index.js`

Bugs(fix: reload `scheduler`):
- `scheduler` global sharing
- `scheduler` event repeated rendering
  - fix: `scheduler.clearAll()`

## TODO

- [X] Time out of bounds
- [X] Form validate
- [X] Form default(`orgId`/`contacts`/`mobile`)
- [ ] Form modify
- [X] Submit dialog
- [X] Blocked tips
- [X] Org filter
- [X] Secret dialog
- [X] Legends
- [ ] Base info components
- [X] `boardroom` does not exist for booking
- [X] Event/Marked color
- [X] Condition
- [X] Remark position
- [X] Event modify: move/resize
- [X] Event cancel: icon
- [ ] Notice
- [ ] Opt: event cancel icon
- [ ] Style

## Files

- [X] static/dhtmlxScheduler
- [X] components/scheduler

- [X] booking.vue
- [X] statistics.vue

- [X] edit.vue
- [X] item.vue
- [X] rules.js
- [ ] timeline.vue
  - [ ] style: remove `scoped` and add 5 `../`
- [X] view.vue
