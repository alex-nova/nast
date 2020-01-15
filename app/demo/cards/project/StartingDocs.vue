<template>
  <div class="tab-info">
    <n-loader :loading="$var('loading')" />
    <n-divide class="tools">
      <div></div>
      <div><n-button>Добавить файл</n-button></div>
    </n-divide>
    <n-table :columns="columns" :data="data" />
  </div>
</template>

<script>
export default {
  name: 'TabStartingDocs',
  props: [ 'model', 'form', ],
  data() {
    return {
      data: [],
      columns: [
        { title: 'Название документа', },
        { title: 'Дата добавления', },
        { title: 'Дополнительная информация', },
        { title: 'Скачать файл', },
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
