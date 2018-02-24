<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div class="sidebar-wrapper">
      <Sidebar class="sidebar-container" />
    </div>
    <div class="main-container">
      <Navbar/>
      <MainContent/>

    </div>

    <div class="layout-copy">
      2016-2017 &copy; PPCredit
            <div :class="classes" :style="styles" @click="modal5 = true">
                <Icon type="help-circled"></Icon>
           </div>
    </div>

    <Back-top :bottom='bottom'></Back-top>

   <Modal v-model="modal5"  title="提问" width="300">
        <p>如果您在使用中遇到问题，包括但不限于该管理系统的使用，可以向我们提出问题或建议，我们会及时为您解答。 <img src="/static/images/jion.jpg" style="background:rgba(0,0,0,0.7);margin:20px 33px;"/></p>
        </br>
        <p class="clearfix">
          <a class="fr" target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=13d0f8b56a1a379e36fdd49e923f265c778754a6ea6c4f09771a370382f805a7
" alt="微服务后台系统支持" title="微服务后台系统支持">点击提问</a>

        </p>

    </Modal>

  </div>
</template>

<script>
import { Navbar, Sidebar, MainContent } from '.';
import { mapGetters } from 'vuex';
const prefixCls = 'ivu-back-top';
export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    MainContent
  },
  //  beforeCreate(){
  //    this.$Notice.info({title:'消息'})
  //    this.eventstrem()
  //  },
  data() {
    return {
      evtSource: null,
      bottom: 80,
      modal5: false


    }
  },
  created() {
    // this.eventstrem()
  },
  destroyed() {
    this.evtSource.close()
  },
  computed: {
    ...mapGetters(['sidebar']),
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-show`]: this.backTop
        }
      ];
    },
    styles() {
      return {
        bottom: '30px',
        right: '30px',
        display: 'block',
        background: 'rgba(255,84,0,0.7)'
      };
    }

  },
  methods: {
    handleScroll() {
      this.backTop = window.pageYOffset >= this.height;
    },
    eventstrem() {
      if ('EventSource' in window) {
        this.evtSource = new EventSource('/api/journal?stream');
        const that = this
        this.evtSource.onmessage = function(event) {
          // that.$Notice.info({ title: '消息' + event })
        }
        this.evtSource.onopen = function(event) {
         // that.$Notice.info({ title: JSON.stringify(event) })
        };

        this.evtSource.onerror = function(event) {
          // that.$Notice.error({ title: JSON.stringify(event) })
        };
      } else {
        console.warn('not support EventSource')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~libs/styles/mixin"

.app-wrapper {
  clearfix();
  position: relative;
  height: 100%;
  width: 100%;
  &.hideSidebar {
    .sidebar-wrapper {
      transform: translate(-140px, 0);
      .sidebar-container {
        transform: translate(132px, 0);
      }
      &:hover {
        transform: translate(0, 0);
        .sidebar-container {
          transform: translate(0, 0);
        }
      }
    }
    .main-container {
      margin-left: 40px;
    }
  }
  .sidebar-wrapper {
    width: 180px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow-x: hidden;
    transition: all .28s ease-out;
    background: #1c2438;
    scrollBar();
  }
  .sidebar-container {
    transition: all .28s ease-out;
  }
  .main-container {
    min-height: 97%;
    transition: all .28s ease-out;
    margin-left: 180px;
  }
}

.layout-copy{
   position:relative,
  // left:50%
  // bottom:0
  text-align:center
  margin-left: 180px;
}
</style>
