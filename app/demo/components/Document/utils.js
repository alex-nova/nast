import qrcode from 'qrcode-generator'
import get from 'lodash/get'
import each from 'lodash/each'
import isArray from 'lodash/isArray'
import NDocumentField from './_DocumentField/default/Index'

// https://stackoverflow.com/questions/18729405/how-to-convert-utf8-string-to-byte-array
qrcode.stringToBytes = (str) => $n.map(unescape(encodeURIComponent(str)), (char) => char.charCodeAt(0))


export const createQR = (data, number, level) => {
  const qr = qrcode(number, level)
  qr.addData(data)
  qr.make()
  return qr.createDataURL()
}

export const statuses = {
  draft: 'Черновик',
  formed: 'Ожидает подписания',
  approved: 'Подписан',
  rejected: 'Отклонен',
}

export const contentParserComponent = (content) => {
  return {
    template: content,
    components: { NDocumentField, },
    props: {
      template: { type: Object, default: () => ({}), },
      document: { type: Object, default: () => ({}), },
      records: { type: Object, default: () => ({}), },
      editable: { type: Boolean, default: false, },
      
      editVar: { type: Function, default: (name) => {}, },
      createRecord: { type: Function, default: (tableName) => {}, },
      showRecord: { type: Function, default: (tableName, recordId) => {}, },
      doSign: { type: Function, default: (sign) => {}, },
    },
    methods: {
      get,
      s_editVar(name) {
        this.$emit('editVar', name)
        this.editVar(name)
      },
      s_createRecord(tableName) {
        this.$emit('createRecord', tableName)
        this.createRecord(tableName)
      },
      s_showRecord(tableName, recordId) {
        this.$emit('showRecord', tableName, recordId)
        this.showRecord(tableName, recordId)
      },
      s_doSign(sign) {
        this.$emit('doSign', sign)
        this.doSign(sign)
      },
      getClickFn(record, tableName, index) {
        const recordId = this.template.tables[tableName].storage === 'database' ? record.id.value : index
        this.s_showRecord(tableName, recordId)
      },
      getSign(name) {
        return this.document?.signs[name]
      },
      getSignTitle(name) {
        return this.document?.fields[name]
      },
    },
  }
}

export const replaceVars = (content, editable) => {
  return content.replace(/__.+__/g, (strP) => {
    const vars = strP.substr(2, strP.length - 4).split('_')
    const name = vars[0]
    const tip = vars[1] || ''
    return `<n-document-field :value="get(document.fields['${name}'], 'value')" tip="${tip}" :editable="${editable}" @click="s_editVar('${name}')" />`
  })
}

export const replaceTables = (content, editable) => {
  return content.replace(/{table[^}]+}/g, (strP) => {
    const tableVars = strP.substr(7, strP.length - 8).split('_')
    const tableName = tableVars.shift()
    let result = ``
    
    if (editable) {
      result += `
      <tr><td colspan="${tableVars.length}" class="add-button-row">
        <n-button icon="plus" @click="s_createRecord('${tableName}')">Добавить запись</n-button>
      </td></tr>`
    }
    
    let columns = $n.reduce(tableVars, (result, varName) => {
      result += `<td>{{get(record, '${varName}.value') || '-'}}</td>`
      return result
    }, '')
    columns += `<td class="tools"><n-icon icon="${editable ? 'pen' : 'eye'}" flat @click="getClickFn(record, '${tableName}', index)" /></td>`
    result += `<tr v-for="(record, index) in records['${tableName}']" :key="index">${columns}</tr>`
  
    return result
  })
}

export const replaceSigns = (content, document, authorId) => {
  return content.replace(/{sign.+}/g, (strP) => {
    const signName = strP.substr(6, strP.length - 7)
    return `<n-document-sign sign="getSign('${signName}')" :title="getSignTitle('${signName}')" :author-id="${authorId}" @doSign="s_doSign" />`
  })
}

export const calcAvailableActions = (template, document, myActors) => {
  const actions = {
    edit: [],
    delete: false,
    push: [],
    // sign: null,
  }
  if (document.id) {
    each(template.statuses[document.status], (value, actorName) => {
      if (!myActors.includes(actorName)) return
      
      if (value.edit === true) {
        actions.edit = Object.keys(template.fields)
      }
      if (isArray(value.edit)) {
        each(value.edit, (item) => {
          if (!actions.edit.includes(item)) actions.edit.push(item)
        })
      }
      if (!actions.delete && actorName.delete) {
        actions.delete = actorName.delete
      }
      if (isArray(value.push)) {
        each(value.push, (item) => {
          if (!actions.push.includes(item)) actions.push.push(item)
        })
      }
    })
  }
  return actions
}
