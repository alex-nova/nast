<template>
  <n-modal class="modal-edit-document" :loading="$var('load')" @close="close">
    <n-divide v-if="document">
      <div style="width: 100%">
        <n-input title="Статус" :value="statuses[status]" text />
      </div>
      <n-items style="text-align: right">
        <n-button v-if="status === 'draft'" @click="changeStatus('formed')">Отправить на согласование</n-button>
        <!--        <n-button v-if="status === 'draft'" color="danger" icon="trash" flat round @click="remove" />-->
      </n-items>
    </n-divide>
    
    <n-document
      v-if="me && project" :template="template" :document="document" :editable="status === 'draft'"
      :author-id="me.user.id" :settings="settings"
      :project-id="project ? project.id : 0"
      @update:document="updateDocument" @signed="documentSigned" />
  </n-modal>
</template>

<script>
import NDocument from 'components/Document/default/Index'
import getSettings from './settings'
import { statuses, } from 'components/Document/utils'

export default {
  name: 'CardDocument',
  components: { NDocument, },
  props: {
    documentId: { type: Number, default: 0, },
  },
  data: () => ({
    template: null,
    signs: [],
  
    document: undefined,
    project: null,
    me: null,
    statuses,
  }),
  computed: {
    status() {
      return this.document && this.document.status
    },
    s_documentId() {
      return this.documentId || this.$route.query.document
    },
    settings() {
      return getSettings(this.document.ownerId)
    },
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.$var('load', true)
      $api.edms.documents.get(this.s_documentId).with({ template: {}, signs: {}, owner: {}, files: {}, }).then((response) => {
        const document = response.data.content
        this.document = {
          ...document,
          signs: $n.reduce(document.signs, (result, item) => {
            result[item.name] = item
            return result
          }, {}),
        }
        this.template = document.template
        this.project = document.owner
  
        $api.auth.info($app.store.state('app.company').id, this.project.id).then((response) => {
          this.me = response.data.content
        }).finally(() => {
          this.$var('load', false)
        })
      }).catch(() => {
        this.$var('load', false)
      })
    },
    updateDocument(document) {
      this.document = document
      $api.edms.documents.edit(this.document.id, document).with({ signs: {}, }).then((response) => {
        this.document = response.data.content
      })
    },
    changeStatus(status) {
      this.$var('load', true)
      $api.edms.documents.changeStatus(this.document.id, status).with({ signs: {}, }).then((response) => {
        this.document = response.data.content
        this.load()
        this.$emit('update')
      }).catch(() => {
        this.$var('load', false)
      })
    },
    documentSigned() {
      this.load()
      this.$emit('update')
    },
    doSign() {
      this.load()
      this.$emit('update')
    },
    remove() {
      this.$var('load', true)
      $api.edms.documents.delete(this.document.id).then((response) => {
        this.$emit('update')
        this.close()
      }).finally(() => {
        this.$var('load', false)
      })
    },
    close() {
      this.$router.push({ query: { ...this.$route.query, document: undefined, _document: undefined, }, })
    },
  },
}
</script>

<style lang="scss" scoped>
  .modal-edit-document {
    
    .n-document {
      margin: 30px 0 20px;
    }
    &::v-deep > .n-wrapper {
      width: 1100px;
      left: calc(50% - 550px);
    }
  
    .signs-block {
      margin: 15px 0 0;
      --n-card-padding: 20px;
      
      .sign {
        margin: 25px 0;
        padding: 25px 0 0;
        border-top: 1px solid #eee;
        
        .title {
          margin: 5px 0;
        }
  
        .status {
          display: inline-block;
          font-size: .9em;
          .error {
            color: var(--danger);
          }
          .success {
            color: var(--success);
          }
          .default {
            color: var(--gray-5);
          }
        }
  
        .time {
          display: inline-block;
          margin-left: 10px;
          font-size: .8em;
          opacity: .9;
        }
        
        .answer {
          margin: 10px 0 0;
        }
        
        .sign-button {
          font-size: .9em;
        }
      }
    }
  }
</style>
