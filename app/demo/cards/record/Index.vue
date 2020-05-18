<template>
  <div class="card-record">
    <n-modal-card :tabs="tabs" name="record" :loading="$var('load')">
      <template #header>Запись в журнале</template>
      <template #body>
        <div class="body">
          <!-- TODO !!! -->
          <div class="object" v-if="$store.state.app.project">{{ $store.state.app.project.name }}</div>
          <!--          <div>Вид работ: Бетонные работы</div>-->
          <div>Дата: {{ $app.date.format($form.get('createdAt')) }}</div>
        </div>
      </template>
      <template #tab.info>
        <n-items>
          <template v-if="journal.front">
            <n-input v-for="field in journal.front.create" :key="field.name" :title="field.title" v-bind="$form.input(field.name)" text />
          </template>
          
          <n-form-item v-if="journal.types === 'main'" title="Материалы" active>
            <n-table class="table" :columns="columns" :data="materials">
              <template #count="{item}">
                {{ item.count + ' ' + item.unit }}
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
      fields: [],
      tabs: [
        { name: 'info', title: 'Информация', callback: this.save, },
        { name: 'control', title: 'Проверяющие', },
      ],
      materials: [
        { id: 1, name: 'Бетон', unit: 'м3', count: 10, desc: '', },
      ],
      columns: [
        { title: 'Название', name: 'name', },
        { title: 'Количество', name: 'count', },
      ],
    }
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
      ]
      Promise.all(promises).then((result) => {
        this.$form.init(result[0].data.content)
        this.fields = result[0].data.columns
        this.journal = result[1].data.content
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
