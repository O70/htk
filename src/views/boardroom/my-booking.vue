<template>
  <div class="app-container">
    <el-table
      stripe
      border
      :data="data"
    >
      <el-table-column type="index" align="center" />
      <el-table-column label="Data" align="center">
        <template slot-scope="scope">
          <el-tag
            v-for="it in Object.entries(scope.row)"
            :key="`${it[0]}-${it[1]}`"
            style="margin: 0 5px 5px 0;"
          >
            {{ it }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" width="50">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            icon="el-icon-edit"
            circle
            @click="handleEdit(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getMyBooks } from '@/api/boardroom'

export default {
  data() {
    return {
      data: []
    }
  },
  created() {
    getMyBooks().then(({ data }) => (this.data = data))
  },
  methods: {
    handleEdit({ id }) {
      this.$router.push(`/boardroom/booking/modify/${id}`)
    }
  }
}
</script>
