<template>
  <n-modal class="modal-add" :loading="$var('load')" @close="$emit('close')">
    <h3>Добавить документ</h3>
    <n-form @submit="submit">
      <n-items>
        <n-select title="Тип" :data="types" :value.sync="type" item-value="id" option-title="title" selected-title="title" />
        
        <template v-if="type.name === 'figure'">
          <n-select title="Классификатор" :data="classes" :value.sync="selectedClass"
                    item-value="id" option-title="title" selected-title="title" />
          <n-select title="Проектная компания" :data="projectors" :value.sync="projector"
                    item-value="id" option-title="company.title" selected-title="company.title" />
        </template>
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
    classes: [],
    projectors: [],
    
    type: {},
    selectedClass: {},
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
        $api.iq.documents.getTypes(),
        $api.iq.documents.getClasses(),
        $api.iq.partners.get(this.project.id).filter({ role: 'projector', }),
      ]
      Promise.all(apis).then((response) => {
        this.types = response[0].data.content
        this.classes = response[1].data.content
        this.projectors = response[2].data.content
      }).finally(() => {
        this.$var('load', false)
      })
    },
    submit() {
      this.$var('load', true)
      const api = $n.reduce(this.files, (result, file) => {
        result.push({
          promise: $api.files.create({ file, }),
          title: file.name.split('.').slice(0, -1).join('.'),
        })
        return result
      }, [])
      
      $n.promiseObjects(api).then((files) => {
        const data = {
          ownerId: this.project.id,
          ownerType: 'project',
          partnerId: this.projector.id,
          typeId: this.type.id,
          classId: this.selectedClass.id,
          files: files.map((item) => ({ file: item.response.data.content.id, title: item.title, })),
          endedAt: this.$form.get('endedAt'),
        }
        $api.iq.documents.create(data).then((result) => {
          this.$emit('submit')
          this.$emit('close')
        }).finally(() => {
          this.$var('load', false)
        })
      }).finally(() => {
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
