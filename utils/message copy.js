import Vue from 'vue'
import message from './messages.vue'

export default function install (_Vue) {
  _Vue ? void (0) : _Vue = Vue
  _Vue.prototype.messagepop = function (options) {
	  console.log(options);
    const m = _Vue.extend(message)
    const installce = new _Vue({
      render: h => h(m)
    }).$mount('')
	console.log(m)
    installce.$children[0].$data.msg = options
    document.body.appendChild(installce.$el)
  }
}