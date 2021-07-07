<template>
  <div class="app-container">
    <el-input v-model="msg" />

    <el-button type="primary" @click="connect">Connect</el-button>
    <el-button type="danger" @click="disconnect">Disconnect</el-button>
    <el-button type="success" @click="send">Send</el-button>

    <div>{{ data }}</div>
  </div>
</template>
<script>
import Communication from './communication'

export default {
  mixins: [Communication],
  data() {
    return {
      msg: null,
      data: null
    }
  }
}
</script>
