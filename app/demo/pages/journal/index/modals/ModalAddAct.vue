<template>
  <n-modal class="modal-add-act" :loading="$var('load')" @close="$emit('close')">
    <h3>Создание акта</h3>
    <div>
      <n-select title="Шаблон" :data="templates" :value.sync="template" item-value="id" option-title="title" selected-title="title" />
    </div>
    <c-act v-if="template" :project-id="project.id" :act="template" :values.sync="values" editable />
    <div v-else class="empty-info">Выберите шаблон</div>
    <n-divide v-if="template">
      <div></div>
      <n-button color="primary" @click="submit">Создать</n-button>
    </n-divide>
  </n-modal>
</template>

<script>
import CAct from 'components/act/Index'

export default {
  name: 'ModalAddAct',
  components: { CAct, },
  props: [ 'project', ],
  data: () => ({
    template: null,
    values: {},
    templates: [],
  }),
  created() {
    this.load()
  },
  methods: {
    load() {
      this.$var('load', true)
      $api.acts.getTemplates(this.project.id).then((response) => {
        this.templates = response.data.content
      }).finally(() => {
        this.$var('load', false)
      })
    },
    submit() {
      this.$var('load', true)
      const data = {
        templateId: this.template.id,
        values: this.values,
      }
      $api.acts.create(this.project.id, data).then((response) => {
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
  .modal-add-act {
    .c-act {
      margin: 30px 0 20px;
    }
    .empty-info {
      padding: 30px 0 20px;
      text-align: center;
      opacity: .5;
    }
    &::v-deep > .n-wrapper {
      width: 1100px;
      left: calc(50% - 550px);
    }
  }
</style>
