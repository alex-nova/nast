<template>
  <div class="page-journal">
    <!--    <n-card>-->
    <!--      <n-select title="Проект" :data="projects" :value.sync="project" inline />-->
    <!--    </n-card>-->
    
    <n-card :loading="$var('loadJournal')">
      <n-tabs :data="tabs" />
      <n-tabs-content v-if="project.id" class="content">
        <template #chapter1>
          <MainChapter1 :project="project" />
        </template>
        <template #chapter2>
          <MainChapter2 :project="project" />
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
    project: {},
  }),
  created() {
    this.loadProject()
    this.loadJournal()
  },
  methods: {
    loadProject() {
      this.$var('loadJournal', true)
      $api.projects.get(this.$route.params.projectId).then((response) => {
        this.project = response.data.content
      }).finally(() => {
        this.$var('loadJournal', false)
      })
    },
    loadJournal() {
      this.$var('loadJournal', true)
      $api.journals.get(this.$route.params.id).then((response) => {
        this.journal = response.data.content
        $app.router.setPage({ title: this.journal.title, })
      }).finally(() => {
        this.$var('loadJournal', false)
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
