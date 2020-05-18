<template>
  <div class="tab-works">
    <n-divide class="table-tools">
      <div></div>
      <div><n-button @click="$var('add', true)">Добавить работу</n-button></div>
    </n-divide>
    
    <n-table :columns="columns" :data="data" :loading="$var('load')">
      <template #type="{item}">
        {{ item.type.name }}
      </template>
      <template #section="{item}">
        <template v-if="item.section">
          <span style="font-size: .9em; opacity: .9">[{{ $app.store.state('app.sectionTypes')[item.section.type] }}]</span>
          &nbsp;{{ item.section.name }}
        </template>
        <template v-else>
          <span style="font-size: .9em; opacity: .9">[{{ $app.store.state('app.sectionTypes')['project'] }}]</span>
          &nbsp;{{ project.name }}
        </template>
      </template>
      <template #count="{item}">
        {{ item.done }}
        из
        {{ item.count }}
        <template v-if="item.unit">
          {{ item.unit }}
        </template>
      </template>
      <template #info="{item}">
        <n-button icon="eye" @click="() => $var('resources', item)" />
      </template>
      <template #act="{item}">
        <n-button icon="file" @click="$var('act', item)" />
      </template>
    </n-table>
  
    <modal-add v-if="$var('add')" :project="project" :submit="load" @close="$var('add', false)" />
    <modal-resources v-if="$var('resources')" :work="$var('resources')" @close="$var('resources', false)" />
    <modal-act v-if="$var('act')" :project="project" :work="$var('act')" @close="$var('act', false)" />
  </div>
</template>

<script>
import ModalAdd from './ModalAdd'
import ModalResources from './supplies/Index'
import ModalAct from './act/Index'

export default {
  name: 'TabWorks',
  components: { ModalAct, ModalResources, ModalAdd, },
  props: [ 'project', ],
  data() {
    return {
      data: [],
      columns: [
        { title: 'Название', name: 'name', },
        { title: 'Вид работ', name: 'type', },
        { title: 'Раздел', name: 'section', },
        { title: 'Расход', name: 'count', },
        { title: 'Материалы', name: 'info', },
        { title: 'Создать акт', name: 'act', },
      ],
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.$var('load', true)
      $api.works.getByProject(this.project.id).with({ type: {}, section: {}, }).then((response) => {
        this.data = response.data.content
      }).finally(() => {
        this.$var('load', false)
      })
    },
    // loadTypes() {
    //   this.$var('loadTypes', true)
    //   $api.works.types.get().then((response) => {
    //     this.types = response.data.content
    //   }).finally(() => {
    //     this.$var('loadTypes', false)
    //   })
    // },
    submit() {
      const data = {
        ...this.$form.get(),
        type: this.type.id,
        object: this.object.name,
      }
      $api.projects.works.post(data).then((response) => {
        $d.reload.works()
        this.$var('add', false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .tab-works {
  }
</style>
