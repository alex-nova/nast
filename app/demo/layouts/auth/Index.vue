<template>
  <div class="layout-auth">
    <n-loader :loading="$store.state.app.loading" />
    <div class="sidebar">
      <div class="sidebar-content">
        <div class="logo">E-Qurylys</div>
        <div class="other">
<!--          <n-select :data="langs" value="Русский" inline />-->
        </div>
        <div class="footer">
          E-Qurylys 1.0
          <br />
          © 2019 TOO "DCS инжиниринг"
        </div>
      </div>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutAuth',
  data: () => ({
    langs: [ 'Русский', 'Казахский', 'Английский', ],
  }),
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
      margin-top: 15vh;
      padding-left: 50px;
      padding-bottom: 100px;
      margin-left: 40%;
      width: 60%;
    }
  }
</style>
