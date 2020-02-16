<template>
  <div class="main-chapter1">
    <div class="chapter-title">
      Сведения о проверках соблюдения требований нормативных документов при строительстве
    </div>
    <n-table :columns="columns" />
  </div>
</template>

<script>
export default {
  name: 'MainChapter7',
  data: () => ({
    columns: [
      { name: 'one', title: '№№ п/п', },
      { name: 'one', title: 'Наименование контролирующего (надзорного) органа', },
      { name: 'one', title: 'Номер и дата выдачи предписания', },
      { name: 'one', title: 'Должность проверяющего, фамилия, инициалы (состав группы проверяющих), руководителя проверки', },
      { name: 'one', title: 'Дата начала и окончания проверки', },
      { name: 'one', title: 'Наименование документа по результатам проверки и дата его составления', },
      { name: 'one', title: 'Подпись проверяющего (руководителя проверки)', },
      { name: 'one', title: 'Примечание', },
    ],
  }),
}
</script>

<style lang="scss" scoped>
  .main-chapter1 {
  
  }
</style>
