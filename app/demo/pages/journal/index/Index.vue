<template>
  <div class="page-journal">
    <n-card :loading="$var('loadProjects')">
      <n-select title="Проект" :data="projects" :value.sync="project" option-title="name" selected-title="name" item-value="id" inline />
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
        <template #chapter3>
          <MainChapter3 />
        </template>
        <template #chapter4>
          <MainChapter4 :project="project" />
        </template>
        <template #chapter5>
          <MainChapter5 :project="project" />
        </template>
        <template #chapter6>
          <MainChapter6 />
        </template>
        <template #chapter7>
          <MainChapter7 />
        </template>
        <template #info>
          <MainInfo />
        </template>
      </n-tabs-content>
    </n-card>
  </div>
</template>

<script>
import MainChapter1 from './main/Chapter1'
import MainChapter2 from './main/Chapter2'
import MainChapter3 from './main/Chapter3'
import MainChapter4 from './main/Chapter4'
import MainChapter5 from './main/Chapter5'
import MainChapter6 from './main/Chapter6'
import MainChapter7 from './main/Chapter7'
import MainInfo from './main/Info'

export default {
  name: 'PageJournal',
  components: { MainInfo, MainChapter7, MainChapter6, MainChapter5, MainChapter4, MainChapter3, MainChapter2, MainChapter1, },
  data: () => ({
    tabs: [
      { name: 'chapter1', title: 'Раздел 1', },
      { name: 'chapter2', title: 'Раздел 2', },
      { name: 'chapter3', title: 'Раздел 3', },
      { name: 'chapter4', title: 'Раздел 4', },
      { name: 'chapter5', title: 'Раздел 5', },
      { name: 'chapter6', title: 'Раздел 6', },
      { name: 'chapter7', title: 'Раздел 7', },
      { name: 'info', title: 'Правила', },
    ],
  
    projects: [],
    project: undefined,
  }),
  watch: {
    project(value) {
      if (value) {
        $app.store.mutation('app.project', this.project)
      }
    },
  },
  created() {
    this.loadProjects()
  },
  methods: {
    loadProjects() {
      this.$var('loadProjects', true)
      $api.my.projects().then((response) => {
        this.projects = response.data.content
        if ($app.store.state('app.project')) {
          this.project = $app.store.state('app.project')
        } else {
          this.project = this.projects[0]
        }
      }).finally(() => {
        this.$var('loadProjects', false)
      })
    },
  },
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
      position: relative;
    }
  }
</style>
