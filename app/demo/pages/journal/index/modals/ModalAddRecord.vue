<template>
  <n-modal class="modal-add-record" :loading="$var('load')" @close="$emit('close')">
    <h3>Создать запись</h3>
    <n-form @submit="submit">
      <n-items>
        <n-select title="Вид работ" :data="workTypes" :value.sync="workType" item-value="id" option-title="name" selected-title="name" />
        <n-button wide color="primary" :disabled="!workType" type="submit">Создать запись</n-button>
      </n-items>
    </n-form>
  </n-modal>
</template>

<script>
export default {
  name: 'ModalAddRecord',
  props: [ 'project', ],
  data: () => ({
    workType: null,
    workTypes: [],
  }),
  created() {
    this.load()
  },
  methods: {
    load(params) {
      this.$var('load', true)
      $api.types.get().all(true).then((response) => {
        this.workTypes = response.data.content
      }).finally(() => {
        this.$var('load', false)
      })
    },
    submit() {
      this.$router.push({ name: 'records.create', params: { id: 1, }, query: { type: this.workType.id, project: this.project.id, }, })
    },
  },
}
</script>

<style lang="scss" scoped>
  .modal-add-record {
  
  }
</style>
