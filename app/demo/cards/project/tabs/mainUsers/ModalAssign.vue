<template>
  <n-modal class="modal-assign" :loading="$var('load')" @close="$emit('close')">
    <h3>Назначить на роль: {{ role.title }}</h3>
    <n-form @submit="submit">
      <n-items>
        <n-input title="БИН" v-bind="$form.input('bin')" />
        <n-input title="Название компании" v-bind="$form.input('title')" />
        <n-input title="E-mail" v-bind="$form.input('email')" />
        <n-button color="primary" wide type="submit">Назначить</n-button>
      </n-items>
    </n-form>
  </n-modal>
</template>

<script>
export default {
  name: 'ModalAssign',
  props: [ 'role', 'project', ],
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
      const data = {
        mainRole: this.role.name,
        ...this.$form.get(),
      }
      $api.projects.partners.create(this.project.id, data).then((response) => {
        this.$emit('submit')
        this.$emit('close')
      }).finally(() => {
        this.$var('load', false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .page-modal-assign {
  
  }
</style>
