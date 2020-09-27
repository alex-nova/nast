<template>
  <n-modal class="modal-add" :loading="$var('load')" @close="$emit('close')">
    <h3>Добавить документ</h3>
    <n-form @submit="submit">
      <n-items>
        <n-select title="Тип" :data="types" :value.sync="type" item-value="id" option-title="title" selected-title="title" />
        <template v-if="type.id">
          <n-upload title="Файлы" :value.sync="files" multi />
        </template>
        
        <n-button color="primary" wide type="submit">Сохранить</n-button>
      </n-items>
    </n-form>
  </n-modal>
</template>

<script>
export default {
  name: 'ModalAdd',
  props: [ 'project', ],
  data: () => ({
    types: [],
    // projectors: [],
    
    type: {},
    projector: {},
    files: null,
  }),
  created() {
    this.loadData()
    this.$form.init({
      endedAt: undefined,
    })
  },
  methods: {
    loadData() {
      this.$var('load', true)
      const apis = [
        $api.iq.documents.getTypes().tree().sort([ 'id,asc', ]),
        // $api.iq.partners.get(this.project.id).filter({ role: 'projector', }),
      ]
      Promise.all(apis).then((response) => {
        this.types = response[0].data.content
        // this.projectors = response[2].data.content
      }).finally(() => {
        this.$var('load', false)
      })
    },
    submit() {
      this.$var('load', true)
      const api = $n.reduce(this.files, (result, file) => {
        result.push({
          promise: $api.files.create({ file, }),
        })
        return result
      }, [])
      
      $n.promiseObjects(api).then((files) => {
        const data = {
          ownerId: this.project.id,
          ownerType: 'project',
          // partnerId: this.projector.id,
          code: this.type.code,
          files: files.map((item) => (item.response.data.content.id)),
          endedAt: this.$form.get('endedAt'),
        }
        $api.iq.documents.create(data).then((result) => {
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
  .modal-add {
  
  }
</style>
