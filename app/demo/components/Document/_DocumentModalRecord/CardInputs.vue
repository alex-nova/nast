<template>
  <div :class="[ 'n-card-inputs', ]">
    <div v-for="(field, name) in fields" :key="name">
      <template v-if="field.type === 'field'">
        <n-input :title="titles[`${tableName}.${name}`]" :name="name" :value="values[name].value" :text="!editable"
                 @input="(v) => change(name, v)" />
      </template>
      <template v-else-if="field.type === 'group'">
        <n-form-item :title="titles[`${tableName}.${name}`]">
          <div class="n-group">
            <n-card-inputs :table-name="`${tableName}.${name}`" :values="values" :fields="field.fields" :titles="titles" :editable="editable"
                           @update:values="(v) => $emit('update:values', v)" />
          </div>
        </n-form-item>
      </template>
    </div>
  </div>
</template>

<script>
import set from 'lodash/set'

export default {
  name: 'NCardInputs',
  props: {
    tableName: { type: String, required: true, },
    values: { type: Object, required: true, },
    fields: { type: Object, required: true, },
    titles: { type: Object, required: true, },
    editable: { type: Boolean, default: false, },
  },
  methods: {
    change(name, value) {
      set(this.values, name, { value, })
      this.$emit('update:values', this.values)
    },
  },
}
</script>

<style lang="scss" scoped>
  .n-card-inputs {
    margin: 30px 0;
    &>* {
      margin: 10px 0;
    }
    
    .n-group {
      padding-left: 20px;
      .n-card-inputs {
        margin: 0 0 20px;
        &>*:first-child {
          margin-top: 5px;
        }
      }
    }
  }
</style>
