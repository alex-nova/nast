<template>
  <div class="page-company-index">
    <n-card>
      <n-table :data="$d.get('notifications')" :loading="$d.loading('notifications')" :columns="columns">
        <template #notification="{item}">
          {{ item.title }}
        </template>
        <template #tools="{item}">
          <template v-if="item.type === 'project.invite.company'">
            <n-button @click="resolveInvite(item, true)">Принять</n-button>
            <n-button @click="resolveInvite(item, false)">Отклонить</n-button>
          </template>
          <template v-else>
            <n-button icon="pen" flat round @click="types[item.type](item)" />
          </template>
        </template>
      </n-table>
    </n-card>
  </div>
</template>

<script>
export default {
  name: 'PageNotificationsIndex',
  data() {
    return {
      types: {
        'project.invite.company': this.resolveInvite,
        'document.sign': this.documentSign,
      },
      columns: [
        { name: 'notification', title: 'Уведомление', },
        { name: 'tools', title: '', },
      ],
    }
  },
  watch: {
    '$route.query'() {
      this.$d.reload('notifications')
    },
  },
  load(router) {
    return {
      notifications: {
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
      $api.iq.partners.acceptInvite(item.projectId, { accepted, }).then(() => {
        this.$router.push({ name: 'projects.index', params: { projectId: item.projectId, }, })
      })
    },
    documentSign(item) {
      this.$router.push({ query: { ...this.$route.query, document: item.modelId, }, })
    },
  },
}
</script>

<style lang="scss" scoped>
  .page-company-index {
  
  }
</style>
