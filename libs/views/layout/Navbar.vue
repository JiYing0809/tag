<template>
  <div class="navbar">
    <Hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></Hamburger>
    <levelbar></levelbar>
    <!--<ErrLog v-if="log.length>0" class="errLog-container" :logsList="log"></ErrLog>-->
    <div class="env-container">
      当前环境：{{profile}}
      <!-- <Select :value="serverUrl" @on-change="changeEnv" size="small" style="width:100px" disabled>
            <Option value="dev">测试环境</Option>
            <Option value="prod">生产环境</Option>
          </Select> -->

    </div>

    <Dropdown class="avatar-container" trigger="click" @on-click="dispachDropdown">
      <div class="avatar-wrapper">

        <!--USER-->
        <!--<img class="user-avatar" src="~src/images/avatar.gif">-->
        <!--<i class="el-icon-caret-bottom" />-->
        <b>{{name}}</b>
        <Icon type="arrow-down-b"></Icon>
      </div>
      <Dropdown-menu slot="list">
        <Dropdown-item name="index">
          首页
        </Dropdown-item>

        <!--<router-link class='inlineBlock' to="/admin/profile">
                          <Dropdown-item>
                            设置
                          </Dropdown-item>
                        </router-link>-->
        <Dropdown-item divided name="logout">
          退出登录
        </Dropdown-item>
      </Dropdown-menu>
    </Dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Levelbar from './LayoutBreadcrumb';
import Hamburger from 'libs/components/Hamburger';
// import ErrLog from 'components/ErrLog';
// import errLogStore from 'store/errLog';

export default {
  components: {
    Levelbar,
    Hamburger
    // ErrLog
  },
  data() {
    return {
      // log: errLogStore.state.errLog
      opened: true,
      env: 'dev'
    }
  },
  computed: {
    ...mapGetters([
      'sidebar', 'serverUrl', 'name', 'profile'
    ])
  },
  methods: {
    toggleSideBar() {
      // this.opened = !this.opened
      this.$store.dispatch('ToggleSideBar')
    },
    changeEnv(val) {
      this.$store.dispatch('SetBaseUrl', val)
      // console.log(val)
    },
    logout() {
      this.$store.dispatch('LogOut')
    },
    dispachDropdown(name) {
      switch (name) {
        case 'index':location.assign('/'); break;
        case 'logout': this.logout(); break;
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    background-color:#EEF1F6;
    // background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    .hamburger-container {
        line-height: 58px;
        height: 50px;
        float: left;
        padding: 0 10px;
    }
    .env-container{
        // height: 50px;
        display: inline-block;
        position: absolute;
        right: 200px;
        // margin-top:12px;
    }
    .avatar-container {
        height: 50px;
        display: inline-block;
        position: absolute;
        right: 35px;
        .avatar-wrapper {
            cursor: pointer;
            // margin-top:5px;
            position: relative;
            .user-avatar {
                width: 40px;
                height: 40px;
                border-radius: 10px;
            }
            .el-icon-caret-bottom {
                position: absolute;
                right: -20px;
                top: 25px;
                font-size: 12px;
            }
        }
    }
}
</style>
