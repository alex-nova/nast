<template>
  <div class="main-chapter1">
    <n-loader :loading="$var('load')" />
    <div class="chapter-title">
      Сведения о производстве строительно-монтажных работ с учетом
      результатов операционного контроля их качества
    </div>
    <n-divide class="table-tools">
      <div></div>
      <n-link :to="createRecordLink"><n-button>Создать запись</n-button></n-link>
    </n-divide>
    
    <n-table :columns="columns" :data="data">
      <template #publishedAt="{item}">
        {{ $app.date.format(item.publishedAt) }}
      </template>
      <template #date="{item}">
        {{ $app.date.format(item.date) }}
      </template>
      <template #tools="{item}">
        <n-link :to="{query: { modal: 'record', id: item.id, journal: 'main', projectId: project.id, type: 'records', }}">
          <n-button icon="eye" /></n-link>
      </template>
    </n-table>
  </div>
</template>

<script>
export default {
  name: 'MainChapter4',
  props: [ 'project', 'journal', ],
  data: () => ({
    data: [],
  }),
  computed: {
    createRecordLink() {
      return { name: 'records.create', params: { projectId: this.project.id, journal: 'main', }, }
    },
    columns() {
      if (!this.journal || !this.journal.front) {
        return []
      } else {
        return [
          ...this.journal.front.index.four.content,
          { name: 'tools', title: '', },
        ]
      }
    },
  },
  watch: {
    project() {
      this.load()
    },
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.$var('load', true)
      $api.journals.records.get(this.project.id, 'main', 'records').then((response) => {
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
