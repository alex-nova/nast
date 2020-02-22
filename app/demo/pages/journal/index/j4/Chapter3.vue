<template>
  <div class="main-chapter1">
    <div class="chapter-title">
      Второй лист журнала технического надзора<br />
      Состав группы технического надзора
    </div>
    <n-table :columns="columns" :data="peoples">
      <template #one="{item}">
        {{ item.position }}<br />
        {{ item.fullName }}
      </template>
      <template #two>
        12.11.2019
      </template>
      <template #four>
        -
      </template>
    </n-table>
  </div>
</template>

<script>
export default {
  name: 'MainChapter2',
  data: () => ({
    columns: [
      { name: 'one', title: 'Ф.И.О.', },
      { name: 'two', title: 'Должность, место работы', },
      { name: 'three', title: 'Работа, по которой осуществляется технический надзор', },
      { name: 'four', title: 'Дата и номер приказа о включении в состав группы технического надзора', },
    ],
    peoples: [],
    data: {
      g3: 'ТОО "Компания Ген. Подрядчик", Достык 23б',
    },
  }),
}
</script>

<style lang="scss" scoped>
  .main-chapter1 {
  
  }
</style>
