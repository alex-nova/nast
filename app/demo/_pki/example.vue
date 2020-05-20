<template>
  <n-modal class="modal-sign" :loading="$var('load')" @close="$emit('close')">
    <h3>Подписать акт</h3>
    <n-form @submit="submit">
      <n-items>
        <n-select title="Решение" :data="statuses" :value.sync="status" />
        <template v-if="status && status.value === 'no'">
          <n-input title="Причина отказа" v-bind="$form.input('problem')" />
          <!--          <n-input title="Указания об устранении и сроки выполнения" v-bind="$form.input('solution')" />-->
          <n-upload title="Файлы" :value.sync="files" multi />
        </template>
        
        <n-button color="primary" icon="file-signature" wide @click="sign">Подписать</n-button>
      </n-items>
    </n-form>
  </n-modal>
</template>

<script>
export default {
  name: 'ModalSign',
  props: [ 'signer', 'projectId', 'actId', ],
  data: () => ({
    statuses: [
      { value: 'yes', title: 'Подписываю', },
      { value: 'no', title: 'Отказ', },
    ],
    status: { value: 'yes', title: 'Подписываю', },
    files: null,
    websoket: null,
  }),
  created() {
    this.$form.init({
      problem: '',
      solution: '',
    })
    
    this.webSocket = new WebSocket('wss://127.0.0.1:13579/')
    this.webSocket.onmessage = (event) => {
      const result = JSON.parse(event.data)
      this.signXmlBack(result)
    }
    this.webSocket.onclose = function(event) {
      if (event.wasClean) {
        // console.log('connection has been closed')
      } else {
        // console.log('Connection error')
        if (confirm('Ошибка при подключении к NCALayer. Запустите NCALayer и нажмите ОК') === true) {
          location.reload()
        }
      }
    }
  },
  methods: {
    submit() {
      this.$var('load', true)
      const api = $n.reduce(this.files, (result, file) => {
        result.push($api.files.create(file))
        return result
      }, [])
      Promise.all(api).then((files) => {
        const data = {
          name: this.signer.name,
          isApproved: this.status.value === 'yes',
          ...this.$form.get(),
          files: files.map((item) => item.data.content.id),
        }
        $api.acts.sign(this.projectId, this.actId, data).then((result) => {
          this.$emit('submit')
          this.$emit('close')
        }).finally(() => {
          this.$var('load', false)
        })
      })
    },
    sign() {
      const xmlToSign = '<document><type>1</type><name>sadsad</name></document>'
      this.blockScreen()
      this.signXml('PKCS12', 'SIGNATURE', xmlToSign, 'signXmlBack')
    },
    signXml(storageName, keyType, xmlToSign, callBack) {
      const signXml = {
        'module': 'kz.gov.pki.knca.commonUtils',
        'method': 'signXml',
        'args': [ storageName, keyType, xmlToSign, '', '', ],
      }
      // callback = callBack
      this.webSocket.send(JSON.stringify(signXml))
    },
    signXmlBack(result) {
      // unblockScreen()
      if (result['code'] === '500') {
        alert(result['message'])
      } else if (result['code'] === '200') {
        const res = result['responseObject']
        // console.log(res)
        this.submit()
      }
    },
    blockScreen() {
    },
  },
}
</script>

<style lang="scss" scoped>
  .modal-sign {
  
  }
</style>
