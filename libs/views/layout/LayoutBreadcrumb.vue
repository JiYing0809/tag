<template>
  <div class="layout-breadcrumb">
    <Breadcrumb separator="<b class='breadcrumb-separator'> / </b>">
      <Breadcrumb-item href="/" native>
        Home
      </Breadcrumb-item>
      <Breadcrumb-item v-for="(item,index) in breadList.slice(0,breadList.length-1)" :href="item.path?item.path:item.redirect" :key="index">
        {{item.meta.title}}
      </Breadcrumb-item>
      <Breadcrumb-item>
        {{breadList[breadList.length-1].meta.title}}
      </Breadcrumb-item>
    </Breadcrumb>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      breadList: null
    }
  },
  created () {
    this.getBreadcrumb()
  },
  computed: {
    ...mapGetters(['serverList'])
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb () {
      const matched = this.$route.matched.filter(item => item.meta.title)

      if (this.$route.matched[0].path === '/microservice/applications/:id') {
        // console.log('serverlist' + this.serverList)
        const list = []
        // list.push({ path: '/', meta: { title: '首页' } })
        list.push({ path: '/microservice/index', meta: { title: '微服务' } })
        let cur_server = {}
        if (this.serverList[0] === 'noserver') {
          cur_server = { name: '', statusInfo: { status: '' } }
        } else {
          cur_server = this.serverList.filter(x => x.id === this.$route.params.id)[0]
        }
        // console.log(cur_server)
        const title = `${cur_server.name}${this.$route.params.id} ${cur_server.statusInfo.status}`
        list.push({ path: `/microservice/applications/${this.$route.params.id}/details`, meta: { title } })
        list.push({ path: '', meta: { title: this.$route.meta.title } })
        this.breadList = list
      } else {
        this.breadList = matched
      }

      // console.log(this.breadList)
    }
  }
}
</script>

<style scoped>
.layout-breadcrumb {
  display: inline-block;
}
</style>

