<template>
  <div class="n-document-sign">
    <div v-if="sign" class="n-sign-wrapper">
      <div v-if="!!qrData" class="qr">
        <a :href="sign.checkUrl" target="_blank">
          <img width="82" height="82" :src="qrData" alt="sign" />
        </a>
      </div>
      <div class="sign-content">
        <div class="sign-tip"><n-icon icon="signature" /> <span>Цифровая подпись</span></div>
        <div class="status">
          <span :class="status.type">{{ status.title }}</span>
        </div>
        <div class="name">{{ title }}</div>
        <div class="date">{{ $app.date.format(sign.signedAt, 'datetime') }}</div>
        <div v-if="authorId === sign.authorId && sign.isApproved === null" class="button">
          <n-button icon="key" @click="s_doSign">Подписать</n-button>
        </div>
        <div v-if="sign.isApproved === false" class="answer">
          <div v-if="sign.answer.problem" class="problem">
            <span class="field-title">Причина:</span> {{ sign.answer.problem }}
          </div>
          <div v-if="sign.answer.files" class="files">
            <span class="field-title">Файлы:</span>
            <div v-for="url in sign.answer.files" :key="url">
              <a :href="url" target="_blank">Посмотреть</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <n-document-field value="" tip="Подпись" :editable="false" />
  </div>
</template>

<script>
import { createQR, } from '../../utils'
import props from './../props'
import NDocumentField from './../../_DocumentField/default/Index'

export default {
  components: { NDocumentField, },
  mixins: [ props, ],
  computed: {
    qrData() {
      return this.sign.isApproved !== null ? createQR(this.sign.checkUrl, 4, 'L') : ''
    },
    status() {
      let type = 'default'
      let title = 'Выслано уведомление'
      if (this.sign.isApproved !== null) {
        type = this.sign.isApproved ? 'success' : 'danger'
        title = this.sign.isApproved ? 'Подписано' : 'Отклонено'
      }
      return { type, title, }
    },
  },
  methods: {
    s_doSign() {
      this.$emit('doSign', this.sign)
      this.doSign(this.sign)
    },
  },
}
</script>

<style lang="scss" scoped>
.n-document-sign {
  .n-sign-wrapper {
    margin: 10px 0 15px;
    padding: 10px;
    display: inline-flex;
    width: 100%;
    flex-direction: row;
    border: 1px solid #eee;
    border-radius: 4px;
  }
  
  .qr {
    display: flex;
    margin: -8px;
    padding-right: 10px;
    a { display: inherit; }
  }
  .sign-content {
    line-height: 1.5;
    width: 100%;
    
    .status {
      .success { color: var(--success); }
      .danger { color: var(--danger); }
      .default { color: var(--gray-5); }
    }
    .sign-tip {
      float: right;
      font-size: .9em;
      opacity: .5;
      span {
        margin-left: 5px;
        font-style: italic;
      }
    }
    .name {
      margin: 3px 0;
    }
    .date {
      opacity: .9;
      font-size: .8em;
      margin-bottom: 3px;
    }
    .answer {
      margin-top: 10px;
    }
  }
  
  .field-title {
    display: block;
    opacity: .9;
    font-size: .8em;
    margin: 5px 0 0;
  }
}
</style>
