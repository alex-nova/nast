<template>
  <div class="layout-auth">
    <n-loader :loading="$store.state.app.loading" />
    <div class="sidebar">
      <div class="sidebar-content">
        <div class="logo"><img :src="logo" style="height: 34px" /></div>
        <div class="other">
          <!--          <n-select :data="langs" value="Русский" inline />-->
        </div>
        <div class="footer">
          iQurylys v1.1.7
          <br />
          ТОО «Direct Construction Service»
        </div>
      </div>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import names from './../names'
import logo from 'assets/images/logo.png'

export default {
  name: 'LayoutAuth',
  data: () => ({
    names: names(),
    logo,
    langs: [ 'Русский', 'Казахский', 'Английский', ],
  }),
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Ubuntu:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i');
  @import '~nast-ui/src/style/global';
  
  @include initialize((
    default: (
      colors: (
        primary: #3472e3,
        secondary: #ffd200,
        tertiary: #c556ff,
      ),
      
      typography: (
        header-font: 'Ubuntu, sans-serif',
        text-font: '400 1em Ubuntu, sans-serif',
        h1-font: '300 2em var(--header-font)',
        h3-font: '400 1.2em var(--header-font)',
        text-color: #444,
      ),
    
    ),
  ));


  .links {
    display: flex;
    flex-direction: row;
    & > * {
      display: inline-block;
      margin: 0 10px;
      opacity: .5;
      transition: opacity linear 100ms;
      &:hover {
        opacity: 1;
      }
    }
    & > *:first-child {
      margin-left: 0;
    }
  }
  
</style>

<style lang="scss" scoped>
  @import '~nast-ui/src/style/global';
  
  .layout-auth {
    display: flex;
    min-height: 100vh;
  
    &::v-deep .n-card {
      margin: 20px 0;
      .content main {
      }
    }
    
    .sidebar {
      background: #2a2a2a;
      width: 40%;
      height: 100vh;
      position: fixed;
      
      .sidebar-content {
        margin-top: 15vh;
        margin-bottom: 50px;
        text-align: right;
        padding-right: 50px;
        width: 100%;
        max-width: 350px;
        float: right;
        color: var(--text-color-op);
      }
      
      .logo {
        font-size: 2em;
        line-height: 1;
        font-weight: 600;
      }
  
      .other {
        height: 40px;
        --n-input-width: 150px;
      }
      .footer {
        border-top: 1px solid var(--border-color);
        padding: 10px 0 10px 10px;
        font-size: .9em;
        color: #999;
      }
    }
    .content {
      margin: 15vh 40px 0 40%;
      padding-left: 50px;
      padding-bottom: 100px;
      width: 60%;
    }
    
    @include media(null, md) {
      flex-direction: column;
      
      .sidebar {
        height: auto;
        position: static;
        width: 100%;
        .sidebar-content {
          margin: 50px 20px;
          text-align: left;
          float: none;
        }
      }
      .content {
        margin: 60px 0 80px 0;
        width: 100%;
        padding: 0 20px;
      }
    }
  }
</style>
