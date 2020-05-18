<template>
  <n-modal class="modal-edit" @close="$emit('close')">
    <h3>Информация о документе</h3>
    <n-loader :loading="$var('load')" />
    <n-form>
      <n-items>
        <n-form-item v-if="document.partner" title="Проектная организация" active>
          {{ document.partner.company.name }}
          <span style="font-size: .9em; opacity: .9;">[{{ document.partner.company.bin }}]</span>
        </n-form-item>
        
        <n-form-item v-if="document.types" title="Документ" active>
          <template v-if="document.types === 'figure'">
            {{ types[document.types] }} <span style="font-size: .9em; opacity: .9;">[{{ classes[document.classId].title }}]</span>
          </template>
          <template v-else-if="document.types === 'psd'">
            {{ psdTypes[document.classId].title }}
          </template>
          <template v-else-if="document.types === 'permit'">
            {{ permitTypes[document.classId].title }}
          </template>
          <br />
          <n-link :to="document.src" type="external" target="_blank">Скачать</n-link>
        </n-form-item>
  
        <n-input title="Название" v-bind="$form.input('title')" text />
        <n-input v-if="document.types === 'figure'" title="Шифр" v-bind="$form.input('code')" text />
        
        <n-form-item v-if="document.versions" title="Версии" active>
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
      </n-items>
      <n-divide>
        <div></div>
        <n-button style="margin-top: 10px;" @click="$emit('close')">Закрыть</n-button>
      </n-divide>
    </n-form>
  
    <modal-add-version v-if="$var('add')" :document="document" @submit="() => loadData()" @close="$var('add', false)" />
  </n-modal>
</template>

<script>
import ModalAddVersion from './ModalAddVersion'

export default {
  name: 'ModalEdit',
  components: { ModalAddVersion, },
  props: [ 'project', 'documentId', 'classes', 'psdTypes', 'permitTypes', 'types', ],
  data: () => ({
    document: {},
    columns: [
      { name: 'version', title: 'Версия', },
      { name: 'createdAt', title: 'Дата загрузки', },
      { name: 'file', title: 'Файл', },
    ],
  }),
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.$var('load', true)
      $api.documents.get(this.documentId).with({ partner: {}, versions: {}, }).then((result) => {
        this.document = result.data.content
        this.$form.init({
          title: this.document.title,
          code: this.document.meta.code,
        })
      }).finally(() => {
        this.$var('load', false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .modal-edit {
  }
</style>
