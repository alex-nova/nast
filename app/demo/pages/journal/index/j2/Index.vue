<template>
  <div class="page-journal">
    <n-card>
      <n-select title="Проект" :data="projects" :value.sync="project" inline />
    </n-card>
    
    <n-card>
      <n-tabs :data="tabs" />
      <n-tabs-content class="content">
        <template #chapter1>
          <MainChapter1 :project="project" />
        </template>
        <template #chapter2>
          <MainChapter2 />
        </template>
        <template #info>
          <MainInfo />
        </template>
        <template #signs>
          <MainSigns />
        </template>
      </n-tabs-content>
    </n-card>
  </div>
</template>

<script>
import MainChapter1 from './Chapter1'
import MainChapter2 from './Chapter2'
import MainInfo from './Info'
import MainSigns from './Signs'

export default {
  name: 'PageJournal',
  components: { MainSigns, MainInfo, MainChapter2, MainChapter1, },
  data: () => ({
    tabs: [
      { name: 'chapter1', title: 'Общие сведения', },
      { name: 'chapter2', title: 'Записи', },
      { name: 'info', title: 'Правила', },
      { name: 'signs', title: 'Подписи', },
    ],
  
    projects: [
      { title: 'Проект 1', value: 1, children: [
        { title: 'Проект 1', value: 11, address: 'Абая 31', },
        { title: 'Блок 1', value: 2, address: 'Абая 31а', },
        { title: 'Блок 2', value: 3, address: 'Абая 31б', },
        { title: 'Блок 3', value: 4, address: 'Абая 31в', },
      ], },
      { title: 'Проект 2', value: 5, children: [
        { title: 'Проект 2', value: 55, address: 'Жамбыла 12', },
        { title: 'Блок 1', value: 6, address: 'Жамбыла 12а', },
        { title: 'Блок 2', value: 7, address: 'Жамбыла 12б', },
        { title: 'Блок 3', value: 8, address: 'Жамбыла 12в', },
      ], },
    ],
    project: { title: 'Блок 2', value: 3, address: 'Абая 31б', },
  }),
}
</script>

<style lang="scss" scoped>
  .page-journal {
    &::v-deep {
      .chapter-title {
        font-size: 1.5em;
        text-align: center;
        margin: 30px auto 55px;
        max-width: 800px;
        font-weight: 300;
        line-height: 1.3;
      }
      .chapter-info {
        font-size: .9em;
        ul {
          list-style: decimal;
        }
        li {
          margin: 10px;
        }
      }
      .n-table {
        font-size: .9em;
      }
    }
    .content {
      padding: 20px 0 0;
    }
  }
</style>
