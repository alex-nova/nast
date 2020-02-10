<template>
  <div class="page-company-admins">
    <n-card :loading="$var('loading')">
      <div class="tools">
        <n-button icon="plus" @click="$var('add', true)">Добавить администратора</n-button>
      </div>
      <n-table :data="admins" :columns="columns">
        <template #tools="{item}">
          <n-link :to="{name: 'user', params: {id: item.id}}"><n-button icon="pen" flat round /></n-link>
          <n-button v-if="admins.length > 1" icon="minus" flat round @click="remove(item)" />
        </template>
      </n-table>
    </n-card>
  
    <n-modal v-if="$var('add')" :loading="$var('loadingAdd')" @close="$var('add', false)">
      <n-select :data="users" option-title="fullName" selected-title="fullName" item-value="id" :value.sync="newAdmin" title="Пользователь" />
      <n-button style="margin-top: 15px" color="primary" wide @click="submit">Добавить администратора</n-button>
    </n-modal>
  </div>
</template>

<script>
export default {
  name: 'PageCompanyAdmins',
  data: () => ({
    users: [],
    admins: [],
    newAdmin: null,
    columns: [
      { title: 'ФИО', name: 'fullName', },
      { title: 'ИИН', name: 'iin', },
      { title: 'Должность', name: 'position', },
      { title: '', name: 'tools', align: 'center', width: '100px', },
    ],
  }),
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.$var('loading', true)
      $api.users.get().then((response) => {
        this.admins = $n.filter(response.data, [ 'isAdmin', true, ])
        this.users = $n.filter(response.data, [ 'isAdmin', false, ])
        this.$var('loading', false)
      })
    },
    submit() {
      this.$var('loadingAdd', true)
      this.$var('loading', true)
      setTimeout(() => {
        this.admins.push(this.newAdmin)
        this.users = $n.filter(this.users, (item) => item.id !== this.newAdmin.id)
        this.newAdmin = null
        this.$var('add', false)
        this.$var('loadingAdd', false)
        this.$var('loading', false)
      }, 400)
    },
    remove(user) {
      this.$var('loading', true)
      setTimeout(() => {
        this.users.push(user)
        this.admins = $n.filter(this.admins, (item) => item.id !== user.id)
        this.$var('loading', false)
      }, 400)
    },
  },
}
</script>

<style lang="scss" scoped>
.page-company-admins {
  .tools {
    margin: 10px 0;
    text-align: right;
  }
  
  .n-link {
    color: inherit;
  }
}
</style>
