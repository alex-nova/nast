<template>
  <div class="card-tab" style="position: relative">
    <n-loader :loading="$var('load')" />
    
    <n-divide class="table-tools">
      <n-button @click="() => this.$var('add', true)">Добавить документ</n-button>
    </n-divide>
    
    <n-table :data="data" :columns="columns">
      <template #type="{item}">
        <template v-if="item.type === 'figure'">
          {{ types[item.type] }} <span style="font-size: .9em; opacity: .9;">[{{ classes[item.classId].title }}]</span>
        </template>
        <template v-else-if="item.type === 'psd'">
          {{ psdTypes[item.classId].title }}
        </template>
        <template v-else-if="item.type === 'permit'">
          {{ permitTypes[item.classId].title }}
        </template>
      </template>
      <template #download="{item}">
        <n-link :to="item.src" type="external" target="_blank">Скачать</n-link>
      </template>
      <template #tools="{item}">
        <n-button icon="eye" flat round @click="$var('edit', item.id)" />
      </template>
    </n-table>
  
    <modal-add v-if="$var('add')" :project="project" @submit="change" @close="$var('add', false)" />
    <modal-edit v-if="$var('edit')" :document-id="$var('edit')" :project="project"
                :classes="classes" :psd-types="psdTypes" :permit-types="permitTypes" :types="types" @submit="change" @close="$var('edit', false)" />
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
      types: {
        psd: 'Проектная документация',
        figure: 'Чертежи',
        permit: 'Разрешительная документация',
      },
      classes: {},
      psdTypes: {},
      permitTypes: {},
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
      const apis = [
        $api.projects.documents.get(this.project.id),
        $api.dictionaries.get('figureClasses'),
        $api.dictionaries.get('psdTypes'),
        $api.dictionaries.get('permitTypes'),
      ]
      Promise.all(apis).then((response) => {
        this.data = response[0].data.content
        this.classes = $n.reduce(response[1].data.content, (result, i) => {
          result[i.id] = i; return result
        }, {})
        this.psdTypes = $n.reduce(response[2].data.content, (result, i) => {
          result[i.id] = i; return result
        }, {})
        this.permitTypes = $n.reduce(response[3].data.content, (result, i) => {
          result[i.id] = i; return result
        }, {})
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
