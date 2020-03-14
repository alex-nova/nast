<template>
  <n-modal class="modal-add" :loading="$var('load')" @close="$emit('close')">
    <h3>Назначить подряд</h3>
    <n-form @submit="s_submit">
      <n-items>
        <n-select title="Элемент структуры" :data="structure" :value.sync="scope" item-value="id" option-title="name" selected-title="name" />
        <n-select title="Вид работ" :data="workTypes" :value.sync="selectedWorkTypes" item-value="id" option-title="name" selected-title="name" />
        <n-select title="Тип подряда" :data="types" :value.sync="type" />
        <template v-if="type">
          <n-select v-if="type.value === 'worker'" title="Сотрудник" :data="workers" :value.sync="worker" item-value="id" option-title="fullName" selected-title="fullName" />
          <template v-else>
            <n-input title="БИН" v-bind="$form.input('bin')" />
            <n-input title="E-mail" v-bind="$form.input('email')" />
          </template>
          <n-upload title="Документ" :value.sync="file" />
        </template>
        <n-button color="primary" wide type="submit">Назначить</n-button>
      </n-items>
    </n-form>
  </n-modal>
</template>

<script>
export default {
  name: 'ModalAdd',
  props: [ 'project', 'submit', ],
  data: () => ({
    structure: [],
    scope: null,
    workTypes: [],
    selectedWorkTypes: [],
    types: [
      { value: 'worker', title: 'Сотрудник', },
      { value: 'company', title: 'Компания', },
    ],
    type: null,
    workers: [],
    worker: null,
    file: null,
  }),
  created() {
    this.loadData()
    this.$form.init()
  },
  methods: {
    loadData() {
      this.$var('load', true)
      const promises = [
        $api.projects.getStructure(this.project.id),
        $api.types.get(),
        $api.companies.workers.get(),
      ]
      Promise.all(promises).then((result) => {
        this.structure = result[0].data.content
        this.workTypes = result[1].data.content
        this.workers = result[2].data.content
      }).finally(() => {
        this.$var('load', false)
      })
    },
    s_submit() {
      this.$var('load', true)
      
      let promise
      if (this.type.value === 'company') {
        const data = {
          scopeType: this.scope.itemType,
          scopeId: this.scope.id,
          types: this.selectedWorkTypes.map((i) => i.id),
          ...this.$form.get(),
        }
        promise = $api.projects.delegations.create(this.project.id, data)
      } else {
        const data = {
          scopeType: this.scope.itemType,
          scopeId: this.scope.id,
          types: this.selectedWorkTypes.map((i) => i.id),
          userId: this.worker.id,
        }
        promise = $api.projects.participants.create(this.project.id, data)
      }
      
      promise.then((response) => {
        this.$emit('close')
        this.submit()
      }).finally(() => {
        this.$var('load', false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .modal-add {
  
  }
</style>
