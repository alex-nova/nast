<template>
  <div class="tab-participants">
    <div class="wrapper">
      <div class="menu">
        <n-tabs :data="tabs" name="menu" state />
      </div>
      <div class="content">
        <n-tabs-content name="menu">
          <template #partners>
            <tab-partners :key="1" :project="project" :my="false" />
          </template>
          <template #participants>
            <tab-peoples :key="1" :project="project" :my="false" />
          </template>
          <template #delegations>
            <tab-partners :key="2" :project="project" :my="true" />
          </template>
          <template #workers>
            <tab-peoples :key="2" :project="project" :my="true" />
          </template>
        </n-tabs-content>
      </div>
    </div>
  </div>
</template>

<script>
import TabPartners from './tabs/partners/Index'
import TabPeoples from './tabs/peoples/Index'

export default {
  name: 'TabParticipants',
  components: { TabPartners, TabPeoples, },
  props: [ 'project', ],
  data() {
    return {
      tabs: [
        { name: 'partners', title: 'Компании', },
        { name: 'participants', title: 'Пользователи', },
        { name: 'delegations', title: 'Подрядчики моей компании', },
        { name: 'workers', title: 'Сотрудники моей компании', },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
  .tab-participants {
  }
</style>
