<template>
  <div class="tab-info">
    <n-divide class="tools" style="margin-bottom: 10px;">
      <div></div>
      <div><n-button @click="$var('add', true)">Добавить администратора</n-button></div>
    </n-divide>
    <n-table :data="admins" :columns="columns" :loading="$var('loading')">
      <template #tools="{item}">
        <n-link :to="{ query: { modal: 'user', id: item.id, },}"><n-button icon="pen" flat round /></n-link>
        <n-button v-if="admins.length > 1" icon="minus" flat round @click="remove(item)" />
      </template>
    </n-table>
  
    <n-modal v-if="$var('add')" :loading="$var('loadingAdd')" @close="$var('add', false)">
      <n-select :data="users" option-title="fullName" selected-title="fullName" item-value="id" :value.sync="newAdmin" title="Пользователь" />
      <n-button style="margin-top: 15px" color="primary" wide @click="submit">Добавить администратора</n-button>
    </n-modal>
  </div>
</template>

<script>
export default {
  name: 'TabAdmins',
  data() {
    return {
      users: [],
      newAdmin: null,
      admins: [],
      columns: [
        { title: 'ФИО', name: 'fullName', },
        { title: 'ИИН', name: 'iin', },
        { title: 'E-mail', name: 'email', },
        { title: 'Телефон', name: 'phone', },
        { title: 'Должность', name: 'position', },
        { title: '', name: 'tools', align: 'center', width: '100px', },
      ],
    }
  },
  created() {
    this.$form.init({
      iin: '',
      email: '',
      position: '',
    })
    this.$form.rules({
      iin: [ 'required', ],
      email: [ 'required', ],
      position: [ 'required', ],
    })
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.$var('loading', true)
      $api.companies.admins.get(this.$route.query.id).then((response) => {
        this.admins = response.data.content
        this.$var('loading', false)
      })
      $api.companies.workers.getSimple(this.$route.query.id).then((response) => {
        this.users = response.data.content
      })
    },
    submit() {
      this.$var('loadingAdd', true)
      $api.companies.admins.add(this.$route.query.id, this.newAdmin.id).then(() => {
        this.load()
        this.$var('add', false)
        this.$var('loadingAdd', false)
      })
    },
    remove(user) {
      this.$var('loading', true)
      $api.companies.admins.remove(this.$route.query.id, user.id).then(() => {
        this.load()
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .tab-info {
    font-size: .9em;
  }
</style>
