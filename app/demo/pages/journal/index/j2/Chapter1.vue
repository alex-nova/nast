<template>
  <div class="main-chapter1">
    <div class="chapter-title">Общие сведения</div>
    <n-items>
      <n-input title="Строительная организация" :value="data.gpName" text />
      <n-input title="Наименование объекта строительства" :value="project.title" text />
      <n-input title="Место нахождения объекта строительства" :value="project.address" text />
      <!--      (фамилия, инициалы, подпись)-->
      <n-input title="Старший производитель работ, ответственный за объект" :value="data.lab" text />
    </n-items>
  </div>
</template>

<script>
export default {
  name: 'MainChapter1',
  props: [ 'project', ],
  data: () => ({
    data: {
      gpName: 'ТОО "Компания Ген. Подрядчик"',
      lab: 'Акижанов Д.А.',
    },
  }),
}
</script>

<style lang="scss" scoped>
  .main-chapter1 {
  
  }
</style>
