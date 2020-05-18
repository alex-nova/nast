<template>
  <n-modal class="modal-edit-act" @close="$emit('close')">
    <n-divide v-if="act">
      <div style="width: 100%">
        <n-input title="Статус" :value="statuses[act.status]" text />
      </div>
      <n-items style="text-align: right">
        <n-button v-if="act.isDraft" @click="submit($event, true)">Сохранить и отправить на согласование</n-button>
        <n-button v-if="act.isDraft" @click="submit">Сохранить</n-button>
        <n-button v-if="act.status === 'waiting'" color="danger" icon="trash" flat round @click="remove" />
      </n-items>
    </n-divide>
  
    <template v-if="act">
      <n-card v-for="sign in act.signers" :key="sign.name" :loading="$var('load')" class="block-sign">
        <n-items>
          <div class="title">
            {{ sign.title }}
            <template v-if="sign.author">: {{ sign.author }}</template>
          </div>
          <n-form-item title="Статус" active inline>
            <div v-if="sign.isApproved === false" class="error">Отклонено</div>
            <div v-else-if="sign.isApproved === true" class="success">Подписано</div>
            <div v-else class="default">Ожидает</div>
          </n-form-item>
          <template v-if="sign.isApproved === false">
            <n-input title="Пояснения" :value="sign.message.problem" text />
            <n-form-item v-if="sign.message.files" title="Фото/видео материалы" active>
              <div v-for="file in sign.message.files" :key="file" class="images">
                <n-link :to="file" type="external" target="_blank">Посмотреть</n-link>
              </div>
            </n-form-item>
          </template>
        </n-items>
        <div v-if="sign.isApproved === null" style="float: right">
          <n-button @click="$var('sign', sign)">Подписать</n-button>
        </div>
        <div v-if="sign.signAt" class="info">{{ $app.date.format(sign.signAt) }}</div>
      </n-card>
  
      <modal-sign v-if="$var('sign')" :signer="$var('sign')" :project-id="project.id" :act-id="actId"
                  @submit="sign" @close="$var('sign', false)" />
    </template>
    
    <c-act :project-id="project.id" :act="act" :values.sync="values" :editable="act && act.isDraft" :loading="$var('load')" />
    
    <n-divide v-if="act">
      <div style="width: 100%">
      </div>
      <n-items style="text-align: right">
        <n-button v-if="act.isDraft" @click="submit($event, true)">Сохранить и отправить на согласование</n-button>
        <n-button v-if="act.isDraft" @click="submit">Сохранить</n-button>
      </n-items>
    </n-divide>
  </n-modal>
</template>

<script>
import CAct from 'components/act/Index'
import ModalSign from './ModalSign'

export default {
  name: 'ModalEditAct',
  components: { ModalSign, CAct, },
  props: [ 'project', 'actId', 'statuses', ],
  data: () => ({
    act: null,
    values: {},
    signs: [],
  }),
  created() {
    this.load()
  },
  methods: {
    load() {
      this.$var('load', true)
      $api.acts.get(this.project.id, this.actId).then((response) => {
        this.act = response.data.content
        this.values = this.act.values
      }).finally(() => {
        this.$var('load', false)
      })
    },
    submit(event, publish = undefined) {
      this.$var('load', true)
      $api.acts.edit(this.project.id, this.actId, { values: this.values, publish, }).then((response) => {
        this.$emit('submit', response.data.content)
        this.act = response.data.content
      }).finally(() => {
        this.$var('load', false)
      })
    },
    sign() {
      this.load()
      this.$emit('submit')
    },
    remove() {
      this.$var('load', true)
      $api.acts.delete(this.project.id, this.actId).then((response) => {
        this.$emit('submit')
        this.$emit('close')
      }).finally(() => {
        this.$var('load', false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .modal-edit-act {
    .c-act {
      margin: 30px 0 20px;
    }
    &::v-deep > .n-wrapper {
      width: 1100px;
      left: calc(50% - 550px);
    }
  
    .block-sign {
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
  }
</style>
