<template>
  <div class="c-act">
    <div class="document">
      <n-loader :loading="loading" />
      <div v-if="act" class="content">
        <h3 class="title">{{ act.title }}</h3>
        <p class="info">
          <span>г. Нур-Султан</span>
<!--          <span class="date">«_____» ______________ 20_____ г.</span>-->
          <span class="date" style="font-size: 1.2em">{{ $app.date.format(act.createdAt || $app.date.now()) }}</span>
        </p>
        <div :is="component" :project-id="projectId" :values="values" :fields="act.fields" :editable="editable" @change="change" />
      </div>
    </div>
  </div>
</template>

<script>
import parser from './parser'
import CField from './Field'

export default {
  name: 'CAct',
  components: { CField, },
  props: {
    projectId: { type: Number, required: true, },
    act: { type: Object, default: null, },
    values: { type: Object, default: () => ({}), },
    editable: { type: Boolean, default: false, },
    loading: { type: Boolean, default: false, },
  },
  data: () => ({
    content: '',
  }),
  computed: {
    component() {
      return parser(this.content)
    },
  },
  watch: {
    act(value) {
      this.init(value)
    },
  },
  created() {
    this.init(this.act)
  },
  methods: {
    init(act) {
      if (act) {
        const content = act.content.replace(/\(\*\*(?!\*\*\)).+\*\*\)/g, (str) => {
          str = str.substr(3, str.length - 6)
          const vars = str.split('**')
          if (vars[0] === 'var') {
            const name = vars[1]
            const tip = vars[2] || ''
            return `<c-field :editable="editable" tip="${tip}" name="${name}" :fields="fields" :values="values"
                      :projectId="projectId" @change="(v) => change('${name}', v)" />`
          } else if (vars[0] === 'signers') {
            const signers = []
            $n.each(act.signers, (item) => {
              signers.push(`${item.title} <c-field tip="Подпись" /><br />`)
            })
            return `<p>${signers.join('')}</p>`
          }
          return ''
        })
        this.content = `<div>${content}</div>`
      }
    },
    change(key, value) {
      this.$emit('update:values', {
        ...this.values,
        [key]: value,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .c-act {
    &::v-deep .document {
      position: relative;
      background: white;
      border: 1px solid #eee;
      box-shadow: 1px 1px 2px rgba(127, 127, 127, .5);
      padding: 30px 80px;
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
