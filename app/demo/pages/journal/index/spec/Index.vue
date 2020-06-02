<template>
  <div class="page-journal">
    <n-card :loading="$var('loadProjects')">
      <n-select title="Проект" :data="projects" :value.sync="project" option-title="name" selected-title="name" item-value="id" inline />
    </n-card>
    <n-card :loading="$var('loadJournal')">
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
        this.loadJournal()
      }).finally(() => {
        this.$var('loadProjects', false)
      })
    },
    loadJournal() {
      this.$var('loadJournal', true)
      $api.journals.get(this.project.id, this.$route.params.journal).then((response) => {
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
