<template>
  <n-items class="tab-items">
  </n-items>
</template>

<script>
export default {
  name: 'TabItems',
  props: [ 'model', 'form', ],
  data() {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
  .tab-items {
    .table {
      font-size: .9em;
    }
  }
</style>
