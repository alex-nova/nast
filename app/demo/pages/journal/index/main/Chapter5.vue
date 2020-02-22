<template>
  <div class="main-chapter1">
    <div class="chapter-title">
      Перечень специальных журналов работ
    </div>
    <n-table :columns="columns" :data="data">
      <template #tools="{item}">
        <n-link :to="item.link"><n-button icon="eye" /></n-link>
      </template>
    </n-table>
  </div>
</template>

<script>
export default {
  name: 'MainChapter5',
  data: () => ({
    columns: [
      { name: 'name', title: 'Наименование', },
      { name: 'createdAt', title: 'Дата выдачи', },
      { name: 'responsible', title: 'Ответственный', },
      { name: 'endedAt', title: 'Дата сдачи-приемки', },
      { name: 'tools', title: '', },
    ],
    data: [
      { name: 'Журнал ухода за бетоном', createdAt: '10.11.2019', responsible: 'Гарматюк Игорь Васильевич', endedAt: '', link: { name: 'journals.j1', }, },
      { name: 'Журнал бетонных работ', createdAt: '10.11.2019', responsible: 'Гарматюк Игорь Васильевич', endedAt: '', link: { name: 'journals.j2', }, },
    ],
  }),
}
</script>

<style lang="scss" scoped>
  .main-chapter1 {
  
  }
</style>
