<template>
  <div class="main-chapter1">
    <div class="chapter-title">
      Перечень специальных журналов работ
    </div>
    <n-table :columns="columns" />
  </div>
</template>

<script>
export default {
  name: 'MainChapter5',
  data: () => ({
    columns: [
      { name: 'one', title: 'Наименование специального журнала работ и дата его выдачи', },
      { name: 'one1', title: 'Организация, ведущая специальный журнал работ, должность, фамилия, инициалы ответственного лица', },
      { name: 'one2', title: 'Дата сдачи-приемки специального журнала работ и подпись должностного лица', },
    ],
  }),
}
</script>

<style lang="scss" scoped>
  .main-chapter1 {
  
  }
</style>
