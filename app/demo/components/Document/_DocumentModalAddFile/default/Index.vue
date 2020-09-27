<template>
  <n-modal class="n-document-modal-add-file" :loading="$var('load')" @close="() => $emit('close')">
    <h3>Прикрепить файл</h3>
    <n-form @submit="s_submit">
      <n-items>
        <n-select title="Источник" :data="sources" :value.sync="source" />
  
  
        <template v-if="source && ['attach', 'new'].includes(source.value)">
          <n-select title="Тип" :data="types" :value.sync="type" item-value="id" />
        </template>
        
        <template v-if="type && source && ['attach'].includes(source.value)">
          <n-select title="Выбор файлов" :data="docs" :value.sync="selectedDocs"
                    item-value="id" selected-title="file.name" option-title="file.name" />
        </template>
        
        <template v-if="source && ['simple', 'new'].includes(source.value)">
          <n-input title="Описание" v-bind="$form.input('description')" />
          <n-upload title="Файл" :value.sync="file" />
        </template>
        
        <n-button color="primary" type="submit" icon="save" wide>Сохранить</n-button>
      </n-items>
    </n-form>
  </n-modal>
</template>

<script>
import props from './../props'

export default {
  mixins: [ props, ],
  data: () => ({
    sources: [
      { value: 'attach', title: 'Прикрепить файл из проекта', },
      { value: 'simple', title: 'Загрузить новый файл', },
      { value: 'new', title: 'Загрузить новый файл и добавить в проект', },
    ],
    source: undefined,
    types: [],
    type: undefined,
    docs: [],
    selectedDocs: [],
    file: undefined,
  }),
  watch: {
    type(value) {
      if (value && this.source?.value === 'attach') {
        this.loadDocs()
      }
    },
  },
  created() {
    this.$form.init({
      description: '',
    })
    this.load()
  },
  methods: {
    load() {
      this.$var('load', true)
      $api.iq.documents.getTypes().tree().sort([ 'id,asc', ]).then((response) => {
        this.types = response.data.content
      }).finally(() => {
        this.$var('load', false)
      })
    },
    loadDocs() {
      this.$var('load', true)
      $api.iq.documents.getByProject(this.settings.custom.projectId).filter({ type: this.type.code, }).then((response) => {
        this.docs = response.data.content
      }).finally(() => {
        this.$var('load', false)
      })
    },
    s_submit() {
      this.$var('load', true)
  
      if (this.source.value === 'attach') {
        const data = {
          files: this.selectedDocs.reduce((result, item) => {
            result.push(item.id)
            return result
          }, []),
        }
        this.settings.apis.attachFiles(this.document.id, data).then((response) => {
          this.submitAndClose(response)
        }).finally(() => {
          this.$var('load', false)
        })
      } else {
        const filesData = {
          file: this.file,
          description: this.$form.get('description'),
        }
        this.settings.apis.saveFile(filesData).then((response) => {
          const data = {
            ownerId: this.settings.custom.projectId,
            ownerType: 'project',
            code: this.source.value === 'simple' ? 'attach' : this.type.code,
            files: [ response.data.content.id, ],
            documentId: this.document.id,
          }
          $api.iq.documents.create(data).then((response) => {
            this.submitAndClose(response)
          }).finally(() => {
            this.$var('load', false)
          })
        }).catch(() => {
          this.$var('load', false)
        })
      }
    },
    submitAndClose(data) {
      this.$emit('submit', data)
      this.submit(data)
      this.$emit('close')
      this.close()
    },
  },
}
</script>

<style lang="scss" scoped>
  .n-document-modal-add-file {
    font-size: 1rem;
    --n-modal-width: 500px;
  }
</style>
