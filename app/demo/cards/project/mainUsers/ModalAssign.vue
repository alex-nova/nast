<template>
  <n-modal class="modal-assign" :load="$var('load')" @close="$emit('close')">
    <h3>Назначить на роль: {{ role.title }}</h3>
    <n-form @submit="submit">
      <n-items>
        <n-input title="БИН" v-bind="$form.input('bin')" />
        <n-input title="E-mail" v-bind="$form.input('email')" />
        <n-button color="primary" wide type="submit">Назначить</n-button>
      </n-items>
    </n-form>
  </n-modal>
</template>

<script>
export default {
  name: 'ModalAssign',
  props: [ 'role', 'modelId', ],
  created() {
    this.$form.init({
      bin: undefined,
      email: undefined,
    })
  },
  methods: {
    submit() {
      this.$var('load', true)
      const data = {
        role: this.role.name,
        ...this.$form.get(),
      }
      $api.projects.partners.invite(this.modelId, data).then((response) => {
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
