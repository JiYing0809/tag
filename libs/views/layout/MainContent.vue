<template>
  <section class="layout-content">
    <Spin size="large" class="loading" v-show="loading"></Spin>
    <transition name="fade" mode="out-in">
      <div class="layout-content" v-show="!loading">
        <router-view :key="key"></router-view>
      </div>
    </transition>
  </section>
</template>

<script>


export default {
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + +new Date()
        : this.$route + +new Date()
    }
  },
  data() {
    return {
      loading: false
    }
  },
  created() {
    this.loading = true
  },
  mounted() {
    this.loading = false
  }
}
</script>


<style lang="stylus" scoped>

.loading
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);


.menu-and-content
  display: flex;
  flex-wrap: nowrap

.submenu
  position:relative
  flex :0 0
  &::after
    content: "";
    display: block;
    width: 1px;
    background: #d7dde4;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0px;

.content
  margin-left:20px
  flex :1 1


</style>
