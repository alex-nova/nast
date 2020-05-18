<template>
  <div class="main-chapter1">
    <div class="chapter-title">Список инженерно-технического персонала, занятого на строительстве объекта</div>
    <n-table :columns="columns" :data="data" :loading="this.$var('load')">
      <template #participant="{item}">
        {{ item.user.fullName }} <span style="opacity: .8;font-size: .8em">[{{ item.user.iin }}]</span>
      </template>
      <template #company="{item}">
        {{ item.company.name }} <span style="opacity: .8;font-size: .8em">[{{ item.company.bin }}]</span>
      </template>
      <template #createdAt="{item}">
        {{ $app.date.format(item.createdAt) }}
      </template>
    </n-table>
  </div>
</template>

<script>
export default {
  name: 'MainChapter2',
  props: [ 'project', ],
  data: () => ({
    columns: [
      { name: 'participant', title: 'Сотрудник', },
      { name: 'company', title: 'Компания', },
      { name: 'role', title: 'Должность на проекте', },
      { name: 'createdAt', title: 'Дата назначения', },
    ],
    data: [],
  }),
  created() {
    this.load()
  },
  methods: {
    load() {
      this.$var('load', true)
      $api.projects.participants.get(this.project.id).then((response) => {
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
