<template>
  <div class="card-user">
    <n-modal-card :tabs="tabs" name="user" :loading="$var('loading')">
      <template #header>Карточка пользователя</template>
      <template #body>
        <n-divide class="body">
          <n-items class="content">
            <n-image class="avatar" mock alt="avatar" round />
            <div>
              <div>{{ model.name }}</div>
            </div>
          </n-items>
        </n-divide>
      </template>
      <template #tab.info>
        <n-items>
          <n-input title="ИИН" v-bind="$form.input('iin')" text />
          <n-input title="Имя" v-bind="$form.input('fullName')" />
          <n-input title="Телефон" v-bind="$form.input('phone')" />
          <n-input title="Email" v-bind="$form.input('email')" />
          <n-input title="Должность" v-bind="$form.input('worker.position')" />
        </n-items>
      </template>
      <template #tab.docs>
        <tab-documents :model-id="modelId" />
      </template>
      <template #footer="{tab}">
        <n-divide>
          <n-button @click="() => $router.back()">Закрыть</n-button>
          <n-items v-if="tab.callback" inline>
            <n-button v-if="!$form.editable() && tab.name === 'info'" color="primary" @click="$form.edit()">Редактировать</n-button>
            <n-button v-if="$form.editable()" color="success" @click="tab.callback">Сохранить</n-button>
            <n-button v-if="$form.editable()" @click="$form.cancel()">Отмена</n-button>
          </n-items>
        </n-divide>
      </template>
    </n-modal-card>
  </div>
</template>

<script>
import TabDocuments from './Documents'
export default {
  name: 'CardUser',
  components: { TabDocuments, },
  data() {
    return {
      model: {},
      tabs: [
        { name: 'info', title: 'Информация', callback: this.save, },
        // { name: 'docs', title: 'Документы', },
        // { name: 'roles', title: 'Компании', },
        // { name: 'roles', title: 'Проекты', },
      ],
    }
  },
  computed: {
    modelId() {
      return this.$route.query.id
    },
  },
  watch: {
    '$route.query.id'() {
      if (this.$route.query.modal === 'user') {
        this.load()
      }
    },
  },
  created() {
    if (this.$route.query.modal === 'user') {
      this.load()
    }
  },
  methods: {
    load() {
      this.$var('loading', true)
      $api.users.get(this.modelId).then((response) => {
        this.model = response.data.content
        this.$form.init(this.model, false)
      }).finally(() => {
        this.$var('loading', false)
      })
    },
    save() {
      if (this.$form.check()) {
        this.$var('loading', true)
        $api.users.edit(this.modelId, this.$form.get()).then((response) => {
          this.model = response.data.content
          this.$form.init(this.model, false)
        }).finally(() => {
          this.$var('loading', false)
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.card-user {

}
</style>
