<template>
  <div class="main-chapter1">
    <div class="chapter-title">
      Записи
    </div>
    <n-table :columns="columns" :data="data">
      <template #createdAt="{item}">
        {{ $app.date.format(item.createdAt, 'date') }}
      </template>
      <template #weather="{item}">
        {{ item.weather + ' ' + item.temp + ' ' + item.wind }}
      </template>
      <template #one4="{item}">
        <span style="white-space: nowrap">{{ item.percent }}% {{ item.done }}</span>
      </template>
      <template #one6>
        <span style="white-space: nowrap">Боранбаев М.С.</span>
      </template>
      <template #tools="{item}">
        <n-link :to="{query: { modal: 'record', id: item.id,}}"><n-button icon="eye" /></n-link>
      </template>
    </n-table>
  </div>
</template>

<script>
export default {
  name: 'MainChapter4',
  data: () => ({
    columns: [
      { name: 'name', title: 'Наименование забетонированной части сооружения', },
      { name: 'content', title: 'Объем бетона', },
      { name: 'weather', title: 'Модуль поверхности, м2/м3', },
      { name: 'one3', title: 'Метод выдерживания бетона', },
      { name: 'one4', title: 'Дата и время окончания укладки бетона', },
      { name: 'one5', title: 'Начало выдерживания бетона', },
      { name: 'tools', title: '', },
    ],
    data: [],
  }),
}
</script>

<style lang="scss" scoped>
  .main-chapter1 {
  
  }
</style>
