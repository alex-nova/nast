<template>
  <div class="tab-info" style="position: relative">
    <n-loader :loading="$var('loading')" />
    <n-list :data="structure" :sortable="form.editable()">
      <template #item="{ item, }"><span class="type">[{{ types[item.itemType] }}]</span> {{ item.name }}</template>
      <template #tools="{ item, }">
        <n-dropdown :data="tools" side="right" @update:value="(v) => toolsClick(v, item)"><n-icon class="n-tools" icon="cog" /></n-dropdown>
      </template>
    </n-list>
    <modal-add v-if="$var('add')" :model="$var('add')" :update="load" @close="$var('add', false)" />
    <modal-section-edit v-if="$var('edit')" :model="$var('edit')" :update="load" @close="$var('edit', false)" />
    <modal-section-delete v-if="$var('delete')" :model="$var('delete')" :submit="load" @close="$var('delete', false)" />
    <modal-project-delete v-if="$var('deleteProject')" :model="$var('deleteProject')" :submit="load" @close="$var('deleteProject', false)" />
  </div>
</template>

<script>
import ModalAdd from './ModalAdd'
import ModalSectionEdit from './ModalSectionEdit'
import ModalSectionDelete from './ModalSectionDelete'
import ModalProjectDelete from '../modals/ModalDelete'

export default {
  name: 'TabStructure',
  components: { ModalProjectDelete, ModalSectionDelete, ModalSectionEdit, ModalAdd, },
  props: [ 'model', 'form', ],
  data() {
    return {
      structure: [],
      types: {
        project: 'Проект',
        section: 'Раздел',
      },
      tools: [
        { title: 'Добавить', value: 'add', },
        { title: 'Редактировать', value: 'edit', },
        { title: 'Удалить', value: 'delete', },
      ],
    }
  },
  watch: {
    model() {
      this.load()
    },
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.$var('loading', true)
      $api.projects.getStructure(this.model.id).then((response) => {
        this.structure = response.data.content
      }).finally(() => {
        this.$var('loading', false)
      })
    },
    toolsClick(value, item) {
      if (value.value === 'add') {
        this.$var('add', item)
      } else if (value.value === 'edit') {
        if (item.itemType === 'project') {
          this.$router.push({ query: { modal: 'project', id: item.id, }, })
        } else {
          this.$var('edit', item)
        }
      } else if (value.value === 'delete') {
        if (item.itemType === 'project') {
          this.$var('deleteProject', item)
        } else {
          this.$var('delete', item)
        }
      }
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
