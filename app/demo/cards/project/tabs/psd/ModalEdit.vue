<template>
  <n-modal class="modal-edit" @close="$emit('close')">
    <h3>Информация о документе</h3>
    <n-loader :loading="$var('load')" />
    <n-form>
      <n-items v-if="document">
        <n-form-item v-if="document.partner" title="Проектная организация" active>
          {{ document.partner.company.title }}
          <span style="font-size: .9em; opacity: .9;">[{{ document.partner.company.bin }}]</span>
        </n-form-item>

        <n-form-item v-if="document.type" title="Документ" active>
          {{ document.type.title }}
          <span v-if="document.class" style="font-size: .9em; opacity: .9;">[{{ document.class.title }}]</span>
        </n-form-item>

        <n-input title="Название" v-bind="$form.input('title')" text />

        <n-input v-if="document.type.name === 'figure'" title="Шифр" v-bind="$form.input('code')" text />

        <n-form-item v-if="document.type.hasVersions" title="Версии" active>
          <n-button style="font-size: .8em; margin-bottom: 5px" @click="$var('add', document)">Загрузить новую версию</n-button>
          <n-table :data="document.versions" :columns="columns" style="font-size: .8em;">
            <template #version="{item}">
              v{{ item.position }}
            </template>
            <template #createdAt="{item}">
              {{ $app.date.format(item.createdAt, 'datetime') }}
            </template>
            <template #file="{item}">
              <n-link :to="item.src" type="external" target="_blank">Скачать</n-link>
            </template>
          </n-table>
        </n-form-item>
        <n-link v-else :to="document.src" type="external" target="_blank">Скачать</n-link>

      </n-items>
      <n-divide>
        <div></div>
        <n-button style="margin-top: 10px;" @click="$emit('close')">Закрыть</n-button>
      </n-divide>
    </n-form>

    <modal-add-version v-if="$var('add')" :document="document" @submit="submit" @close="$var('add', false)" />
  </n-modal>
</template>

<script>
import ModalAddVersion from './ModalAddVersion'

export default {
  name: 'ModalEdit',
  components: { ModalAddVersion, },
  props: [ 'project', 'documentId', ],
  data: () => ({
    document: null,
    columns: [
      { name: 'version', title: 'Версия', },
      { name: 'createdAt', title: 'Дата загрузки', },
      { name: 'file', title: 'Файл', },
    ],
  }),
  created() {
    this.load()
  },
  methods: {
    load() {
      this.$var('load', true)
      $api.iq.documents.get(this.documentId).with({ versions: {}, }).then((result) => {
        this.document = result.data.content
        this.$form.init({
          title: this.document.title,
          code: this.document.meta.code,
        })
      }).finally(() => {
        this.$var('load', false)
      })
    },
    submit() {
      this.load()
      this.$emit('submit')
    },
  },
}
</script>

<style lang="scss" scoped>
  .modal-edit {
  }
</style>
