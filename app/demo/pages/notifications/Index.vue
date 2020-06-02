<template>
  <div class="page-company-index">
    <n-card>
      <n-table :data="$d.get('companies')" :loading="$d.loading('companies')" :columns="columns">
        <template #type="{item}">
          <template v-if="item.type === 'project.invite.company'">
            Вашу компанию {{ item.company.title }} пригласили на проект {{ item.project.title }}.
            <n-button @click="resolveInvite(item, true)">Принять</n-button>
            <n-button @click="resolveInvite(item, false)">Отклонить</n-button>
          </template>
          <n-link :to="{ query: { modal: 'company', id: item.id, },}"><n-button icon="pen" flat round /></n-link>
        </template>
      </n-table>
    </n-card>
  </div>
</template>

<script>
export default {
  name: 'PageNotificationsIndex',
  data: () => ({
    types: {
      'project.invite.company': 'Вас пригласили на проект',
    },
    columns: [
      { name: 'type', title: 'Уведомление', },
    ],
  }),
  load(router) {
    return {
      companies: {
        api: $api.my.notifications(),
        tag: 'companies',
      },
    }
  },
  created() {
    this.$form.init({
      bin: '',
      name: '',
      position: '',
      description: '',
      address: '',
    })
    this.$form.rules({
      bin: [ 'required', ],
      name: [ 'required', ],
      position: [ 'required', ],
    })
  },
  methods: {
    resolveInvite(item, accepted) {
      $app.store.mutation('app.company', item.company)
      $api.projects.partners.acceptInvite(item.project.id, { accepted, }).then(() => {
        this.$router.push({ name: 'projects.list', })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .page-company-index {
  
  }
</style>
