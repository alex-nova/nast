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
          <MainChapter2 :project="project" :journal="journal" />
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
    activeTab: 'chapter2',
    tabs: [
      { name: 'chapter1', title: 'Общие сведения', },
      { name: 'chapter2', title: 'Записи', },
      // { name: 'info', title: 'Правила', },
      // { name: 'signs', title: 'Подписи', },
    ],
    journal: null,
    project: null,
    projects: [],
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
      $api.journals.get(this.project.id, this.$route.params.journal).then((response) => {
        this.journal = response.data.content
        $app.router.setPage({ title: this.journal.title, })
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
