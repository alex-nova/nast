<template>
  <div class="page-journals-my">
    <n-card>
      <n-table :data="$d.get('journals')" :columns="columns" :loading="$d.loading('journals')">
        <template #lastRecord="{item}">
          {{ $app.date.format(item.lastRecord, 'date') }}
        </template>
        <template #tools="{item}">
          <n-link :to="{ name: 'journals.index', params: { id: item.id, }, }"><n-button>Посмотреть</n-button></n-link>
        </template>
      </n-table>
    </n-card>
  </div>
</template>

<script>
export default {
  name: 'PageJournalsMy',
  data() {
    return {
      columns: [
        { title: 'ID', name: 'id', },
        { title: 'Объект', name: 'object.name', },
        { title: 'Проект', name: 'project.name', },
        { title: 'Последняя запись', name: 'lastRecord', },
        { title: '', name: 'tools', align: 'right', width: '150px', },
      ],
    }
  },
  load: (route) => {
    return {
      journals: {
        api: $api.journals.get(),
      },
    }
  },
  methods: {
    save() {
    },
  },
}
</script>

<style lang="scss" scoped>
.page-journals-my {

}
</style>
