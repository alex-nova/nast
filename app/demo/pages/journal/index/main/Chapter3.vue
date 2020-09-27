<template>
  <div class="main-chapter1">
    <div class="chapter-title">
      Перечень актов промежуточной приемки ответственных конструкций и освидетельствования скрытых работ
    </div>
    <n-table :columns="columns" :data="data" :loading="$var('load')">
      <template #status="{item}">
        {{ statuses[item.status] }}
      </template>
      <template #createdAt="{item}">
        {{ $app.date.format(item.createdAt, 'datetime') }}
      </template>
      <template #tools="{item}">
        <n-button flat round icon="eye" @click="() => openDocument(item)" />
      </template>
    </n-table>
  </div>
</template>

<script>
export default {
  name: 'MainChapter3',
  props: [ 'project', ],
  data: () => ({
    columns: [
      { name: 'template.title', title: 'Наименование акта', },
      { name: 'status', title: 'Статус', },
      { name: 'createdAt', title: 'Дата подписания', },
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
      $api.iq.projects.getActs(this.project.id).then((response) => {
        this.data = response.data.content
      }).finally(() => {
        this.$var('load', false)
      })
    },
    openDocument(item) {
      this.$router.push({ query: { ...this.$route.query, document: item.id, }, })
    },
  },
}
</script>

<style lang="scss" scoped>
  .main-chapter1 {
  
  }
</style>
