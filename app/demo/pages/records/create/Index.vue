<template>
  <div class="page-record-create">
    <div class="line">
      <n-card class="info" :loading="$var('load')">
        <template #header>
          <h3>Информация</h3>
        </template>
        <n-items>
          <n-input title="Проект" :value="project.title" text />
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
        <n-select title="Чертежи" :data="figures" :value.sync="selectedFigures" option-title="title" selected-title="title" item-value="id" />
        <div style="width: 100%"><n-upload title="Фото/видео файлы" :value.sync="files" multi /></div>
        <div><n-upload title="Исполнительные схемы" :value.sync="schemas" multi /></div>
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
      files: [],
      schemas: [],
      supply: null,
      signers: {},
      selectedSigners: {},
      figures: [],
      selectedFigures: [],
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
        $api.documents.getByProject(this.projectId).filter({ type: 'figure', }),
      ]
      Promise.all(promises).then((response) => {
        this.journal = response[0].data.content
        this.project = response[1].data.content
        this.fields = response[2].data.content
        this.figures = response[3].data.content
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
  
      let api = $n.reduce(this.files, (result, file) => {
        result.push({
          promise: $api.files.create(file),
          type: 'file',
        })
        return result
      }, [])
      api = $n.reduce(this.schemas, (result, file) => {
        result.push({
          promise: $api.files.create(file),
          type: 'schema',
        })
        return result
      }, api)
      
      const callback = (files, schemas) => {
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
          files,
          schemas,
          figures: $n.reduce(this.selectedFigures, (result, v) => {
            result.push(v.id)
            return result
          }, []),
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
      }
  
      if (api.length) {
        $n.promiseObjects(api).then((result) => {
          const files = []
          const schemas = []
          $n.each(result, (file) => {
            if (file.type === 'file') files.push(file.response.data.content.id)
            if (file.type === 'schema') schemas.push(file.response.data.content.id)
          })
          callback(files, schemas)
        }).finally(() => {
          this.$var('loadSubmit', false)
        })
      } else {
        callback([], [])
      }
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
