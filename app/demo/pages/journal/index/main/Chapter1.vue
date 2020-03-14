<template>
  <div class="main-chapter1">
    <div class="chapter-title">Общие сведения</div>
    <n-items>
      <n-input title="Наименование генерального подрядчика либо застройщика" :value="data.gpName" text />
      <n-input title="Наименование объекта строительства" :value="project.name" text />
      <n-input title="Место нахождения объекта строительства" :value="project.address" text />
      <!--   дата* номер, наименование уведомляемого органа   -->
      <n-input title="Уведомление о начале строительно-монтажных работ" :value="data.smr" text />
      <!--      Должность, фамилия, инициалы и подпись -->
      <n-input title="Лицо ответственное за строительство объекта и ведение журнала производства, работ" :value="data.gpMan" text />
      <!--      фамилия, инициалы и подпись главного инженера проекта-->
      <n-input title="Генеральная проектная организация" :value="data.gpr" text />
      <!--      должность, фамилия, инициалы и подпись руководителя-->
      <n-input title="Заказчик, застройщик" :value="data.client" text />
      <!--      должность, фамилия, инициалы и подпись руководителя (представителя)-->
      <n-input title="Технический надзор" :value="data.tn" text />
      <div>Начало работ</div><br />
      <n-input title="по плану (договору)" value="12.11.2019" text inline />
      <n-input title="фактически" value="17.12.2019" text inline /><br />
      <div>Окончание работ (ввод в эксплуатацию)</div><br />
      <n-input title="по плану (договору)" value="10.12.2020" text inline />
      <n-input title="фактически" text inline />
      <n-input title="Должность, фамилия, инициалы и подпись руководителя организации, выдавшего журнал" :value="data.vj" text />
      <n-input title="Дата выдачи журнала, печать организации" :value="data.date" text />
      <!--   мощность, производительность, полезная площадь, вместимость и т.п. и сметная стоимость   -->
      <n-input title="Основные показатели объекта строительства" text />
      <!--      дата и номер постановления (решения, приказа)-->
      <n-input title="Наименование органа, утвердившего проектную документацию" :value="data.org" text />
      
      <span>Субподрядные организации и выполняемые ими работы</span>
      <n-table :columns="columns" />
      <span>Субподрядные проектные организации, выполнившие разделы (части) проекта </span>
      <n-table :columns="columns" />
      <span>Отметки об изменениях в записях в данном разделе</span>
      <n-table :columns="columnsRecords" />
    </n-items>
  </div>
</template>

<script>
export default {
  name: 'MainChapter1',
  props: {
    project: { type: Object, default: () => ({}), },
  },
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
  }),
  computed: {
    data() {
      return {
        gpName: 'ТОО "Компания Ген. Подрядчик"',
        smr: '20.02.2019 №31203',
        gpMan: 'Начальник, Комбатуров С.Т.',
        gpr: 'ТОО "Компания Ген. Проектировщик", Главный инженер Акижанов Д.А.',
        client: 'ТОО "Комапния Заказчик", Руководитель Боранбаев М.С.',
        tn: 'ТОО "Комапния Тех. Надзор", Руководитель Иванов Н.Н.',
        vj: 'Начальник, Комбатуров С.Т.',
        date: $app.date.format($app.date.now(), 'date'),
        org: 'ТОО "Компания", 10.10.2019, №2391239',
      }
    },
  },
  watch: {
    project() {
      this.load()
    },
  },
  methods: {
    load() {
      
    },
  },
}
</script>

<style lang="scss" scoped>
  .main-chapter1 {
  
  }
</style>
