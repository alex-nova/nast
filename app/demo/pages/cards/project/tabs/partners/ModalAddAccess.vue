<template>
  <n-modal class="modal-add-access" :loading="$var('load')" @close="$emit('close')">
    <h3>Добавить доступы</h3>
    <n-form @submit="submit">
      <n-items>
        <n-select title="Тип" :data="types" :value.sync="type"></n-select>
        <n-select title="Элемент структуры" :data="structure" :value.sync="selectedStructure" item-value="id" option-title="name"
                  selected-title="name" />
        <n-select title="Вид работ" :data="workTypes" :value.sync="selectedWorkTypes" item-value="id"
                  option-title="name" selected-title="name" />
        <n-button color="primary" wide type="submit">Назначить</n-button>
      </n-items>
    </n-form>
  </n-modal>
</template>

<script>
export default {
  name: 'ModalAddAccess',
  props: [ 'project', 'partner', ],
  data: () => ({
    type: null,
    types: [
      { value: 'executor', title: 'Исполнитель', },
      { value: 'author', title: 'Авторский надзор', },
      { value: 'tech', title: 'Технический надзор', },
      { value: 'projector', title: 'Проектировщик', },
    ],
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
        $api.my.structureTree(this.project.id),
        $api.works.types.get(),
      ]
      Promise.all(api).then((result) => {
        this.structure = result[0].data.content
        this.workTypes = result[1].data.content
      }).finally(() => {
        this.$var('load', false)
      })
    },
    submit() {
      this.$var('load', true)
      const data = {
        type: this.type.value,
        sectionId: this.selectedStructure ? (this.selectedStructure._model === 'project' ? null : this.selectedStructure.id) : null,
        workTypes: $n.reduce(this.selectedWorkTypes, (result, item) => {
          result.push(item.id)
          return result
        }, []),
      }
      $api.projects.accesses.partners.create(this.partner.id, data).then((response) => {
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
