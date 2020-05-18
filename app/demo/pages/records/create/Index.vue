<template>
  <div class="page-record-create">
    <div class="line">
      <n-card class="info" :loading="$var('load')">
        <template #header>
          <h3>Информация</h3>
        </template>
        <n-items>
          <n-input title="Проект" :value="project.name" text />
          <n-input title="Дата заполнения" :value="publishedAt" @input="(v) => publishedAt = v" />
        </n-items>
      </n-card>
  
      <block-works v-if="journal.name === 'main'" :project-id="projectId" class="items" @change="supplyChange" />
    </div>
    
    <n-card :loading="$var('load')">
      <template #header>
        <h3>{{ journal.title }}</h3>
      </template>
      <n-items>
        <template v-if="journal.front">
          <n-input v-for="field in journal.front.create" :key="field.name" :title="field.title" v-bind="$form.input(field.name)" />
        </template>
      </n-items>
    </n-card>
    
    <n-card>
      <n-divide>
        <div></div>
        <n-button color="success" :loading="$var('loadSubmit')" @click="submit">Сохранить</n-button>
      </n-divide>
    </n-card>
  </div>
</template>

<script>
import BlockWorks from './WorksBlock'

export default {
  name: 'PageRecordCreate',
  components: { BlockWorks, },
  data() {
    return {
      publishedAt: $app.date.format($app.date.now()),
      project: {},
      journal: {},
      fields: [],
      supply: null,
      signers: {},
      selectedSigners: {},
    }
  },
  computed: {
    projectId() {
      return this.$route.params.projectId
    },
    journalName() {
      return this.$route.params.journal
    },
  },
  created() {
    // $app.router.setPage({ data: { object: 'sd', project: 'dsfdf', }, })
    // $app.router.setPage('journals.index', { data: { journalName: this.$route.params.id, }, })
    this.loadInfo()
  },
  methods: {
    loadInfo() {
      this.$var('load', true)
      const promises = [
        $api.journals.get(this.projectId, this.journalName),
        $api.projects.get(this.projectId),
        $api.journals.records.getColumns(this.projectId, this.journalName, 'records'),
      ]
      Promise.all(promises).then((response) => {
        this.journal = response[0].data.content
        this.project = response[1].data.content
        this.fields = response[2].data.content
        this.$form.init({})
      }).finally(() => {
        this.$var('load', false)
      })
    },
    supplyChange(value) {
      this.supply = value
    },
    submit() {
      this.$var('loadSubmit', true)
      const data = {
        record: {
          ...this.$form.get(),
          publishedAt: this.publishedAt,
          ...$n.reduce(this.selectedSigners, (result, v, name) => {
            result[name] = v.id
            return result
          }, {}),
        },
        supply: this.supply,
      }
      $api.journals.records.create(this.projectId, this.journalName, 'records', data).then((response) => {
        if (this.journal.name === 'main') {
          this.$router.push({ name: 'journals.index', })
        } else {
          this.$router.push({ name: 'journals.spec', params: { id: this.journal.id, projectId: this.project.id, }, })
        }
      }).finally(() => {
        this.$var('loadSubmit', false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .page-record-create {
    
    .line {
      display: flex;
      align-items: flex-start;
      
      & > * {
        white-space: normal;
        display: inline-block;
        margin-bottom: 0;
        flex-grow: .4;
        flex-basis: 1px;
      }
      .items {
        margin-left: 0;
        flex-grow: .6;
      }
    }
    
    
    .weather {
      .unit {
        margin: 0 20px 0 5px;
      }
      .temperature {
        margin-left: 20px;
      }
      .temperature, .wind {
        width: 100px;
      }
    }
    
    .add {
      margin-top: 5px;
      font-size: .8em;
      opacity: .7;
      cursor: pointer;
    }
  }
</style>
