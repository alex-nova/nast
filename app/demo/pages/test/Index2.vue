<template>
  <div class="page">
    <div class="document">
      <div v-if="act" class="content">
        <h3 class="title">{{ act.title }}</h3>
        <p class="info">
          <span>&nbsp;</span>
          <span class="date">«_____» ______________ 20_____ г.</span>
        </p>
        <div :is="component" :values="values" :editable="editable" />
      </div>
    </div>
  </div>
</template>

<script>
import CField from './Field'

export default {
  name: 'Index',
  components: { CField, },
  data: () => ({
    act: null,
    values: {},
    content: '',
    editable: true,
  }),
  computed: {
    component() {
      return {
        template: this.content,
        components: { CField, },
        props: [ 'editable', 'values', ],
      }
    },
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      $api.acts.get(1, 1).then((response) => {
        this.act = response.data.content
        this.content = this.act.content.replace(/\(\*\*(?!\*\*\)).+\*\*\)/g, (str) => {
          str = str.substr(3, str.length - 6)
          const vars = str.split('**')
          if (vars[0] === 'var') {
            const name = vars[1]
            const tip = vars[2] || ''
            return `<c-field :editable="editable" tip="${tip}" :value.sync="values.${name}"></c-field>`
          }
          return ''
        })
        this.content = `<div>${this.content}</div>`
        this.values = this.act.values
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .page {
    &::v-deep .document {
      background: white;
      border: 1px solid #eee;
      box-shadow: 1px 1px 2px rgba(127, 127, 127, .5);
      margin: 30px;
      padding: 30px 100px;
      font-size: .8em;
    
      .info {
        span.date {
          float: right;
        }
      }
      h3.title {
        font-weight: bold;
        width: 100%;
        text-align: center;
        margin: 40px 0 30px;
      }
      p {
        line-height: 2.2;
        margin: 20px 0;
      }
    
    }
  }
</style>
