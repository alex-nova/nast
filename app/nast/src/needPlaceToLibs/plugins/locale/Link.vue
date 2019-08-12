<template>
  <nest-link
    v-bind="props"
    :route="s_route"
    v-on="events"
  >
    <slot />
  </nest-link>
</template>

<script>
import NestLink from 'nest/components_new/Link/default/Index'
import props from 'nest/components_new/Link/props'

export default {
  name: 'NLink',
  components: { NestLink, },
  mixins: [ props, ],
  computed: {
    s_route() {
      let route = {}
      if ($n.isString(this.route)) {
        route = { name: this.route, }
      } else {
        route = { ...this.route, }
      }
      
      if (this.$locale.default.code !== this.$locale.current.code) {
        route.query = {
          ...route.query,
          l: this.$locale.current.code,
        }
      }
      
      return this.route ? route : ''
    },
  },
}
</script>
