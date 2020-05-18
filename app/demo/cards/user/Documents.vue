<template>
  <div class="tab-documents">
    <n-divide class="tools">
      <div></div>
      <div><n-button @click="$var('add', true)">Добавить документ</n-button></div>
    </n-divide>
    <n-table :data="data" :columns="columns" :loading="$var('loading')">
      <template #startedAt="{item}">
        {{ $app.date.format(item.startedAt) }}
      </template>
      <template #endedAt="{item}">
        {{ $app.date.format(item.endedAt) }}
      </template>
      <template #tools="{item}">
        <a :href="item.src" target="_blank">скачать</a>
      </template>
    </n-table>
    
    <CardUserAddFile v-if="$var('add')" :model-id="modelId" @close="$var('add', false)" />
  </div>
</template>

<script>
import CardUserAddFile from './modals/AddFile'

export default {
  name: 'TabDocuments',
  components: { CardUserAddFile, },
  props: [ 'modelId', ],
  data() {
    return {
      data: [],
      columns: [
        { title: 'Название', name: 'title', },
        { title: 'Номер', name: 'number', },
        { title: 'Тип', name: 'type', },
        { title: 'Дата выдачи', name: 'startedAt', },
        { title: 'Дата окончания', name: 'endedAt', },
        { title: '', name: 'tools', align: 'center', width: '100px', },
      ],
    }
  },
  mounted() {
    this.$var('loading', true)
    $api.users.documents.get(this.modelId).then((response) => {
      this.data = response.data.content
      this.$var('loading', false)
    })
  },
}
</script>

<style lang="scss" scoped>
  .tab-documents {
    font-size: .9em;
    .tools {
      margin-bottom: 10px;
    }
  }
</style>
