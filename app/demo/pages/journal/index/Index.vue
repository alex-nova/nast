<template>
  <div class="page-journal">
    <n-card v-if="project">
      <n-input title="Проект" :value="project.title" text />
    </n-card>
    
    <n-card :loading="$var('load')">
      <n-tabs :data="tabs" :active.sync="activeTab" />
      <n-tabs-content v-if="project" class="content" :active.sync="activeTab">
        <template #chapter1>
          <MainChapter1 :project="project" />
        </template>
        <template #chapter2>
          <MainChapter2 :project="project" />
        </template>
        <template #chapter3>
          <MainChapter3 :project="project" />
        </template>
        <template #chapter4>
          <MainChapter4 :project="project" :journal="journal" />
        </template>
        <template #chapter5>
          <MainChapter5 :project="project" />
        </template>
        <template #chapter6>
          <MainChapter6 :project="project" />
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
    activeTab: 'chapter4',
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
    journal: null,
  }),
  computed: {
    projectId() {
      return this.$route.params.projectId
    },
  },
  created() {
    this.loadProject()
  },
  methods: {
    loadProject() {
      this.$var('load', true)
      $api.iq.projects.get(this.projectId).then((response) => {
        this.project = response.data.content
        this.loadJournal()
      }).catch(() => {
        this.$var('load', false)
      })
    },
    loadJournal() {
      this.$var('load', true)
      $api.journals.get(this.project.id, 'main').then((response) => {
        this.journal = response.data.content
        // $app.router.setPage({ title: this.journal.title, })
      }).finally(() => {
        this.$var('load', false)
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
