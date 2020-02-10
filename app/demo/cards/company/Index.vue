<template>
  <div class="card-company">
    <n-modal-card :tabs="tabs" name="company" :loading="$var('loading')">
      <template #header>Карточка компании</template>
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
        <n-items vertical>
          <n-input title="БИН" v-bind="$form.input('bin')" text />
          <n-input title="Название" v-bind="$form.input('name')" />
          <n-input title="Описание" v-bind="$form.input('description')" />
          <n-input title="Адрес" v-bind="$form.input('address')" />
        </n-items>
      </template>
      <template #tab.staff>
        <TabStaff />
      </template>
      <template #tab.admins>
        <TabAdmins />
      </template>
      <template #footer="{tab}">
        <n-divide>
          <n-button @click="() => $router.push({query: {}})">Закрыть</n-button>
          <n-items v-if="tab.callback" inline>
            <n-button v-if="!$form.editable() && tab.name === 'info'" color="primary" @click="$form.edit()">Редактировать</n-button>
            <n-button v-if="$form.editable()" @click="$form.cancel()">Отмена</n-button>
            <n-button v-if="$form.editable()" color="success" @click="tab.callback">Сохранить</n-button>
          </n-items>
        </n-divide>
      </template>
    </n-modal-card>
  </div>
</template>

<script>
import TabStaff from './Workers'
import TabAdmins from './Admins'

export default {
  name: 'CardCompany',
  components: { TabAdmins, TabStaff, },
  data() {
    return {
      tabs: [
        { name: 'info', title: 'Информация', callback: this.save, },
        { name: 'staff', title: 'Сотрудники', },
        { name: 'admins', title: 'Администраторы', },
      ],
      model: {},
    }
  },
  watch: {
    '$route.query.id'() {
      this.load()
    },
  },
  created() {
    if (this.$route.query.modal === 'company') {
      this.load()
    }
  },
  methods: {
    load() {
      this.$var('loading', true)
      $api.companies.get(this.$route.query.id).then((response) => {
        this.model = response.data.content
        this.$form.init(this.model, false)
        this.$var('loading', false)
      })
    },
    save() {
      if (this.$form.check()) {
        this.$var('loading', true)
        $api.companies.edit(this.$route.query.id, this.$form.get()).then((response) => {
          this.model = response.data.content
          this.$form.init(this.model, false)
          this.$var('loading', false)
          this.$d.reloadTag('companies')
        }).catch(() => {
          this.$var('loading', false)
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.card-company {
  .body {
    .content {
      --n-items-margin: 10px;
    }
    
    & > .n-items > * {
      vertical-align: middle;
    }
    
    .avatar {
      width: 80px;
      height: 80px;
      --n-image-border: 3px solid #fff;
    }
  }

}
</style>
