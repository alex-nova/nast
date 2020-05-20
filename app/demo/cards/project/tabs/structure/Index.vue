<template>
  <div class="tab-info" style="position: relative">
    <n-loader :loading="$var('loading')" />
    <n-list :data="structure">
      <template #item="{ item, }">
        <span class="type">[{{ getTypeTitle(item._model, item.type) }}]</span> {{ item.name }}
      </template>
      <template #tools="{ item, }">
        <n-dropdown :data="getTools(item)" side="right" @update:value="(v) => toolsClick(v, item)">
          <n-icon class="n-tools" icon="cog" />
        </n-dropdown>
      </template>
    </n-list>
    <modal-add v-if="$var('add')" :project="project" :parent="$var('add')" :update="load" @close="$var('add', false)" />
    <modal-section-edit v-if="$var('edit')" :model="$var('edit')" :update="load" @close="$var('edit', false)" />
    <modal-section-delete v-if="$var('delete')" :model="$var('delete')" :submit="load" @close="$var('delete', false)" />
    <modal-project-delete v-if="$var('deleteProject')" :model="$var('deleteProject')" :submit="load"
                          @close="$var('deleteProject', false)" />
  </div>
</template>

<script>
import ModalAdd from './ModalAdd'
import ModalSectionEdit from './ModalSectionEdit'
import ModalSectionDelete from './ModalSectionDelete'
import ModalProjectDelete from '../../modals/ModalDelete'

export default {
  name: 'TabStructure',
  components: { ModalProjectDelete, ModalSectionDelete, ModalSectionEdit, ModalAdd, },
  props: [ 'project', ],
  data() {
    return {
      structure: [],
      tools: [],
    }
  },
  watch: {
    project() {
      this.load()
    },
  },
  mounted() {
    this.load()
  },
  methods: {
    getTools(item) {
      return item._model === 'project' ? [
        { title: 'Добавить', value: 'add', },
      ] : [
        { title: 'Добавить', value: 'add', },
        { title: 'Редактировать', value: 'edit', },
        { title: 'Удалить', value: 'delete', },
      ]
    },
    getTypeTitle(modelType, type) {
      if (modelType === 'project') {
        return 'Проект'
      } else if (modelType === 'work') {
        return 'Работа'
      } else {
        const types = {
          object: 'Объект',
          section: 'Раздел',
          construction: 'Конструкция',
        }
        return types[type]
      }
    },
    load() {
      this.$var('loading', true)
      $api.my.structureTree(this.project.id, true).then((response) => {
        this.structure = response.data.content
      }).finally(() => {
        this.$var('loading', false)
      })
    },
    toolsClick(value, item) {
      this.$var(value.value, item)
    },
  },
}
</script>

<style lang="scss" scoped>
  .tab-info {
    
    .n-list {
      font-size: 1em;
      
      .type {
        font-size: .8em;
        opacity: .5;
      }
    }
  }
</style>
