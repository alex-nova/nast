<template>
  <div class="page-company-admins">
  
    <n-card :loading="$toggler.loading">
      <n-table :data="users" :columns="columns">
        <template #tools="{item}">
          <n-link :to="{name: 'user', params: {id: item.id}}"><n-button icon="pen" flat round /></n-link>
        </template>
      </n-table>
    </n-card>
    
  </div>
</template>

<script>
export default {
  name: 'PageCompanyAdmins',
  data: () => ({
    users: [],
    columns: [
      { title: 'ФИО', name: 'fullName', },
      { title: 'ИИН', name: 'iin', },
      { title: 'Должность', name: 'position', },
      { title: '', name: 'tools', align: 'center', width: '100px', },
    ],
  }),
  mounted() {
    this.$toggle('loading', true)
    $api.users.get().then((response) => {
      this.users = $n.filter(response.data, [ 'isAdmin', true, ])
      this.$toggle('loading', false)
    })
  },
}
</script>

<style lang="scss" scoped>
.page-company-admins {
  
  .n-link {
    color: inherit;
  }
}
</style>
