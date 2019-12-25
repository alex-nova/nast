<template>
  <div class="page-company-admins">
    <n-card :loading="$toggler.loading">
      <div class="tools">
        <n-button icon="plus" @click="$toggle('add', true)">Добавить администратора</n-button>
      </div>
      <n-table :data="admins" :columns="columns">
        <template #tools="{item}">
          <n-link :to="{name: 'user', params: {id: item.id}}"><n-button icon="pen" flat round /></n-link>
          <n-button v-if="admins.length > 1" icon="minus" flat round @click="remove(item)" />
        </template>
      </n-table>
    </n-card>
  
    <n-modal v-if="$toggler.add" :loading="$toggler.loadingAdd" @close="$toggle('add', false)">
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
      this.$toggle('loading', true)
      $api.users.get().then((response) => {
        this.admins = $n.filter(response.data, [ 'isAdmin', true, ])
        this.users = $n.filter(response.data, [ 'isAdmin', false, ])
        this.$toggle('loading', false)
      })
    },
    submit() {
      this.$toggle('loadingAdd', true)
      this.$toggle('loading', true)
      setTimeout(() => {
        this.admins.push(this.newAdmin)
        this.users = $n.filter(this.users, (item) => item.id !== this.newAdmin.id)
        this.newAdmin = null
        this.$toggle('add', false)
        this.$toggle('loadingAdd', false)
        this.$toggle('loading', false)
      }, 400)
    },
    remove(user) {
      this.$toggle('loading', true)
      setTimeout(() => {
        this.users.push(user)
        this.admins = $n.filter(this.admins, (item) => item.id !== user.id)
        this.$toggle('loading', false)
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
