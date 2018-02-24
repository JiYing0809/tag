import hljs from 'highlight.js'
import 'highlight.js/styles/github.css' // 样式文件

const Highlight = {}
Highlight.install = function(Vue, options) {
  Vue.directive('highlight', (el, binding) => {
    // if (binding.value != null && binding.value != '') {

    // } else {

    // }
    hljs.highlightBlock(el)
    // const blocks = el.querySelectorAll('pre code');
    // console.log(blocks)
    // blocks.forEach(block => {
    //   hljs.highlightBlock(block)
    // })
  })
}
export default Highlight