<template>
  <div class="layout-main">
    <n-layout-cool :menu="navigation" :profile="profile">
      <template #logo><div class="logo">{{ names['logo'] }}</div></template>
      <template #logo-min><div class="logo">{{ names['logoMin'] }}</div></template>
      <template #avatar><img :src="avatar" /></template>
      <template #name>Осипов Владимир Николаевич{{ $app.auth.user() ? $app.auth.user().name : '' }}</template>
      <div slot="content">
        <page-title />
        <router-view />
      </div>
      <div slot="footer">
        {{ names['product'] }}
        <br />
        {{ names['company'] }}
        <br />
        <n-link to="#">Сообщить об ошибке</n-link>
      </div>
    </n-layout-cool>
    <cards />
  </div>
</template>

<script>
import avatar from './../../assets/images/avatar.png'
import PageTitle from './../../components/pageTitle/Index'
import names from './../names'
import Cards from './../../cards/Index'

export default {
  name: 'MainLayout',
  components: { Cards, PageTitle, },
  html() {
    return {
      title: this.names['product'],
    }
  },
  data: () => ({
    names: names(),
    avatar,
    menu: [
      { name: 'index', },
      { title: __('app.pages.company.group'), icon: 'building', children: [
        { name: 'company.info', },
        { name: 'company.staff', },
        { name: 'company.admins', },
      ], },
      { title: __('app.pages.projects.group'), icon: 'building', children: [
        { name: 'projects.list', },
      ], },
    ],
    profile: [
      { title: 'Профиль', icon: 'user', route: 'profile', },
      { title: 'Выход', icon: 'sign-out-alt', route: 'login', },
    ],
  }),
  computed: {
    navigation() {
      const reducer = (result, item) => {
        const isGroup = Boolean(item.children)
        const page = isGroup ? item : ($app.pages.get(item.name) || {})
    
        result.push({
          title: page.title,
          icon: page.icon,
          route: page.route,
          children: isGroup ? page.children.reduce(reducer, []) : undefined,
        })
    
        return result
      }
      
      return this.menu.reduce(reducer, [])
    },
  },
  watch: {
    '$store.state.auth.user'() {
      this.checkAuth()
    },
  },
  created() {
    this.checkAuth()
  },
  methods: {
    checkAuth() {
      if (!$app.auth.user()) {
        this.$router.push({ name: 'login', })
        return false
      }
      return true
    },
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Raleway|Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i');
@import '~nast-ui/src/style/global';

@include initialize((
  default: (
    colors: (
      primary: #3472e3,
      secondary: #ffd200,
      tertiary: #c556ff,
    ),
    
    typography: (
      header-font: 'Roboto, sans-serif',
      text-font: '400 1em Roboto, sans-serif',
      h1-font: '300 2em var(--header-font)',
      h3-font: '400 1.2em var(--header-font)',
      text-color: #444,
    ),
  
  ),
));

.layout-main {
  .logo {
    font-size: 1.6em;
    line-height: 1;
    padding: 10px 0;
    font-weight: 600;
    color: var(--text-color-op);
  }
  
  .container {
    padding: 10px;
  }
}
</style>
