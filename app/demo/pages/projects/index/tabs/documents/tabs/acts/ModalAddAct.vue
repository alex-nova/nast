<template>
  <n-modal class="modal-add-act" :loading="$var('load')" @close="$emit('close')">
    <h3>Создание акта</h3>
    <div>
      <n-select title="Шаблон" :data="templates" :value.sync="template" item-value="id" option-title="title" selected-title="title" />
    </div>
    <n-document v-if="template" :project-id="project.id" :template="template" :document.sync="document" />
    <div v-else class="empty-info">Выберите шаблон</div>
    <n-divide v-if="template">
      <div></div>
      <n-button color="primary" @click="submit">Создать</n-button>
    </n-divide>
  </n-modal>
</template>

<script>
import NDocument from 'components/Document/default/Index'

export default {
  name: 'ModalAddAct',
  components: { NDocument, },
  props: [ 'project', ],
  data: () => ({
    template: undefined,
    document: { fields: {}, tables: {}, signs: {}, },
    templates: [],
  }),
  created() {
    this.load()
  },
  methods: {
    load() {
      this.$var('load', true)
      $api.edms.templates.get().filter({ tag: 'act', }).all().then((response) => {
        this.templates = response.data.content
      }).finally(() => {
        this.$var('load', false)
      })
    },
    submit() {
      this.$var('load', true)
      const data = {
        templateId: this.template.id,
        ownerId: this.project.id,
        ownerType: 'project',
        fields: this.document.fields,
        tables: this.document.tables,
      }
      $api.edms.documents.create(data).then((response) => {
        this.$emit('submit', response.data.content)
        this.$emit('close')
        this.$router.push({ query: { ...this.$route.query, _document: response.data.content.id, }, })
      }).finally(() => {
        this.$var('load', false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .modal-add-act {
    .n-document {
      margin: 30px 0 20px;
    }
    .empty-info {
      padding: 30px 0 20px;
      text-align: center;
      opacity: .5;
    }
    &::v-deep > .n-wrapper {
      width: 1300px;
      left: calc(50% - 650px);
    }
  }
</style>
