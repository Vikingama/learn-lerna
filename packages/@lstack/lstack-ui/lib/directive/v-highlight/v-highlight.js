import highlightJs from 'highlight.js'

export default {
  bind(el, binding) {
    const blocks = el.querySelectorAll('pre code')
    blocks.forEach(block => {
      highlightJs.highlightBlock(block)
    })
  },
}
