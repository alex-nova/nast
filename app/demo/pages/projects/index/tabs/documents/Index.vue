<template>
  <div class="tab-documents">
    <div class="wrapper">
      <div class="menu">
        <n-tabs :data="tabs" name="menu" state />
      </div>
      <div class="content">
        <n-tabs-content name="menu">
          <template #journals>
            <tab-journals :project="project" />
          </template>
          <template #acts>
            <tab-acts :project="project" />
          </template>
          <template #permits>
            В разработке.
            Пока документы доступны на вкладке "Все документы"
          </template>
          <template #psd>
            В разработке.
            Пока документы доступны на вкладке "Все документы"
          </template>
          <template #input>
            В разработке.
            Пока документы доступны на вкладке "Все документы"
          </template>
          <template #lab>
            В разработке.
            Пока документы доступны на вкладке "Все документы"
          </template>
          <template #execute>
            В разработке.
            Пока документы доступны на вкладке "Все документы"
          </template>
          <template #all>
            <tab-all :project="project" />
          </template>
        </n-tabs-content>
      </div>
    </div>
  </div>
</template>

<script>
import TabActs from './tabs/acts/Index'
import TabJournals from './tabs/journals/Index'
import TabAll from './tabs/all/Index'

export default {
  name: 'TabDocuments',
  components: { TabAll, TabJournals, TabActs, },
  props: [ 'project', ],
  data() {
    return {
      tabs: [
        { name: 'journals', title: 'Журналы', },
        { name: 'acts', title: 'Акты', },
        // { name: 'permits', title: 'Разрешительная документация', },
        // { name: 'psd', title: 'Проектно-сметная документация', },
        // { name: 'input', title: 'Входной контроль', },
        // { name: 'lab', title: 'Лабораторные испытания', },
        // { name: 'execute', title: 'Исполнительные схемы', },
        { name: 'all', title: 'Все документы', },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
  .tab-documents {
  
  }
</style>
