<template>
  <div class="n-document-tab-files">
    <n-loader :loading="$var('load')" />
    <div v-if="editable" class="n-add-file">
      <n-button icon="plus" @click="$var('addFile', true)">Прикрепить файл</n-button>
    </div>
    <div v-if="!$var('load') && !attachments.length && !recordFiles.length" class="n-empty">Файлов нет</div>
    
    <div v-for="attachment in attachments" :key="attachment.id" class="n-document-file">
      <div v-if="editable" class="n-remove" @click="s_removeFile(attachment.id)">
        <n-icon icon="trash" />
      </div>
      <div class="n-name">
        {{ attachment.file.name }}
        <div class="n-type">{{ attachment.type.title }}</div>
      </div>
      <div class="n-description">{{ attachment.file.description }}</div>
      <div class="n-download">
        <n-link :to="attachment.file.src" type="external" target="_blank">Посмотреть</n-link>
      </div>
    </div>
    
    <div v-for="attachment in recordFiles" :key="attachment.id" class="n-document-file">
      <div class="n-name">
        {{ attachment.file.name }}
        <div class="n-type">{{ attachment.type.title }}</div>
      </div>
      <div class="n-description">{{ attachment.file.description }}</div>
      <div class="n-download">
        <n-link :to="attachment.file.src" type="external" target="_blank">Посмотреть</n-link>
      </div>
    </div>
    
    <n-document-modal-add-file
      v-if="$var('addFile')" :document="document" :settings="settings"
      @submit="s_addFiles" @close="$var('addFile', false)" />
  </div>
</template>

<script>
import props from './../props'
import NDocumentModalAddFile from './../../_DocumentModalAddFile/default/Index'

export default {
  components: { NDocumentModalAddFile, },
  mixins: [ props, ],
  data() {
    return {
      attachments: [],
      recordFiles: [],
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.$var('load', true)
      const apis = [
        this.settings.apis.getFiles(this.document.id),
      ]
      if (this.document.template.name === 'aosr') {
        const workId = this.document.fields.work?.id
        if (workId) {
          apis.push($api.edms.documents.getFilesByWork(workId))
        }
      }
      if (this.document.template.name === 'appok') {
        const workId = this.document.fields.work?.id
        if (workId) {
          apis.push($api.edms.documents.getFilesByConstruction(workId))
        }
      }
      
      Promise.all(apis).then((responses) => {
        this.attachments = responses[0].data.content
        this.recordFiles = responses[1]?.data.content || []
      }).finally(() => {
        this.$var('load', false)
      })
    },
    s_addFiles(files) {
      this.load()
      this.$emit('addFiles', files)
      this.addFiles(files)
    },
    s_removeFile(fileId) {
      this.$var('load', true)
      this.settings.apis.removeFile(this.document.id, fileId).then((response) => {
        this.load()
      }).finally(() => {
        this.$var('load', false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.n-document-tab-files {
  .n-add-file {
    margin-bottom: 20px;
  }
  
  .n-document-file {
    margin-bottom: 20px;
    padding: 10px 20px;
    border: 1px solid #eee;
    .n-name {
      font-weight: bold;
    }
    .n-type {
      font-weight: normal;
      font-style: italic;
      font-size: .8em;
      display: inline-block;
      margin-left: 10px;
    }
    .n-remove {
      float: right;
      opacity: 0.1;
      transition: opacity var(--transition);
      padding: 5px;
      margin: -5px;
      cursor: pointer;
      &:hover {
        opacity: 1 !important;
      }
    }
    
    &:hover {
      .n-remove {
        opacity: 0.5;
      }
    }
  }
}
</style>
