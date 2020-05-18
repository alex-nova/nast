<template>
  <div :class="[ 'component-field', {editable}, ]">
    <div @click="$var('edit', editable && true)">
      <div class="content">{{ value }}</div>
      <div class="tip">{{ tip }}</div>
    </div>
    <div>
      <modal-edit v-if="$var('edit')" :name="name" :project-id="projectId" :fields="fields" :values="values"
                  @submit="edit" @close="$var('edit', false)" />
    </div>
  </div>
</template>

<script>
import ModalEdit from './ModalEdit'

export default {
  name: 'CField',
  components: { ModalEdit, },
  props: {
    projectId: { type: Number, default: null, },
    fields: { type: Object, default: () => ({}), }, // [ name: { type: 'link', api: '', }, ]
    values: { type: Object, default: () => ({}), }, // { name: 'asdasd', name2: { id: 1, value: 'asdsad', }, }
    name: { type: [ String, Object, ], default: '', },
    editable: { type: Boolean, default: false, },
    tip: { type: String, default: '', },
  },
  computed: {
    field() {
      return this.fields[this.name] || {}
    },
    value() {
      const value = this.values[this.name]
      return this.field.type === 'link' && value ? value.value : value
    },
  },
  methods: {
    edit(value) {
      this.$emit('change', value)
    },
  },
}
</script>

<style lang="scss" scoped>
.component-field {
  display: inline-block;
  position: relative;
  min-width: 50px;
  line-height: 1;
  margin: 0 .2em;
  
  &.editable {
    cursor: pointer;
    /*background: rgba(127, 127, 127, .05);*/
    .content {
      border-bottom-color: var(--primary);
      border-bottom-style: dashed;
    }
    .tip {
     color: var(--primary);
      opacity: 1;
    }
  }
  
  .content {
    font-weight: bold;
    border-bottom: 1px solid rgba(127, 127, 127, .4);
    text-align: center;
    &:before { content: "\00a0 "; }
  }
  .tip {
    text-align: center;
    width: 100%;
    opacity: .4;
    line-height: 1;
    font-size: .7em;
    padding: 0 20px;
    margin-top: 1px;
    height: 0;
    white-space: nowrap;
    float: left;
  }
}
</style>
