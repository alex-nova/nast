<template>
  <n-items class="tab-items">
    <n-input title="Работа" value="Заливка бетона" text />
    <n-input title="Объем работ" value="48% (12т)" text />
    <n-form-item title="Материалы" active>
      <n-table class="table" :columns="columns" :data="materials">
        <template #count="{item}">
          {{ item.count + ' ' + item.unit }}
        </template>
      </n-table>
    </n-form-item>
  </n-items>
</template>

<script>
export default {
  name: 'TabItems',
  props: [ 'model', 'form', ],
  data() {
    return {
      materials: [
        { id: 1, name: 'Бетон', unit: 'м3', count: 10, desc: '', },
      ],
      columns: [
        { title: 'Название', name: 'name', },
        { title: 'Количество', name: 'count', },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
  .tab-items {
    .table {
      font-size: .9em;
    }
  }
</style>
