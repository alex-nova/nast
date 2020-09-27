<template>
  <div class="n-document">
    <n-loader :loading="loading || $var('load')" />
    <n-tabs :data="tabs" name="page" state />
    
    <div class="n-paper">
      <n-tabs-content name="page">
        <template v-for="tab in tabs" v-slot:[tab.name]>
          <div v-if="template && document" :key="tab.name" class="n-content">
            <div :is="parser[tab.name]" :template="template" :document="document" :records="records"
                 @editVar="(n) => $var('editVar', n)" @createRecord="(n) => $var('createRecord', n)"
                 @showRecord="(tableName, recordId) => $var('showRecord', { tableName, recordId, })" @doSign="(s) => $var('doSign', s)" />
          </div>
        </template>
        <template #files>
          <n-document-tab-files :document="document" :settings="settings" :editable="editable" @addFiles="addFiles" />
        </template>
      </n-tabs-content>
    </div>
  
    <n-document-modal-edit-var
      v-if="$var('editVar')" :name="$var('editVar')" :project-id="projectId" :fields="template.fields" :values="document.fields" :settings="settings"
      @submit="editVar" @close="$var('editVar', false)" />
    <n-document-modal-record
      v-if="$var('createRecord')" :template="template" :table-name="$var('createRecord')"
      :submit="createRecord" @close="$var('createRecord', false)" />
    <n-document-modal-record
      v-if="$var('showRecord')" :template="template" :table-name="$var('showRecord').tableName"
      :record-id="$var('showRecord').recordId" :editable="editable" :document="document" :author-id="authorId" :settings="settings"
      :submit="editRecord" @changeStatus="changeRecordStatus" @doSign="(s) => $var('doSign', s)" @close="$var('showRecord', false)" />
    <n-document-modal-do-sign
      v-if="$var('doSign')" :sign="$var('doSign')" :settings="settings"
      @submit="doSign" @close="$var('doSign', false)" />
  </div>
</template>

<script>
import get from 'lodash/get'
import reduce from 'lodash/reduce'
import isObject from 'lodash/isObject'
import each from 'lodash/each'
import props from './../props'
import { contentParserComponent, replaceSigns, replaceTables, replaceVars, } from './../utils'
import NDocumentField from './../_DocumentField/default/Index'
import NDocumentModalEditVar from './../_DocumentModalEditVar/default/Index'
import NDocumentModalRecord from './../_DocumentModalRecord/default/Index'
import NDocumentModalDoSign from './../_DocumentModalDoSign/default/Index'
import NDocumentTabFiles from '../_DocumentTabFiles/default/Index'

export default {
  components: { NDocumentTabFiles, NDocumentField, NDocumentModalEditVar, NDocumentModalRecord, NDocumentModalDoSign, },
  mixins: [ props, ],
  data: () => ({
    records: {},
  }),
  computed: {
    parser() {
      if (this.template && this.document) {
        return reduce(this.content, (result, content, name) => {
          result[name] = contentParserComponent(this.prepareContent(content))
          return result
        }, {})
      }
      return []
    },
    tabs() {
      const result = []
      if (isObject(this.template.content)) {
        each(this.template.content, (item, name) => {
          result.push({ name, title: this.template.titles[`content.${name}`], })
        })
      } else {
        result.push({ name: 'main', title: 'Документ', })
      }
      if (this.document.id) { // при просмотре шаблона файлы показывать не надо
        result.push({ name: 'files', title: 'Файлы', })
      }
      return result
    },
    content() {
      return isObject(this.template.content) ? this.template.content : { main: this.template.content, }
    },
  },
  watch: {
    document() {
      this.getRecords()
    },
  },
  created() {
    if (this.document.id) {
      this.getRecords()
    }
  },
  methods: {
    getRecords() {
      if (!this.document.id) return
      
      each(this.template.tables, (table, name) => {
        if (table.storage === 'database') {
          this.$var('load', true)
          this.settings.apis.getRecords(this.document.id, name).then((response) => {
            this.$set(this.records, name, response.data.content)
          }).finally(() => {
            this.$var('load', false)
          })
        } else {
          this.$set(this.records, name, this.document.tables[name])
        }
      })
    },
    prepareContent(content) {
      let result = `<div>${content}</div>`
      result = replaceVars(result, this.editable)
      result = replaceTables(result, this.editable)
      result = replaceSigns(result, this.document, this.authorId, this.editable)
      return result
    },
    editVar(name, value) {
      const data = {
        ...this.document,
        fields: {
          ...this.document.fields,
          [name]: value,
        },
      }
      this.$emit('update:document', data)
      this['update:document'](data)
      this.$emit('varEdited', name, value)
      this.varEdited(name, value)
    },
    createRecord(tableName, record) {
      const tableConfig = get(this.template.tables, tableName, [])
      let api
      if (tableConfig.storage === 'database') {
        const data = {
          record,
        }
        api = this.settings.apis.createRecord(this.document.id, tableName, data).then((response) => {
          this.getRecords()
          this.$var('showRecord', { tableName, recordId: response.data.content.id.value, })
          return response.data.content
        })
      } else {
        api = new Promise((resolve) => {
          setTimeout(() => {
            const table = get(this.document.tables, tableName, [])
            table.push(record)
  
            const data = {
              ...this.document,
              tables: {
                ...this.document.tables,
                [tableName]: table,
              },
            }
            this.$emit('update:document', data)
            this['update:document'](data)
            
            resolve(record)
          }, 300)
        })
      }
      
      return api.then((record) => {
        this.$emit('recordCreated', record)
        this.recordCreated(record)
        return record
      })
    },
    editRecord(tableName, record, recordId) {
      const tableConfig = get(this.template.tables, tableName, [])
      let api
      if (tableConfig.storage === 'database') {
        const data = {
          record,
        }
        api = this.settings.apis.editRecord(this.document.id, tableName, recordId, data).then((response) => {
          this.getRecords()
          return response.data.content
        })
      } else {
        api = new Promise((resolve) => {
          setTimeout(() => {
            const table = [ ...this.document.tables[tableName], ]
            table[recordId] = record
  
            const data = {
              ...this.document,
              tables: {
                ...this.document.tables,
                [tableName]: table,
              },
            }
  
            this.$emit('update:document', data)
            this['update:document'](data)
            
            resolve(record)
          }, 300)
        })
      }
  
      return api.then((record) => {
        this.$emit('recordEdited', tableName, recordId, record)
        this.recordEdited(tableName, recordId, record)
        return record
      })
    },
    changeRecordStatus(record) {
      this.getRecords()
    },
    doSign(name, sign) {
      this.$var('showRecord', false)
      this.$emit('signed', name, sign)
      this.signed(name, sign)
    },
    addFiles(files) {
      this.$emit('addedFiles', files)
      this.addedFiles(files)
    },
  },
}
</script>

<style lang="scss" scoped>
  .n-document {
    .n-paper {
      position: relative;
      background: white;
      border: 1px solid #eee;
      box-shadow: 1px 1px 2px rgba(127, 127, 127, .5);
      padding: 80px 80px;
      font-size: .8em;
      min-height: 800px;
      
      .n-content {
      }
    }
  
    .n-paper .n-content::v-deep {
      p {
        line-height: 2.2;
        margin: 20px 0;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        .add-button-row {
          text-align: center;
        }
        .tools {
          border: none;
          width: 0;
          position: absolute;
          opacity: 0;
          transition: opacity var(--transition-slow);
          cursor: pointer;
        }
      }
      tr {
        &:hover {
          .tools { opacity: 1; }
        }
      }
      td, th {
        font-size: .9em;
        border: 1px solid #333;
        padding: 5px 10px;
      }
      .columns {
        display: flex;
        justify-content: space-between;
      }
      .columns>div {
        &>* {
          padding: 8px 0;
        }
      }
      .title {
        width: 100%;
        margin: 40px 0 20px;
        font-weight: bold;
        text-align: center;
      }
    }
  }
</style>
