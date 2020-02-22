<template>
  <div class="main-chapter1">
    <div class="chapter-title">
      Сведения о производстве строительно-монтажных работ с учетом
      результатов операционного контроля их качества
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
      { name: 'createdAt', title: 'Дата', },
      { name: 'content', title: 'Краткое описание строительно-монтажных работ, их месторасположение', },
      { name: 'weather', title: 'Состояние погоды и температура наружного воздуха', },
      { name: 'one3', title: 'Принимаемые меры в особых условиях', },
      { name: 'one4', title: 'Приемка выполненных СМР', },
      { name: 'one5', title: 'Результаты операционного контроля качества работ', },
      { name: 'one6', title: 'Оценка качества работ', },
      { name: 'tools', title: '', },
    ],
    data: [
      { id: 1, weather: 'Пасмурно', temp: '+10/0', wind: 'СВ 8-10 м/с', percent: '50', done: '', createdAt: Date.now(), one3: 'Использовался бетон с химическими добавками',
        content: 'Устройство гидроизоляции по бетонной подготовке ленточных ростверков фундаментов блока №4 в осях А/2-А/1-А/4 на отм. -4,200.', },
      { id: 2, weather: 'Пасмурно', temp: '+10/0', wind: 'СВ 8-10 м/с', percent: '34', done: '60м3', createdAt: Date.now(),
        content: 'Бетонирование столбчатых ростверков фундаментов блока №4', },
      { id: 3, weather: 'Пасмурно', temp: '+10/0', wind: 'СВ 8-10 м/с', percent: '35', done: '', createdAt: Date.now(),
        content: 'Армирование и монтаж опалубки столбчатых и ленточных ростверов фундаментов блока 4', },
      { id: 4, weather: 'Пасмурно', temp: '+10/0', wind: 'СВ 8-10 м/с', percent: '40', done: '', createdAt: Date.now(),
        content: 'Разработка грунта вручную под основание фундаментов блока №4 в осях Г-Д-8-9', },
      { id: 5, weather: 'Пасмурно', temp: '+10/0', wind: 'СВ 8-10 м/с', percent: '81', done: '100шт', createdAt: Date.now(),
        content: 'Забивка свай С-120.30-10 фундаментов блока №2', },
      { id: 6, weather: 'Пасмурно', temp: '+10/0', wind: 'СВ 8-10 м/с', percent: '48', done: '131 шт', createdAt: Date.now(),
        content: 'Срубка оголовков свай фундаментов блока №2 на отм -4,150', },
    ],
  }),
}
</script>

<style lang="scss" scoped>
  .main-chapter1 {
  
  }
</style>
