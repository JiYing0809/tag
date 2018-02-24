<template>
  <Menu :active-name="this.$route.path" :open-names="curOpenName" theme="dark" width="auto" @on-select="clickMenu($event)" accordion>
    <!-- {{curOpenName}} -->
    <div class="layout-logo-left">
      <router-link to="/">
        <img src="~assets/images/ppc-logo.png" style="margin-top:10px" />
      </router-link>
    </div>

    <!-- <Menu-item name="/dashboard">
          <Icon type="ios-keypad"></Icon>
          <span class="layout-text">dashboard</span>
        </Menu-item> -->
        <!-- {{menuRoute}} -->
    <div v-for="(menu,index) in menuRoute" :key="index">
      <!-- {{menu.path}} -->
      <Submenu v-if="menu.children" :name="`${menu.path}`">
        <template slot="title">
          <Icon :type="menu.meta.icon"></Icon>
          <span class="layout-text">{{menu.meta.title}}</span>
        </template>
        <Menu-item :name="`${subMenu.path}`" v-for="(subMenu,sm_index) in menu.children" :key="sm_index">
          &nbsp;
        <!-- {{subMenu.redirect ||subMenu.path}} -->
          <Icon :type="subMenu.meta.icon"></Icon>
          <span class="layout-text">{{subMenu.meta.title}}</span>
        </Menu-item>
      </Submenu>
      <Menu-item v-else :name="`${menu.redirect || menu.path}`">
        <Icon :type="menu.meta.icon"></Icon>
        <span class="layout-text">{{menu.meta.title}}</span>
      </Menu-item>
    </div>

  </Menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'menuList'
    ]),
    curOpenName () {
      if (this.$route.path.lastIndexOf('/') === 0) {
        return ['/']
      } else {
        return /\/[^/]*/.exec(this.$route.path)
      }
    },
    menuRoute () {
      return this.menuList
    }
  },
  methods: {
    clickMenu (url) {
      if (url.indexOf('#') > 0) {
        location.assign(url)
      } else {
        this.$router.push(url)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-menu {
    min-height: 100%;
}
.ivu-menu-dark{
  background:none
}
</style>
