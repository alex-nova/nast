<template>
  <div class="card-tab" style="position: relative">
    <n-loader :loading="$var('load')" />
    
    <n-divide class="table-tools">
      <n-button @click="() => this.$var('add', true)">Добавить документ</n-button>
    </n-divide>
    
    <n-table :data="data" :columns="columns">
      <template #type="{item}">
        {{ item.type.title }}
        <span v-if="item.class" style="font-size: .9em; opacity: .9;">[{{ item.class.title }}]</span>
      </template>
      <template #download="{item}">
        <n-link :to="item.src" type="external" target="_blank">Скачать</n-link>
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
  name: 'TabPsd',
  components: { ModalEdit, ModalAdd, },
  props: [ 'project', ],
  data() {
    return {
      data: [],
      columns: [
        { name: 'type', title: 'Документ', },
        { name: 'title', title: 'Название', },
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
  .card-tab {
  
  }
</style>
