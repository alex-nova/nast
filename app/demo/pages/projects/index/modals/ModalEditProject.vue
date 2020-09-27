<template>
  <n-modal class="modal-edit-project" :load="$var('load')" @close="$emit('close')">
    <h3>Редактировать проект</h3>
    <n-form @submit="s_submit">
      <n-items>
        <n-input title="Название" v-bind="$form.input('title')" />
        <n-input title="Адрес" v-bind="$form.input('address')" />
        <n-input title="Описание" v-bind="$form.input('description')" />
        <n-input title="Начало строительства" v-bind="$form.input('startedAt')" />
        <n-input title="Окончание строительства" v-bind="$form.input('endedAt')" />
        <n-upload title="Фото" :value.sync="file" />
        
        <n-button color="primary" wide type="submit">Сохранить</n-button>
      </n-items>
    </n-form>
  </n-modal>
</template>

<script>
export default {
  name: 'ModalEditProject',
  props: [ 'submit', 'project', ],
  data: () => ({
    file: null,
  }),
  created() {
    this.$form.init({
      title: this.project.title,
      address: this.project.address,
      description: this.project.description,
      startedAt: $app.date.format(this.project.startedAt),
      endedAt: $app.date.format(this.project.endedAt),
    })
  },
  methods: {
    s_submit() {
      this.$var('load', true)
  
      if (this.file) {
        $api.files.create({ file: this.file, }).then((response) => {
          const data = {
            ...this.$form.get(),
            avatar: response.data.content.id,
          }
          this.submitProject(data)
        }).catch(() => {
          this.$var('load', false)
        })
      } else {
        this.submitProject(this.$form.get())
      }
    },
    submitProject(data) {
      $api.iq.projects.edit(this.project.id, data).then((response) => {
        this.$d.reloadTag('projects')
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
  .modal-create-project {
  }
</style>
