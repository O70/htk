<template>
  <div class="content">
    <div v-for="it in Object.entries(data)" :key="it[0]">
      {{ it[0] }}: {{ it[1] }}
    </div>
    ************************************
    <div v-for="i in 100" :key="i">
      Base Info Components...{{ i }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
