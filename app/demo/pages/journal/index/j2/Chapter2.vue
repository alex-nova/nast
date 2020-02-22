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
      { name: 'name', title: 'Дата бетонирования', },
      { name: 'content', title: 'Наименование бетонируемой части сооружении и конструктивных элементов. Эскиз бетонируемой части сооружения с отметками в начале и в конце смены', },
      { name: 'weather', title: 'Класс бетона по прочности на сжатие', },
      { name: 'one3', title: 'Состав бетонной смеси и водоцементное отношение, № карточки подбора состава бетона', },
      { name: 'one4', title: 'Вид и активность цемента', },
      { name: 'one5', title: 'Подвижность бетонной смеси', },
      { name: 'one5', title: 'Температура смеси при укладке', },
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
