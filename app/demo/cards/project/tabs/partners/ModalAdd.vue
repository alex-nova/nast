<template>
  <n-modal class="modal-add" :loading="$var('load')" @close="$emit('close')">
    <h3>Добавить подрядчика</h3>
    <n-form @submit="submit">
      <n-items>
        <n-input title="БИН" v-bind="$form.input('bin')" />
        <n-input title="Название компании" v-bind="$form.input('title')" />
        <n-input title="E-mail" v-bind="$form.input('email')" />
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
    file: null,
  }),
  created() {
    this.$form.init({
      bin: '',
      title: '',
      email: '',
    })
  },
  methods: {
    submit() {
      this.$var('load', true)
      $api.projects.partners.create(this.project.id, this.$form.get()).then((response) => {
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
