<template>
  <div class="main-chapter1">
    <n-loader :loading="$var('load')" />
    <div class="chapter-title">
      Записи
    </div>
    <n-button style="margin: 10px 0; float: right;" @click="newRecord">Создать запись</n-button>
    <n-table :columns="columns" :data="data">
      <template #createdAt="{item}">
        {{ $app.date.format(item.createdAt) }}
      </template>
      <template #tools="{item}">
        <n-link :to="{query: { modal: 'record', id: item.id, journal: $route.params.id, type: 'records', }}"><n-button icon="eye" /></n-link>
      </template>
    </n-table>
  </div>
</template>

<script>
export default {
  name: 'MainChapter4',
  props: {
    project: { type: Object, default: () => ({}), },
  },
  data: () => ({
    columns: [],
    data: [],
  }),
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.$var('load', true)
      $api.journals.getBlock(this.project.id, this.$route.params.id, 'records').then((response) => {
        this.data = response.data.content
        this.columns = [
          { name: 'createdAt', title: 'Дата записи', },
          ...response.data.columns.map(((i) => ({ name: i.name, title: i.title, }))),
          { name: 'user', title: 'Автор записи', },
          { name: 'tools', title: '', },
        ]
      }).finally(() => {
        this.$var('load', false)
      })
    },
    newRecord() {
      this.$router.push({
        name: 'records.create',
        params: { id: this.$route.params.id, },
        query: { project: this.project.id, }, }
      )
    },
  },
}
</script>

<style lang="scss" scoped>
  .main-chapter1 {
  
  }
</style>
