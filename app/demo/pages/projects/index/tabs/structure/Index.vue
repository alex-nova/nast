<template>
  <div class="tab-documents">
    <div class="wrapper">
      <div class="menu">
        <n-tabs :data="tabs" name="menu" state />
      </div>
      <div class="content">
        <n-tabs-content name="menu">
          <template #tree>
            <tab-tree :project="project" />
          </template>
          <template #works>
            В разработке.
            Пока работы доступны на вкладке "Структура проекта"
          </template>
          <template #supplies>
            В разработке.
            Пока материалы доступны на вкладке "Структура проекта"
          </template>
        </n-tabs-content>
      </div>
    </div>
  </div>
</template>

<script>
import TabTree from './tabs/tree/Index'

export default {
  name: 'TabDocuments',
  components: { TabTree, },
  props: [ 'project', ],
  data() {
    return {
      tabs: [
        { name: 'tree', title: 'Структура проекта', },
        // { name: 'works', title: 'Работы', },
        // { name: 'supplies', title: 'Материалы, затраты труда, механизмы', },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
  .tab-documents {
  
  }
</style>
