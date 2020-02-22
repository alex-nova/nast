<template>
  <div class="main-chapter1">
    <div class="chapter-title">
      Замечания лиц, контролирующих производство строительно-монтажных работ и их безопасность
    </div>
    <div style="margin: 10px 0; text-align: right">
      <n-link :to="{name: 'journals.j3',}" style="margin-right: 10px;"><n-button>Журнал авторского надзора</n-button></n-link>
      <n-link :to="{name: 'journals.j4',}"><n-button>Журнал технического надзора</n-button></n-link>
    </div>
    <n-table :columns="columns" :data="data" />
  </div>
</template>

<script>
export default {
  name: 'MainChapter6',
  data: () => ({
    columns: [
      { name: 'createdAt', title: 'Дата', },
      { name: 'author', title: 'Лицо контролирующее производство и безопасность работ', },
      { name: 'record', title: 'Замечание, либо ссылка на предписание об устранении замечаний', },
      { name: 'one3', title: 'Отметка о принятии замечаний к исполнению и об их устранении', },
    ],
    data: [
      { createdAt: '10.01.2020', author: 'ТОО "Комапния Тех. Надзор", Иванов Н.Н.', record: 'Неправильно сделано', },
    ],
  }),
}
</script>

<style lang="scss" scoped>
  .main-chapter1 {
  
  }
</style>
