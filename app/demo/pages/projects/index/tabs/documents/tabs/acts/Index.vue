<template>
  <div class="tab-acts">
    <n-divide class="table-tools">
      <div></div>
      <div><n-button @click="() => $var('create', true)">Создать акт</n-button></div>
    </n-divide>
    <n-table :columns="columns" :data="data" :loading="$var('load')">
      <template #status="{item}">
        {{ statuses[item.status] }}
      </template>
      <template #createdAt="{item}">
        {{ $app.date.format(item.createdAt, 'datetime') }}
      </template>
      <template #tools="{item}">
        <n-button flat round icon="eye" @click="() => openDocument(item.id)" />
      </template>
    </n-table>
  
    <modal-add-act v-if="$var('create')" :project="project" @submit="load" @close="$var('create', false)" />
    <card-document v-if="documentId" :document-id="documentId" @update="load" />
  </div>
</template>

<script>
import ModalAddAct from './ModalAddAct'
import CardDocument from 'cards/document/Index'
import { statuses, } from 'components/Document/utils'

export default {
  name: 'TabActs',
  components: { CardDocument, ModalAddAct, },
  props: [ 'project', ],
  data: () => ({
    columns: [
      { name: 'template.title', title: 'Наименование акта', },
      { name: 'status', title: 'Статус', },
      { name: 'createdAt', title: 'Дата создания', },
      { name: 'tools', title: '', },
    ],
    data: [],
    statuses,
  }),
  computed: {
    documentId() {
      return Number(this.$route.query._document)
    },
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.$var('load', true)
      $api.edms.documents.getByProject(this.project.id).with({ template: {}, }).then((response) => {
        this.data = response.data.content
      }).finally(() => {
        this.$var('load', false)
      })
    },
    openDocument(id) {
      this.$router.push({ query: { ...this.$route.query, _document: id, }, })
    },
  },
}
</script>

<style lang="scss" scoped>
  .tab-acts {
  
  }
</style>
