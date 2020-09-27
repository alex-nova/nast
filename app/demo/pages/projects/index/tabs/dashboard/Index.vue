<template>
  <div class="tab-dashboard">
    <div class="wrapper">
      <div class="menu">
        <n-tabs :data="tabs" name="menu" state />
      </div>
      <div class="content">
        <n-tabs-content name="menu">
          <template #gpr>
            <tab-gpr :project="project" />
          </template>
        </n-tabs-content>
      </div>
    </div>
  </div>
</template>

<script>
import TabGpr from './tabs/gpr/Index'

export default {
  name: 'TabDashboard',
  components: { TabGpr, },
  props: [ 'project', ],
  data() {
    return {
      tabs: [
        { name: 'gpr', title: 'График производственных работ', },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
  .tab-dashboard {
  
  }
</style>
