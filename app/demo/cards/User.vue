<template>
  <div class="card-user">
    <n-modal-card :tabs="tabs" name="user">
      <template #header>Карточка человека</template>
      <template #body>body</template>
      <template #tab.index>
        <div class="items">
          <n-input title="Имя" v-bind="$form.input('name')" />
          <n-input title="Фамилия" v-bind="$form.input('lastname')" />
          <n-input title="Телефон" v-bind="$form.input('phone')" />
          <n-input title="Адрес" v-bind="$form.input('address')" />
        </div>
      </template>
      <template #tab.roles>
        roles
      </template>
      <template #footer>
        <n-button>Закрыть</n-button>
        <n-button v-if="!$form.editable()" color="primary" @click="$form.edit()">Редактировать</n-button>
        <n-button v-if="$form.editable()" color="success" @click="$form.edit()">Сохранить</n-button>
        <n-button v-if="$form.editable()" @click="$form.cancel()">Отмена</n-button>
      </template>
    </n-modal-card>
  </div>
</template>

<script>
export default {
  name: 'CardUser',
  data: () => ({
    tabs: [
      { name: 'index', title: 'Основная информация', },
      { name: 'roles', title: 'Роли', },
    ],
  }),
  created() {
    this.$form.init({
      name: 'Алексей',
      lastname: 'Красилов',
      phone: '+7 (707) 807-13-12',
      address: 'Бухар Жирау 88б, 103',
    }, false)
  },
}
</script>

<style lang="scss" scoped>
.card-user {

}
</style>
