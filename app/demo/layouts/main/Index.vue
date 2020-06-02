<template>
  <div class="layout-main">
    <n-layout-cool :menu="navigation" :profile="profile" :companies="$d.get('companies')" :select-company="selectCompany">
      <template #logo>{{ names['logo'] }}</template>
      <template #logo-min>{{ names['logoMin'] }}</template>
      <template #avatar><img :src="avatar" /></template>
      <template #name>{{ $app.auth.user() ? $app.auth.user().fullName : '' }}</template>
      <template #company-name>{{ company.title }}</template>
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
    show: false,
    names: names(),
    avatar,
    profile: [
      { title: 'Профиль', icon: 'user', route: 'profile', },
      { title: 'Выход', icon: 'sign-out-alt', route: 'login', },
    ],
  }),
  load() {
    return {
      companies: {
        api: $api.my.companies(),
        def: [],
        tag: 'company',
        callback: (data) => {
          if ($n.size(data)) {
            const current = $app.store.getter('app.company')
            let next = null
            if (current) {
              next = $n.find(data, [ 'id', current.id, ]) || data[0]
            } else {
              next = data[0]
            }
            $app.store.mutation('app.company', next)
          }
        },
      },
    }
  },
  computed: {
    company() {
      return $app.store.getter('app.company')
    },
    navigation() {
      return $app.router.navigation($config('router.navigation')())
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
    selectCompany(company) {
      $app.store.mutation('app.company', company)
      this.$router.go()
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
  
  .sub {
    font-size: .9em;
    opacity: .9;
  }
  
  .table-tools {
    margin-bottom: 10px;
  }
</style>
