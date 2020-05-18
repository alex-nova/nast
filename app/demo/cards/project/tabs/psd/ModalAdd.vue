<template>
  <n-modal class="modal-add" :loading="$var('load')" @close="$emit('close')">
    <h3>Добавить документ</h3>
    <n-form @submit="submit">
      <n-items>
        <n-select title="Тип" :data="types" :value.sync="type" />
        <template v-if="type.value === 'permit'">
          <n-select title="Тип документа" :data="permitTypes" :value.sync="permitType"
                    item-value="id" option-title="title" selected-title="title" />
        </template>
        <template v-if="type.value === 'psd'">
          <n-select title="Тип документа" :data="psdTypes" :value.sync="psdType"
                    item-value="id" option-title="title" selected-title="title" />
        </template>
        <template v-else-if="type.value === 'figure'">
          <n-select title="Классификатор" :data="classes" :value.sync="selectedClass"
                    item-value="id" option-title="title" selected-title="title" />
          <n-input title="Шифр" v-bind="$form.input('code')" />
          <n-select title="Проектная компания" :data="projectors" :value.sync="projector"
                    item-value="id" option-title="company.name" selected-title="company.name" />
        </template>
        <template v-if="type.value">
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
    types: [
      { value: 'psd', title: 'Проектная документация', },
      { value: 'estimation', title: 'Смета', },
      { value: 'permit', title: 'Разрешительная документация', },
      { value: 'input', title: 'Входной контроль', },
      { value: 'lab', title: 'Лабораторные испытания', },
      { value: 'schemas', title: 'Исполнительные схемы', },
    ],
    classes: [],
    psdTypes: [],
    permitTypes: [],
    projectors: [],
    
    type: {},
    selectedClass: {},
    psdType: {},
    permitType: {},
    projector: {},
    files: null,
  }),
  created() {
    this.loadData()
    this.$form.init({
      code: '',
    })
  },
  methods: {
    loadData() {
      this.$var('load', true)
      const apis = [
        $api.dictionaries.get('figureClasses'),
        $api.dictionaries.get('psdTypes'),
        $api.dictionaries.get('permitTypes'),
        $api.projects.partners.getByRole(this.project.id, 'projector'),
      ]
      Promise.all(apis).then((response) => {
        this.classes = response[0].data.content
        this.psdTypes = response[1].data.content
        this.permitTypes = response[2].data.content
        this.projectors = response[3].data.content
      }).finally(() => {
        this.$var('load', false)
      })
    },
    submit() {
      this.$var('load', true)
      const api = $n.reduce(this.files, (result, file) => {
        result.push({
          promise: $api.files.create(file),
          title: file.name.split('.').slice(0, -1).join('.'),
        })
        return result
      }, [])
      $n.promiseObjects(api).then((files) => {
        const classId = this.type.value === 'figure' ? this.selectedClass.id : (this.type.value === 'psd' ? this.psdType.id : this.permitType.id)
        const data = {
          projectId: this.project.id,
          partnerId: this.projector.id,
          classId,
          type: this.type.value,
          files: files.map((item) => ({ file: item.response.data.content.id, title: item.title, })),
        }
        if (this.type.value === 'figure') {
          data['code'] = this.$form.get('code')
        }
        if (this.$form.get('endedAt')) {
          data['endedAt'] = this.$form.get('endedAt')
        }
        $api.documents.createPsd(data).then((result) => {
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
