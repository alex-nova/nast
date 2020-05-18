<template>
  <n-modal class="modal-sign" :loading="$var('load')" @close="$emit('close')">
    <h3>Добавить запись</h3>
    <n-form @submit="submit">
      <n-items>
        <n-select title="Решение" :data="statuses" :value.sync="status" />
        <template v-if="status && status.value === 'yes'">
          <n-input title="Выявленные отступления от проектно-сметной документации" v-bind="$form.input('problem')" />
          <n-input title="Указания об устранении и сроки выполнения" v-bind="$form.input('solution')" />
          <n-upload title="Файлы" :value.sync="files" multi />
        </template>
        
        <n-button color="primary" wide type="submit">Сохранить</n-button>
      </n-items>
    </n-form>
  </n-modal>
</template>

<script>
export default {
  name: 'ModalSign',
  props: [ 'signer', 'projectId', 'journalId', 'recordId', ],
  data: () => ({
    statuses: [
      { value: 'yes', title: 'Найдены нарушения', },
      { value: 'no', title: 'Нарушений нет', },
    ],
    status: null,
    files: null,
  }),
  created() {
    this.$form.init({
      problem: '',
      solution: '',
    })
  },
  methods: {
    submit() {
      this.$var('load', true)
      const api = $n.reduce(this.files, (result, file) => {
        result.push($api.files.create(file))
        return result
      }, [])
      Promise.all(api).then((files) => {
        const data = {
          signerType: this.signer.name,
          isAccept: this.status.value === 'no',
          ...this.$form.get(),
          files: files.map((item) => item.data.content.id),
        }
        $api.journals.records.sign(this.projectId, this.journalId, this.recordId, data).then((result) => {
          this.$emit('submit')
          this.$emit('close')
        }).finally(() => {
          this.$var('load', false)
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .modal-sign {
  
  }
</style>
