<template>
  <el-row type="flex" align="middle" class="navbar">
    <el-col :span="12">
      <h2>HTK</h2>
    </el-col>
    <el-col :span="12" align="right">
      <el-button type="warning" size="mini" @click="handleLogout">退出</el-button>
    </el-col>
  </el-row>
</template>
<script>
export default {
  methods: {
    async handleLogout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  padding: 0 20px;
}
</style>
