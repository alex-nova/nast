<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  html() {
    return {
      title: 'E-Qurylys',
      meta: [
        { mid: 'theme-color', name: 'theme-color', content: '#3e4095', },
      ],
    }
  },
}
</script>
