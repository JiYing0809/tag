<template >
  <Menu class="menu" width="150px" theme="light" :active-name="$route.path.replace($route.params.id,':id')" @on-select="redirect">
    <Menu-item v-for='sm in subMenu' :key="sm" :name="sm.path">
      <Icon :type="sm.meta.icon" /> {{sm.meta.title}}
    </Menu-item>
  </Menu>
</template>

<script>
import { mapGetters } from 'vuex'
import { findTree } from 'libs/utils/tree'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'permissionRoute'
    ]),
    subMenu() {
      return findTree(this.permissionRoute, 'children', x => x.path === '/microservice/applications/:id').children
    }
  },
  methods: {
    redirect(name) {
      this.$router.push(name.replace(':id', this.$route.params.id))
    }
  }
}
</script>

<style lang="stylus" scoped>
.menu
  position:relative
  // flex :0 0
  &::after
    content: "";
    display: block;
    width: 1px;
    background: #d7dde4;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0px;
</style>
