<template>
  <div class="main-chapter1">
    <div class="chapter-title">
      Перечень актов промежуточной приемки ответственных конструкций и освидетельствования скрытых работ
    </div>
    <n-table :columns="columns" />
  </div>
</template>

<script>
export default {
  name: 'MainChapter3',
  data: () => ({
    columns: [
      { name: 'one', title: 'Наименование акта (с указанием места расположения конструкций и работ)', },
      { name: 'two', title: 'Дата подписания акта, должности, фамилии, инициалы подписавших лиц', },
    ],
  }),
}
</script>

<style lang="scss" scoped>
  .main-chapter1 {
  
  }
</style>
