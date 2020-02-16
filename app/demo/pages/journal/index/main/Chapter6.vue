<template>
  <div class="main-chapter1">
    <div class="chapter-title">
      Замечания лиц, контролирующих производство строительно-монтажных работ и их безопасность
    </div>
    <n-table :columns="columns" />
  </div>
</template>

<script>
export default {
  name: 'MainChapter6',
  data: () => ({
    columns: [
      { name: 'one', title: 'Дата', },
      { name: 'one1', title: 'Должность, фамилия, инициалы лица, контролирующего производство и безопасность работ', },
      { name: 'one2', title: 'Замечание лица, контролирующего производство и безопасность работ, либо ссылка на предписание об устранении замечаний', },
      { name: 'one3', title: 'Отметка о принятии замечаний к исполнению и об их устранении', },
    ],
  }),
}
</script>

<style lang="scss" scoped>
  .main-chapter1 {
  
  }
</style>
