<template>
  <div class="tab-info">
    <n-loader :loading="$var('loading')" />
    <n-divide class="tools">
      <div></div>
      <div><n-button>Добавить материал</n-button></div>
    </n-divide>
    <n-table :columns="columns" :data="data" />
  </div>
</template>

<script>
export default {
  name: 'TabMaterials',
  props: [ 'model', 'form', ],
  data() {
    return {
      data: [],
      columns: [
        { title: 'Название', },
        { title: 'Ед. измерения', },
        { title: 'Количество', },
        { title: 'Дополнительная информация', },
        { title: '', },
      ],
    }
  },
  created() {
    this.$var('loading', true)
    setTimeout(() => {
      this.$var('loading', false)
    }, 400)
  },
}
</script>

<style lang="scss" scoped>
  .tab-info {
    font-size: .9em;
    .tools {
      margin-bottom: 10px;
    }
  }
</style>
