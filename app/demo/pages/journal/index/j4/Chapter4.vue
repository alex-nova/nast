<template>
  <div class="main-chapter1">
    <div class="chapter-title">
      Третий лист журнала технического надзора<br />
      Регистрационный лист посещения объекта членами группы технического надзора
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
      { name: 'two', title: 'Место работы', },
      { name: 'three', title: 'Занимаемая должность', },
      { name: 'four', title: 'Номер телефона', },
      { name: 'four1', title: 'Дата прибытия', },
      { name: 'four2', title: 'Дата убытия', },
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
