<template>
  <div class="main-chapter1">
    <div class="chapter-title">Титульный лист журнала авторского надзора</div>
    <n-items>
      <n-input title="Наименование объекта строительства" :value="project.title" text />
      <n-input title="Место нахождения объекта строительства" :value="project.address" text />
      <n-input title="Полная сметная стоимость строительства объекта" text />
      <!--      (наименование организации, почтовый адрес)-->
      <n-input title="Заказчик" :value="data.q3" text />
      <!--      (наименование организации, почтовый адрес)-->
      <n-input title="Генеральный проектировщик" :value="data.q4" text />
      <n-input title="Журнал начат" :value="data.q5" text />
      <n-input title="Журнал окончен" text />
      <n-input title="Руководитель генерального проектировщика (проектировщика)" :value="data.q7" text />
      <n-input title="Руководитель заказчика" :value="data.q8" text />
    </n-items>
  </div>
</template>

<script>
export default {
  name: 'MainChapter1',
  props: [ 'project', ],
  data: () => ({
    data: {
      q1: '',
      q2: '',
      q3: 'ТОО "Комапния Заказчик"',
      q4: 'ТОО "Компания Ген. Проектировщик"',
      q5: '12.11.2019',
      q6: '',
      q7: 'Главный инженер Акижанов Д.А.',
      q8: 'Руководитель Боранбаев М.С.',
    },
  }),
}
</script>

<style lang="scss" scoped>
  .main-chapter1 {
  
  }
</style>
