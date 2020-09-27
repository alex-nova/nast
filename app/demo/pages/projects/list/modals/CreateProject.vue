<template>
  <n-modal class="create-project" :loading="$var('loading')" @close="$emit('close')">
    <h3>Создать проект</h3>
    <n-form @submit="s_submit">
      <n-items>
        <n-input title="Название" v-bind="$form.input('title')" />
        <n-input title="Адрес" v-bind="$form.input('address')" />
        <n-input title="Описание" v-bind="$form.input('description')" />
        <n-input title="Начало строительства" v-bind="$form.input('startedAt')" />
        <n-input title="Окончание строительства" v-bind="$form.input('endedAt')" />
        <n-upload title="Фото" :value.sync="file" />
        
        <n-button color="primary" wide type="submit">Создать</n-button>
      </n-items>
    </n-form>
  </n-modal>
</template>

<script>
export default {
  name: 'CreateProject',
  props: [ 'submit', ],
  data: () => ({
    file: null,
  }),
  created() {
    this.$form.init({
      title: undefined,
      address: undefined,
      description: undefined,
      startedAt: undefined,
      endedAt: undefined,
    })
    this.loadCompanies()
  },
  methods: {
    loadCompanies() {
      this.$var('loading', true)
      return $api.my.companiesAdmin().then((response) => {
        this.companies = response.data.content
      }).finally(() => {
        this.$var('loading', false)
      })
    },
    s_submit() {
      this.$var('loading', true)
  
      if (this.file) {
        $api.files.create({ file: this.file, }).then((response) => {
          this.callback(response.data.content.id)
        }).catch(() => {
          this.$var('loading', false)
        })
      } else {
        this.callback()
      }
    },
    callback(fileId) {
      const data = {
        ...this.$form.get(),
        avatar: fileId,
      }
      $api.iq.projects.create(data).then((response) => {
        this.$d.reloadTag('projects')
        this.$emit('close')
        this.submit()
      }).finally(() => {
        this.$var('loading', false)
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  .create-project {
  }
</style>
