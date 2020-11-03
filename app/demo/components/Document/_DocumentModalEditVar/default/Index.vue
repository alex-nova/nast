<template>
  <n-modal class="n-document-modal-edit-var" :loading="$var('load')" @close="() => $emit('close')">
    <h3>Редактировать</h3>
    <n-form @submit="submit">
      <n-items>
        <n-select v-if="select" title="Выбор из системных данных (необязательно)" :data="data" :value.sync="selected" item-value="name" />
        <template v-if="input">
          <n-input v-if="component === 'input'" title="Итоговое значение" v-bind="$form.input('value')" />
          <n-form-item v-else-if="component === 'textarea'" title="Итоговое значение" active>
            <textarea :value="$form.get('value')" style="width: 100%; height: 100px;" @change="(e) => $form.set('value', e.target.value)" />
          </n-form-item>
        </template>
      </n-items>
      <n-divide style="margin-top: 20px">
        <div><n-button v-if="field.type === 'link'" @click="erase">Очистить</n-button></div>
        <div><n-button color="primary" type="submit">Сохранить</n-button></div>
      </n-divide>
    </n-form>
  </n-modal>
</template>

<script>
import props from './../props'

export default {
  mixins: [ props, ],
  data: () => ({
    data: [],
    selected: null,
  }),
  computed: {
    types() {
      return this.settings.types
    },
    select() {
      if (!this.field.data) {
        return false
      }
      return $n.get(this.types, `${this.apiType}.select`, this.types.default.select)
    },
    input() {
      return this.field.disabled !== true
    },
    field() {
      return this.fields[this.name]
    },
    api() {
      const getUrl = $n.get(this.types, `${this.apiType}.url`, this.types.default.url)
      return getUrl(this.field, this.values, this.apiParams)
    },
    apiParams() {
      return this.field.data ? this.field.data.split(',') : ''
    },
    apiType() {
      return this.field.data ? this.field.data.split(',')[0] : ''
    },
    component() {
      if (this.api) {
        return $n.get(this.types, `${this.apiType}.component`, this.types.default.component)
      } else {
        return 'input'
      }
    },
  },
  watch: {
    selected(value) {
      const getValue = $n.get(this.types, `${this.apiType}.value`, this.types.default.value)
      this.$form.set('value', getValue(this.selected))
    },
  },
  created() {
    const value = this.values[this.name]
    if (this.field.type === 'link') {
      this.$form.init({ value: value ? value.value : '', })
    } else {
      this.$form.init({ value, })
    }
    if (this.api) {
      this.load()
    }
  },
  methods: {
    load() {
      this.$var('load', true)
      $api.edms.documents.data.get(this.document.id, this.api).then((response) => {
        if (this.select) {
          this.data = response.data.content
        } else if (!this.$form.get('value')) {
          this.$form.set('value', response.data.content)
        }
      }).finally(() => {
        this.$var('load', false)
      })
    },
    submit() {
      const value = this.$form.get('value')
      const data = this.field.type === 'link' ? { id: this.selected.name, value, } : { value, }
      this.$emit('submit', this.name, data)
      this.$emit('close')
    },
    erase() {
      this.$emit('submit', this.name, {})
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
  .n-document-modal-edit-var {
    font-size: 1rem;
  }
</style>
