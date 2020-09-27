<template>
  <div class="tab-all">
    <n-divide class="table-tools">
      <div></div>
      <n-button @click="() => this.$var('add', true)">Добавить документ</n-button>
    </n-divide>
    
    <n-table :data="data" :columns="columns" :loading="$var('load')">
      <template #type="{item}">
        {{ item.type.title }}
      </template>
      <template #download="{item}">
        <n-link :to="item.file.src" type="external" target="_blank">Скачать</n-link>
      </template>
      <template #tools="{item}">
        <n-button icon="eye" flat round @click="$var('edit', item.id)" />
      </template>
    </n-table>
  
    <modal-add v-if="$var('add')" :project="project" @submit="change" @close="$var('add', false)" />
    <modal-edit v-if="$var('edit')" :document-id="$var('edit')" :project="project" @submit="change" @close="$var('edit', false)" />
  </div>
</template>

<script>
import ModalAdd from './ModalAdd'
import ModalEdit from './ModalEdit'

export default {
  name: 'TabAll',
  components: { ModalEdit, ModalAdd, },
  props: [ 'project', ],
  data() {
    return {
      data: [],
      columns: [
        { name: 'type', title: 'Документ', },
        { name: 'file.name', title: 'Название', },
        { name: 'download', title: '', },
        { name: 'tools', title: '', },
      ],
    }
  },
  watch: {
    showAll() {
      this.$nextTick(() => {
        this.load()
      })
    },
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.$var('load', true)
      $api.iq.documents.getByProject(this.project.id).then((response) => {
        this.data = response.data.content
      }).finally(() => {
        this.$var('load', false)
      })
    },
    change() {
      setTimeout(() => {
        this.load()
      }, 500)
    },
  },
}
</script>

<style lang="scss" scoped>
  .tab-all {
  
  }
</style>
