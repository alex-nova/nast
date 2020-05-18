<template>
  <n-modal class="modal-sign" :loading="$var('load')" @close="$emit('close')">
    <h3>Подписать акт</h3>
    <n-form @submit="submit">
      <n-items>
        <n-select title="Решение" :data="statuses" :value.sync="status" />
        <template v-if="status && status.value === 'no'">
          <n-input title="Причина отказа" v-bind="$form.input('problem')" />
<!--          <n-input title="Указания об устранении и сроки выполнения" v-bind="$form.input('solution')" />-->
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
  props: [ 'signer', 'projectId', 'actId', ],
  data: () => ({
    statuses: [
      { value: 'yes', title: 'Подписываю', },
      { value: 'no', title: 'Отказ', },
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
          name: this.signer.name,
          isApproved: this.status.value === 'yes',
          ...this.$form.get(),
          files: files.map((item) => item.data.content.id),
        }
        $api.acts.sign(this.projectId, this.actId, data).then((result) => {
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
