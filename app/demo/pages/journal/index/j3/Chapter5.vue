<template>
  <div class="main-chapter1">
    <div class="chapter-title">
      Учетный лист журнала авторского надзора
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
      { name: 'one', title: 'Дата', },
      { name: 'two', title: 'Выявленные нарушения', },
      { name: 'three', title: 'Указания об устранении нарушений и требуемые сроки их выполнения', },
      { name: 'four', title: 'Автор записи', },
      { name: 'four1', title: 'Фамилия, инициалы (при его наличии) и должность лица ознакомившегося с записью, дата ознакомления', },
      { name: 'four2', title: 'Отметки о выполнении указаний', },
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
