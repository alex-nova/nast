<template>
  <div class="tab-journals">
    <n-loader :loading="$var('loading')" />
    
    <div class="items">
      <n-link :to="{ name: 'journals.main', params: { projectId: project.id, }, }">Журнал производства работ</n-link>
      <n-link :to="getRoute('input')">Журнал верификации закупленной продукции</n-link>
    </div>
    <n-form-item title="Журналы надзора">
      <div class="items">
        <n-link :to="getRoute('author')">Журнал авторского надзора</n-link>
        <n-link :to="getRoute('tech')">Журнал технического надзора</n-link>
        <n-link :to="getRoute('control')">Журнал замечаний и предложений по ведению СМР</n-link>
      </div>
    </n-form-item>
    <n-form-item title="Специальные журналы">
      <div class="items">
        <n-link v-for="journal in specs" :key="journal.name" :to="getRoute(journal.name)">{{ journal.title }}</n-link>
      </div>
    </n-form-item>
  </div>
</template>

<script>
export default {
  name: 'TabJournals',
  props: [ 'project', ],
  data: () => ({
    columns: [
      { name: 'title', title: 'Наименование акта', },
      { name: 'status', title: 'Статус', },
      { name: 'createdAt', title: 'Дата создания', },
      { name: 'tools', title: '', },
    ],
    specs: [],
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
    getRoute(name) {
      return { name: 'journals.spec', params: { projectId: this.project.id, journal: name, }, }
    },
    load() {
      this.$var('loading', true)
      $api.journals.get(this.project.id).filter({ tag: 'spec', }).then((response) => {
        this.specs = response.data.content
      }).finally(() => {
        this.$var('loading', false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .tab-journals {
    .tools {
      margin-bottom: 20px;
    }
    
    .items {
      margin-bottom: 20px;
      &>* {
        display: block;
      }
    }
  }
</style>
