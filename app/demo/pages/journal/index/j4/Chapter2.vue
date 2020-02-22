<template>
  <div class="main-chapter1">
    <div class="chapter-title">Первый лист журнала технического надзора</div>
    <n-items>
      <n-input title="Генеральный подрядчик" :value="data.q3" text />
    </n-items>
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
      { name: 'one', title: 'Наименование организации', },
      { name: 'two', title: 'Почтовый адресс', },
      { name: 'three', title: 'Наименование выполняемых работ', },
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
