<template>
  <n-modal class="n-document-modal-do-sign" :loading="$var('load')" @close="$emit('close')">
    <h3>Подписать акт</h3>
    <n-form @submit="submit">
      <n-items>
        <n-select title="Решение" :data="statuses" :value.sync="status" />
        <template v-if="status && status.value === false">
          <n-input title="Причина отказа" v-bind="$form.input('problem')" />
          <n-upload title="Файлы" :value.sync="files" multi />
        </template>
        
        <n-button color="primary" icon="file-signature" wide @click="s_sign">Подписать</n-button>
      </n-items>
    </n-form>
  </n-modal>
</template>

<script>
import props from './../props'
import Pki from './../Pki'

export default {
  mixins: [ props, ],
  data: () => ({
    statuses: [
      { value: true, title: 'Подписать', },
      { value: false, title: 'Отклонить', },
    ],
    status: { value: true, title: 'Подписать', },
    files: null,
    websoket: null,
  }),
  created() {
    this.$form.init({
      problem: '',
      solution: '',
    })
  
    Pki.start()
    Pki.config({
      onError: (response) => {
        this.$toast.open({
          message: 'NCA Layer: ' + response.message,
          type: 'error',
          position: 'top-right',
          duration: 5000,
        })
      },
    })
  },
  methods: {
    s_sign() {
      this.submit('asd'); return
      const xmlToSign = `
        <document>
          <content></content>
          <files></files>
        </document>`
    
      Pki.sign(xmlToSign, (xml) => {
        this.submit(xml)
      })
    },
    submit(xml) {
      this.$var('load', true)
      const apis = $n.reduce(this.files, (result, file) => {
        result.push(this.settings.apis.saveFile({ file, }))
        return result
      }, [])
      Promise.all(apis).then((files) => {
        const data = {
          isApproved: this.status.value,
          ...this.$form.get(),
          files: files.map((item) => item.data.content.id),
          eds: xml,
        }
        this.settings.apis.sign(this.sign.id, data).then((result) => {
          this.$emit('submit')
          this.$emit('close')
        }).finally(() => {
          this.$var('load', false)
        })
      }).catch(() => {
        this.$var('load', false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .n-document-modal-do-sign {
  
  }
</style>
