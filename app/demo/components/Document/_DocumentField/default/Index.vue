<template>
  <div :class="[ 'n-document-field', {'n-editable': editable}, ]" @click="s_click">
    <div class="n-content">{{ value }}</div>
    <div class="n-tip">{{ tip }}</div>
  </div>
</template>

<script>
import props from './../props'

export default {
  mixins: [ props, ],
  methods: {
    s_click(e) {
      if (this.editable) {
        this.$emit('click', e)
        this.click(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.n-document-field {
  display: inline-block;
  position: relative;
  min-width: 50px;
  line-height: 1;
  margin: 0 .2em;
  
  .n-content {
    font-style: italic;
    border-bottom: 1px solid rgba(127, 127, 127, .4);
    text-align: center;
    padding: 0 15px;
    &:before { content: "\00a0 "; }
    &:after { content: "\00a0 "; }
  }
  
  .n-tip {
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
  
  &.n-editable {
    cursor: pointer;
    /*background: rgba(127, 127, 127, .05);*/
    
    .n-content {
      border-bottom-color: var(--primary);
      border-bottom-style: dashed;
    }
    .n-tip {
      color: var(--primary);
      opacity: 1;
    }
  }
}
</style>
