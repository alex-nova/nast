<template>
  <div class="main-chapter1">
    <div class="chapter-title">
      Перечень актов промежуточной приемки ответственных конструкций и освидетельствования скрытых работ
    </div>
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
        <n-button flat round icon="eye" @click="() => $var('show', item.id)" />
      </template>
    </n-table>
    
    <modal-add-act v-if="$var('create')" :project="project" @submit="load" @close="$var('create', false)" />
    <modal-edit-act v-if="$var('show')" :act-id="$var('show')" :project="project" :statuses="statuses" @submit="load" @close="$var('show', false)" />
  </div>
</template>

<script>
import ModalAddAct from '../modals/ModalAddAct'
import ModalEditAct from '../modals/ModalEditAct'

export default {
  name: 'MainChapter3',
  components: { ModalEditAct, ModalAddAct, },
  props: [ 'project', ],
  data: () => ({
    columns: [
      { name: 'title', title: 'Наименование акта', },
      { name: 'status', title: 'Статус', },
      { name: 'createdAt', title: 'Дата создания', },
      { name: 'tools', title: '', },
    ],
    data: [],
    statuses: {
      draft: 'Черновик',
      waiting: 'Ожидает подписания',
      approved: 'Подписан',
      rejected: 'Отклонен',
    },
  }),
  created() {
    this.load()
  },
  methods: {
    load() {
      this.$var('load', true)
      $api.acts.get(this.project.id).then((response) => {
        this.data = response.data.content
      }).finally(() => {
        this.$var('load', false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .main-chapter1 {
  
  }
</style>
