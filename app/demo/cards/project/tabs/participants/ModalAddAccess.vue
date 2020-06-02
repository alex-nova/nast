<template>
  <n-modal class="modal-add-access" :loading="$var('load')" @close="$emit('close')">
    <h3>Добавить Полномочия</h3>
    <n-form @submit="submit">
      <n-items>
        <n-select title="Тип" :data="types" :value.sync="type" item-value="id" option-title="title" selected-title="title" />
        
        <template v-if="type && type.hasStructure">
          <n-select title="Элемент структуры" :data="structure" :value.sync="selectedStructure" item-value="id" option-title="title"
                    selected-title="title" />
          <n-select title="Вид работ" :data="workTypes" :value.sync="selectedWorkTypes" item-value="id"
                    option-title="title" selected-title="title" />
        </template>
        <n-button color="primary" wide type="submit">Назначить</n-button>
      </n-items>
    </n-form>
  </n-modal>
</template>

<script>
export default {
  name: 'ModalAddAccess',
  props: [ 'project', 'participant', ],
  data: () => ({
    type: null,
    types: [],
    selectedSpecTypes: [],
    structure: [],
    selectedStructure: null,
    workTypes: [],
    selectedWorkTypes: [],
  }),
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.$var('load', true)
      const api = [
        $api.projects.accesses.types.get(this.project.id, $app.store.getter('app.company').id)
          .filter({ owner: 'participant', }),
        $api.my.structureTree(this.project.id),
        $api.projects.works.types.get(),
      ]
      Promise.all(api).then((result) => {
        this.types = result[0].data.content
        this.structure = result[1].data.content
        this.workTypes = result[2].data.content
      }).finally(() => {
        this.$var('load', false)
      })
    },
    submit() {
      this.$var('load', true)
      const data = {
        type: this.type.name,
        sectionId: this.selectedStructure?.id || null,
        workTypes: $n.map(this.selectedWorkTypes, 'id'),
      }
      $api.projects.accesses.participants.create(this.participant.id, data).then((response) => {
        this.$emit('close')
        this.$emit('submit')
      }).finally(() => {
        this.$var('load', false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .modal-add-access {
  
  }
</style>
