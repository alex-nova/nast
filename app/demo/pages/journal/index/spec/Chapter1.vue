<template>
  <div class="main-chapter1">
    <div class="chapter-title">Общие сведения</div>
    <n-items v-if="project">
      <n-input title="Строительная организация" :value="data.gpName" text />
      <n-input title="Наименование объекта строительства" :value="project.name" text />
      <n-input title="Место нахождения объекта строительства" :value="project.address" text />
      <n-input title="Начальник лаборатории, ответственный за ведение журнала" :value="data.lab" text />
      <n-input title="Лаборант" :value="data.lab1" text />
    </n-items>
  </div>
</template>

<script>
export default {
  name: 'MainChapter1',
  props: [ 'project', ],
  data: () => ({
    subcontractors: [
      { name: '', bin: '', works: '', },
    ],
    columns: [
      { name: 'name', title: 'Наименование', },
      { name: 'bin', title: 'БИН', },
      { name: 'works', title: 'Работы', },
    ],
    columnsRecords: [
      { name: 'date', title: 'Дата', },
      { name: 'record', title: 'Пояснение', },
    ],
    data: {
      // lab: 'Руководитель, Комбатуров С.Т.',
      // lab1: 'Лаборант, Иванов Н.Н.',
      // gpName: 'ТОО "Компания Ген. Подрядчик"',
      // smr: '20.02.2019 №31203',
      // gpMan: 'Начальник, Комбатуров С.Т.',
      // gpr: 'ТОО "Компания Ген. Проектировщик", Главный инженер Акижанов Д.А.',
      // client: 'ТОО "Комапния Заказчик", Руководитель Боранбаев М.С.',
      // tn: 'ТОО "Комапния Тех. Надзор", Руководитель Иванов Н.Н.',
      // date: '20.12.2019',
      // org: 'ТОО "Компания", 10.10.2019, №2391239',
    },
  }),
}
</script>

<style lang="scss" scoped>
  .main-chapter1 {
  
  }
</style>
