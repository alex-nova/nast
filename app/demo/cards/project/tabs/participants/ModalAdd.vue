<template>
  <n-modal class="modal-add" :loading="$var('load')" @close="$emit('close')">
    <h3>Добавить сотрудника на проект</h3>
    <n-form @submit="submit">
      <n-items>
        <n-select title="Сотрудник" :data="workers" :value.sync="worker"
                  item-value="id" option-title="user.fullName" selected-title="user.fullName" @update:value="select" />
        <n-input title="Должность на проекте" v-bind="$form.input('position')" />
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
      position: '',
    })
  },
  methods: {
    loadData() {
      this.$var('load', true)
      $api.companies.workers.get($app.store.getter('app.company').id)
        .filter({ project: 'not:' + this.project.id, })
        .then((result) => {
          this.workers = result.data.content
        }).finally(() => {
          this.$var('load', false)
        })
    },
    submit() {
      this.$var('load', true)
      const data = {
        workerId: this.worker.id,
        position: this.$form.get('position'),
      }
      $api.iq.participants.create(this.project.id, data).then((response) => {
        this.$emit('submit', response.data.content)
        this.$emit('close')
      }).finally(() => {
        this.$var('load', false)
      })
    },
    select(value) {
      this.$form.set('position', value.position)
      // this.worker = value
    },
  },
}
</script>

<style lang="scss" scoped>
  .modal-add {
  
  }
</style>
