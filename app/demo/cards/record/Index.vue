<template>
  <div class="card-record">
    <n-modal-card :tabs="tabs" name="record" :loading="$var('load')">
      <template #header>Запись в журнале</template>
      <template #body>
        <div class="body">
          <!-- TODO !!! -->
          <div v-if="$store.state.app.project" class="object">Проект: {{ project.title }}</div>
          <!--          <div>Вид работ: Бетонные работы</div>-->
          <div>Дата: {{ $app.date.format($form.get('publishedAt')) }}</div>
        </div>
      </template>
      <template #tab.info>
        <n-items>
          <template v-if="journal.front">
            <n-input v-for="field in journal.front.create" :key="field.name" :title="field.title" v-bind="$form.input(field.name)" text />
          </template>
  
          <!-- Files -->
          <template v-for="(array, name) in files">
            <n-form-item v-if="$n.size(array)" :key="name" :title="translates[name]" active>
              <div v-for="doc in array" :key="doc.id">
                <n-link :to="doc.file.src" type="external" target="_blank">{{ doc.file.name }}</n-link>
              </div>
            </n-form-item>
          </template>
          <!-- Files -->
          
          <n-form-item v-if="journal.name === 'main' && $n.size(record.work)" title="Работа" active>
            {{ record.work.work.title }}, {{ record.work.done }}
            <span class="sub">{{ record.work.work.unit }}</span>
          </n-form-item>
          
          <n-form-item v-if="journal.name === 'main' && $n.size(record.supplies)" title="Материалы" active>
            <n-table class="table" :columns="columns" :data="record.supplies">
              <template #done="{item}">
                <span style="white-space: nowrap">
                  {{ item.done }}
                  <span class="sub">{{ item.supply.unit }}</span>
                </span>
              </template>
            </n-table>
          </n-form-item>
        </n-items>
      </template>
      <template #tab.control>
        <block-signs :project-id="$route.query.projectId" :journal-id="$route.query.journal" :record-id="$route.query.id" />
      </template>
      <template #footer="{tab}">
        <n-divide>
          <n-button @click="() => $router.push({query: {}})">Закрыть</n-button>
        </n-divide>
      </template>
    </n-modal-card>
  </div>
</template>

<script>
import BlockSigns from './BlockSigns'

export default {
  name: 'CardRecord',
  components: { BlockSigns, },
  data() {
    return {
      journal: {},
      record: {},
      tabs: [
        { name: 'info', title: 'Информация', callback: this.save, },
        { name: 'control', title: 'Проверяющие', },
      ],
      columns: [
        { title: 'Название', name: 'supply.title', },
        { title: 'Расход', name: 'done', },
      ],
      project: {},
      translates: {
        attach: 'Приложения',
        schema: 'Исполнительные схемы',
        figure: 'Чертежи',
        input: 'Документы',
      },
    }
  },
  computed: {
    files() {
      const result = {
        attach: [],
        schema: [],
        figure: [],
        input: [],
      }
      
      if (this.record.files) {
        this.record.files.forEach((item) => {
          if ([ 'attach', 'schema', ].includes(item.type.code)) {
            result[item.type.code].push(item)
          } else if (item.type.code === 'input-34') {
            result.input.push(item)
          } else {
            result.figure.push(item)
          }
        })
      }
      
      return result
    },
  },
  watch: {
    '$route.query.id'() {
      if (this.$route.query.modal === 'record') {
        this.load()
      }
    },
  },
  created() {
    if (this.$route.query.modal === 'record') {
      this.load()
    }
  },
  methods: {
    load() {
      this.$var('load', true)
      const query = this.$route.query
      const promises = [
        $api.journals.records.get(query.projectId, query.journal, query.type, query.id),
        $api.journals.get(query.projectId, query.journal),
        $api.iq.projects.get(query.projectId),
      ]
      Promise.all(promises).then((result) => {
        this.$form.init(result[0].data.content)
        this.record = result[0].data
        this.journal = result[1].data.content
        this.project = result[2].data.content
      }).finally(() => {
        this.$var('load', false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.card-record {
  
  .weather {
    .env, .temperature, .wind {
      width: 150px;
      margin-right: 20px;
    }
  }
  

}
</style>
