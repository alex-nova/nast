<template>
  <n-modal class="modal-add" :loading="$var('load')" @close="$emit('close')">
    <h3>Создать акт освидетествования скрытых работ</h3>
    <n-form @submit="submit">
      <n-items>
        <n-input title="Наименование работ" :value="work.name" text />
        <n-input title="Дата" v-bind="$form.input('executedAt')" />
        <n-input title="Наименование скрытых работ" v-bind="$form.input('desc')" />
        <n-button color="primary" wide type="submit">Сохранить</n-button>
      </n-items>
    </n-form>
  </n-modal>
</template>

<script>
export default {
  name: 'ModalAct',
  props: [ 'project', 'work', ],
  created() {
    this.$form.init({
      executedAt: $app.date.format($app.date.now()),
      desc: '',
    })
  },
  methods: {
    submit() {
      this.$var('load', true)
      const data = {
        projectId: this.project.id,
        workId: this.work.id,
        ...this.$form.get(),
      }
      $api.acts.create(data).then(() => {
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
    &::v-deep > .n-wrapper {
      width: 800px;
      left: calc(50% - 400px);
    }
  }
</style>
