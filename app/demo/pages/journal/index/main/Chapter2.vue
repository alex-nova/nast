<template>
  <div class="main-chapter1">
    <div class="chapter-title">Список инженерно-технического персонала, занятого на строительстве объекта</div>
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
      { name: 'one', title: 'Должность, фамилия, инициалы, участок работ', },
      { name: 'two', title: 'Дата начала работ на строительстве объекта', },
      { name: 'three', title: 'Отметка о получении разрешения на право производства работ, о прохождении аттестации', },
      { name: 'four', title: 'Дата окончания работ на строительстве объекта', },
    ],
    peoples: [
      { id: 1, fullName: 'Боранбаев Мақсат Серікұлы', position: 'Проектировщик', },
      { id: 2, fullName: 'Гарматюк Игорь Васильевич', position: 'Строитель', },
      { id: 3, fullName: 'Гаркушкин Михаил Иванович', position: 'Мастер', },
      { id: 4, fullName: 'Осипов Владимир Николаевич', position: 'Сварщик', },
      { id: 5, fullName: 'Иванов Николай Николаевич', position: 'Проектировщик', },
      { id: 6, fullName: 'Акижанов Дархан Амиргалыевич', position: 'Сварщик', },
      { id: 7, fullName: 'Комбатуров Сагандык Толегенович', position: 'Прораб', },
    ],
  }),
}
</script>

<style lang="scss" scoped>
  .main-chapter1 {
  
  }
</style>
