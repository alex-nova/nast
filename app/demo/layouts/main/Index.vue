<template>
  <div class="layout-main">
    <n-layout-cool :menu="navigation">
      <template #logo><div class="logo">E-Qurylys</div></template>
      <template #logo-min><div class="logo">EQ</div></template>
      <template #avatar><img :src="avatar" /></template>
      <div slot="content">
        <page-title />
        <router-view />
      </div>
      <div slot="footer">
        E-Qurylys 1.0
        <br />
        © 2019 TOO "DCS инжиниринг"
        <br />
        <n-link to="#">
          Сообщить об ошибке
        </n-link>
      </div>
    </n-layout-cool>
  </div>
</template>

<script>
import avatar from './../../assets/images/avatar.png'
import PageTitle from './../../components/pageTitle/Index'

export default {
  name: 'MainLayout',
  components: { PageTitle, },
  html() {
    return {
      title: 'E-Qurylys',
    }
  },
  data: () => ({
    avatar,
  }),
  computed: {
    ...$n.mapGetters('pages', [ 'navigation', ]),
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Raleway|Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i');
@import '~nast-ui/src/style/global';

@include initialize((
  default: (
    colors: (
      primary: #00a0e3,
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
}
</style>
