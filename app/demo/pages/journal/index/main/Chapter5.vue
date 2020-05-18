<template>
  <div class="main-chapter1">
    <n-loader :loading="$var('load')" />
    <div class="chapter-title">
      Перечень специальных журналов работ
    </div>
    <n-table :columns="columns" :data="data">
      <template #tools="{item}">
        <n-link :to="{name:'journals.spec', params:{ journal: item.name, projectId: project.id, }}"><n-button icon="eye" /></n-link>
      </template>
    </n-table>
  </div>
</template>

<script>
export default {
  name: 'MainChapter5',
  props: [ 'project', ],
  data: () => ({
    columns: [
      { name: 'title', title: 'Наименование', },
      { name: 'createdAt', title: 'Дата выдачи', },
      { name: 'responsible', title: 'Ответственный', },
      { name: 'endedAt', title: 'Дата сдачи-приемки', },
      { name: 'tools', title: '', },
    ],
    data: [],
  }),
  created() {
    this.load()
  },
  methods: {
    load() {
      this.$var('load', true)
      $api.journals.get(this.project.id).filters({ tag: 'spec', }).then((response) => {
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
