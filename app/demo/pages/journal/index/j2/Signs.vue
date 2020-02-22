<template>
  <div class="main-chapter1">
    <div class="chapter-title">Подписи</div>
    <n-items>
      <!--      (подпись) -->
      <n-input title="Представитель технического надзора" text />
      <!--      (подпись) -->
      <n-input title="Представитель авторского надзора" text />
      <!--      (фамилия, инициалы, подпись)-->
      <n-input title="Начальник участка (ст. прораб)" text />
      <!--      (фамилия, инициалы, подпись)-->
      <n-input title="Начальник производственно-технического отдела" text />
    </n-items>
  </div>
</template>

<script>
export default {
  name: 'MainSigns',
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
      lab: 'Руководитель, Комбатуров С.Т.',
      lab1: 'Лаборант, Иванов Н.Н.',
      gpName: 'ТОО "Компания Ген. Подрядчик"',
      smr: '20.02.2019 №31203',
      gpMan: 'Начальник, Комбатуров С.Т.',
      gpr: 'ТОО "Компания Ген. Проектировщик", Главный инженер Акижанов Д.А.',
      client: 'ТОО "Комапния Заказчик", Руководитель Боранбаев М.С.',
      tn: 'ТОО "Комапния Тех. Надзор", Руководитель Иванов Н.Н.',
      date: '20.12.2019',
      org: 'ТОО "Компания", 10.10.2019, №2391239',
    },
  }),
}
</script>

<style lang="scss" scoped>
  .main-chapter1 {
  
  }
</style>
