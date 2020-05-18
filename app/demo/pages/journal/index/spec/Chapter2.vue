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
        <n-link :to="{query: { modal: 'record', id: item.id, projectId: project.id, journal: $route.params.journal, type: 'records', }}"><n-button icon="eye" /></n-link>
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
    columns() {
      if (!this.journal.front) {
        return []
      } else {
        return [
          ...this.journal.front.index[2].content,
          { name: 'tools', title: '', },
        ]
      }
    },
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.$var('load', true)
      $api.journals.records.get(this.project.id, this.$route.params.journal, 'records').then((response) => {
        this.data = response.data.content
      }).finally(() => {
        this.$var('load', false)
      })
    },
    newRecord() {
      this.$router.push({
        name: 'records.create',
        params: { projectId: this.project.id, journal: this.$route.params.journal, },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .main-chapter1 {
  
  }
</style>
