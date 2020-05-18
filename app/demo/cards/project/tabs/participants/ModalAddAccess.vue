<template>
  <n-modal class="modal-add-access" :loading="$var('load')" @close="$emit('close')">
    <h3>Добавить обязанности</h3>
    <n-form @submit="submit">
      <n-items>
        <n-select title="Тип" :data="types" :value.sync="type"></n-select>
        
        <template v-if="type && ['executor', 'approver', 'author', 'tech'].includes(type.value)">
          <n-select title="Элемент структуры" :data="structure" :value.sync="selectedStructure" item-value="id" option-title="name"
                    selected-title="name" />
          <n-select title="Вид работ" :data="workTypes" :value.sync="selectedWorkTypes" item-value="id"
                    option-title="name" selected-title="name" />
        </template>
        <template v-if="type && type.value === 'special'">
          <n-select title="Роли в спец. журналах" :data="specTypes" :value.sync="selectedSpecTypes"></n-select>
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
    types: [
      { value: 'assignee', title: 'Представитель организации', },
      { value: 'manager', title: 'Редактирование проекта', },
      { value: 'executor', title: 'Ведение журнала', },
      { value: 'approver', title: 'Утверждение записей в журнале', },
      { value: 'special', title: 'Спец. журналы', },
      { value: 'author', title: 'Авторский надзор', },
      { value: 'tech', title: 'Технический надзор', },
    ],
    specTypes: [
      { value: 'priemka_antikorroziinih_rabot', title: 'Ответственный за приемку антикоррозийных работ', },
      { value: 'brigadir_po_postanovke_boltov', title: 'Бригадир команды по постановке болтов', },
      { value: 'otvetstvennii_za_postanovku_boltov', title: 'Ответсвенный за постановку болтов', },
      { value: 'brigadir_po_zamonolichivaniy', title: 'Бригадир команды по замоноличиванию монтажных стыков и узлов', },
    ],
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
        specTypes: $n.reduce(this.selectedSpecTypes, (result, item) => {
          result.push(item.value)
          return result
        }, []),
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
