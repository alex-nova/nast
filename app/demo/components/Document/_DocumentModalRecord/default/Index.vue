<template>
  <n-modal class="n-document-modal-record" :loading="$var('load')" @close="() => $emit('close')">
    <h3 v-if="recordId === undefined">Новая запись</h3>
    <template v-else>
      <h3>Карточка записи</h3>
      <div class="n-record-status">
        <span>Статус:</span> {{ statusTitle }}
      </div>
    </template>
    <n-form @submit="s_submit">
      <n-card-inputs v-if="values" :table-name="tableName" :values.sync="values" :fields="tableConfig.card"
                     :titles="template.titles" :editable="recordEditable" />
      
      <template v-if="values">
        <n-document-sign v-for="sign in values.signs || []" :key="sign.name"
                         :sign="sign" :title="getSignTitle(sign)" :author-id="authorId" @doSign="s_doSign" />
      </template>
      <n-divide>
        <div>
          <n-button v-if="editable && status === 'draft'" @click="changeStatus('formed')">Отправить на согласование</n-button>
        </div>
        <div>
          <n-button @click="$emit('close')">Закрыть</n-button>
          <n-button v-if="recordEditable" color="primary" type="submit" icon="save" style="margin-left: 10px">Сохранить</n-button>
        </div>
      </n-divide>
    </n-form>
  </n-modal>
</template>

<script>
import reduce from 'lodash/reduce'
import { statuses, } from 'components/Document/utils'
import props from './../props'
import NCardInputs from '../CardInputs'
import NDocumentSign from '../../_DocumentSign/default/Index'

export default {
  components: { NDocumentSign, NCardInputs, },
  mixins: [ props, ],
  data: () => ({
    data: [],
    selected: null,
    values: null,
    statuses,
  }),
  computed: {
    status() {
      return this.values?.status?.value
    },
    statusTitle() {
      return statuses[this.status] || ''
    },
    recordEditable() {
      return this.editable && [ undefined, 'draft', ].includes(this.status)
    },
    tableConfig() {
      /**
       * {
       *   card: {
       *     // fields используется если тип group, params используется если тип module
       *     field1: { type: 'field|group|module', fields: {}, params: {}, },
       *   },
       * }
       */
      return this.template.tables[this.tableName]
    },
    table() {
      return this.document.tables[this.tableName]
    },
  },
  created() {
    this.load()
  },
  methods: {
    getSignTitle(sign) {
      return this.values && this.values[sign.name]?.value
    },
    load() {
      return new Promise((resolve) => {
        if (this.recordId !== undefined) {
          if (this.tableConfig.storage === 'database') {
            this.$var('load', true)
            this.settings.apis.getRecords(this.document.id, this.tableName, this.recordId).with({ signs: {}, })
              .then((response) => {
                this.values = response.data.content
              }).finally(() => {
                this.$var('load', false)
                resolve()
              })
          } else {
            this.values = this.table[this.recordId]
          }
        } else {
          const reducer = (result, value, name) => {
            if (value.type === 'field') {
              result[name] = { value: '', }
            } else if (value.type === 'group') {
              Object.assign(result, reduce(value.fields, reducer, result))
            }
            return result
          }
          this.values = reduce(this.tableConfig.card, reducer, {})
          resolve()
        }
      })
    },
    s_submit() {
      this.$var('load', true)
      // this.$emit('submit', this.tableName, this.values)
      this.submit(this.tableName, this.values, this.recordId).then(() => {
        this.$emit('close')
        this.close()
      }).finally(() => {
        this.$var('load', false)
      })
    },
    changeStatus(status) {
      this.$var('load', true)
      this.settings.apis.changeRecordStatus(this.document.id, this.tableName, this.recordId, { status, }).then((response) => {
        this.$emit('changeStatus', response.data.content)
        this.load().finally(() => {
          this.$var('load', false)
        })
      }).catch(() => {
        this.$var('load', false)
      })
    },
    s_doSign(sign) {
      this.$emit('doSign', sign)
      this.doSign(sign)
    },
  },
}
</script>

<style lang="scss" scoped>
  .n-document-modal-record {
    font-size: 1rem;
    --n-modal-width: 1200px;
    
    h3 {
      margin-bottom: 5px;
    }
    
    .n-record-status {
      font-weight: normal;
      font-size: .8em;
    }
    
    .n-document-sign {
      font-size: .8em;
    }
  }
</style>
