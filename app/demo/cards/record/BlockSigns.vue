<template>
  <div class="block-signs" style="position: relative">
    <n-loader :loading="$var('loading')" />
    <n-card v-for="sign in signs" :key="sign.name">
      <n-items>
        <div class="title">
          <template v-if="sign.signer">
            {{ sign.signer.role }}, {{ sign.signer.user.fullName }}
          </template>
          <template v-else>
            {{ sign.title }}
          </template>
        </div>
        <n-form-item title="Статус" active inline>
          <div v-if="sign.value === false" class="error">Найдены нарушения</div>
          <div v-else-if="sign.value === true" class="success">Подписано</div>
          <div v-else class="default">Ожидает</div>
        </n-form-item>
        <template v-if="sign.value === false">
          <n-input title="Выявленные отступления от проектно-сметной документации" :value="sign.message.problem" text />
          <n-input title="Указания об устранении выявленных отступлений или нарушений и сроки их выполнения" :value="sign.message.solution" text />
          <n-form-item v-if="sign.message.files" title="Фото/видео материалы" active>
            <div v-for="file in sign.message.files" :key="file" class="images">
              <n-link :to="file" type="external" target="_blank">Посмотреть</n-link>
            </div>
          </n-form-item>
        </template>
      </n-items>
      <div v-if="sign.value === null" style="float: right">
        <n-button @click="$var('sign', sign)">Ответить</n-button>
      </div>
      <div v-if="sign.value === false" style="float: right;position:relative;z-index:10;">
        <n-link :to="{name: 'records.create', params: {projectId:$store.state.app.project.id,journal: 'main'}, }"><n-button>Создать запись об устранении</n-button></n-link>
      </div>
      <div v-if="sign.date" class="info">{{ $app.date.format(sign.date) }}</div>
    </n-card>
    
    <modal-sign v-if="$var('sign')" :signer="$var('sign')" :project-id="projectId" :journal-id="journalId" :record-id="recordId"
                @submit="() => load()" @close="$var('sign', false)" />
  </div>
</template>

<script>
import ModalSign from './modals/ModalSign'

export default {
  name: 'BlockSigns',
  components: { ModalSign, },
  props: [ 'projectId', 'journalId', 'recordId', ],
  data() {
    return {
      signs: [],
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.$var('loading', true)
      const api = [
        $api.journals.records.getSigns(this.projectId, this.journalId, this.recordId),
        $api.auth.info($app.store.state('app.company').id, this.projectId),
      ]
      Promise.all(api).then((responses) => {
        const me = responses[1].data.content
        this.signs = responses[0].data.content.reduce((result, item) => {
          if (item.name === 'pj_approver' ||
            (item.name === 'author' && me?.participant?.role === 'Авторский надзор') ||
            (item.name === 'tech' && me?.participant?.role === 'Технический надзор')) {
            result.push(item)
          }
          return result
        }, [])
      }).finally(() => {
        this.$var('loading', false)
      })
    },
    submitSign(signerType, value) {
      this.$var('loading', true)
      const data = {
        signerType,
        isAccept: value,
      }
      $api.journals.records.sign(this.projectId, this.journalId, this.recordId, data).then(() => {
        this.load()
      }).finally(() => {
        this.$var('loading', false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.block-signs {
  .title {
    width: 100%;
  }
  
  &::v-deep .n-card {
    margin: 0 0 15px;
  }
  
  .error {
    color: var(--danger);
  }
  .success {
    color: var(--success);
  }
  div.default {
    color: var(--gray-5);
  }
  
  .info {
    margin-top: 10px;
    font-size: .8em;
    opacity: .9;
  }
}
</style>
