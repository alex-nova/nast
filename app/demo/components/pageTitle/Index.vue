<template>
  <div class="component-page-title">
    <div class="content">
      <h1 slot="header">
        {{ page.title }}
      </h1>
      <n-breadcrumbs :items="breadcrumbs" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageTitle',
  props: {
    title: { type: String, default: '', },
  },
  computed: {
    breadcrumbs() {
      return $app.pages.breadcrumbs(this.$route.name)
    },
    page() {
      return $app.pages.get(this.$route.name)
    },
  },
}
</script>

<style lang="scss" scoped>
.component-page-title {
  margin: 0 0 30px;
  
  .content {
    
    h1 {
      margin: 0;
      padding: 25px var(--n-layout-content-padding);
    }
    .n-breadcrumbs {
      padding: 12px var(--n-layout-content-padding);
      background: #fff;
      border: solid #ececec;
      border-width: 1px 0;
    }
  }
}
</style>
