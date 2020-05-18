<template>
  <n-modal class="modal-add" :loading="$var('load')" @close="$emit('close')">
    <h3>Добавить сотрудника на проект</h3>
    <n-form @submit="submit">
      <n-items>
        <n-select title="Сотрудник" :data="workers" :value.sync="worker"
                  item-value="id" option-title="user.fullName" selected-title="user.fullName" />
        <n-input title="Должность на проекте" v-bind="$form.input('role')" />
        <n-upload title="Договор" :value.sync="file" />
        
        <n-button color="primary" wide type="submit">Назначить</n-button>
      </n-items>
    </n-form>
  </n-modal>
</template>

<script>
export default {
  name: 'ModalAdd',
  props: [ 'project', ],
  data: () => ({
    worker: null,
    workers: [],
    file: null,
  }),
  created() {
    this.loadData()
    this.$form.init({
      role: '',
    })
  },
  methods: {
    loadData() {
      this.$var('load', true)
      $api.companies.workers.get().then((result) => {
        this.workers = result.data.content
      }).finally(() => {
        this.$var('load', false)
      })
    },
    submit() {
      this.$var('load', true)
      const data = {
        workerId: this.worker.id,
        role: this.$form.get('role'),
      }
      $api.projects.participants.create(this.project.id, data).then((response) => {
        this.$emit('submit', response.data.content)
        this.$emit('close')
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
