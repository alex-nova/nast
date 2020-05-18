<template>
  <n-modal class="modal-edit" :loading="$var('load')" @close="() => $emit('close')">
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
        <n-button color="primary" wide type="submit">Сохранить</n-button>
      </n-items>
    </n-form>
  </n-modal>
</template>

<script>
import types from './types'

export default {
  name: 'ModalEdit',
  props: [ 'projectId', 'name', 'fields', 'values', ],
  data: () => ({
    data: [],
    selected: null,
  }),
  computed: {
    select() {
      if (!this.field.api) {
        return false
      }
      return $n.get(types, `${this.apiType}.select`, types.default.select)
    },
    input() {
      return this.field.disabled !== true
    },
    field() {
      return this.fields[this.name]
    },
    api() {
      const getUrl = $n.get(types, `${this.apiType}.url`, types.default.url)
      return getUrl(this.field, this.values, this.apiParams)
    },
    apiParams() {
      return this.field.api ? this.field.api.split(',') : ''
    },
    apiType() {
      return this.field.api ? this.field.api.split(',')[0] : ''
    },
    component() {
      if (this.api) {
        return $n.get(types, `${this.apiType}.component`, types.default.component)
      } else {
        return 'input'
      }
    },
  },
  watch: {
    selected(value) {
      const getValue = $n.get(types, `${this.apiType}.value`, types.default.value)
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
      $api.data.get(this.projectId, this.api).then((response) => {
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
      const data = this.field.type === 'link' ? { id: this.selected.name, value, } : value
      this.$emit('submit', data)
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
  .modal-edit {
    font-size: 1rem;
  }
</style>
