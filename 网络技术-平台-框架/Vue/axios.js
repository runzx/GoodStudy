/* 
vue axios 
  axios 是一个基于 promise 的 HTTP 库，axios并没有install 方法，
    所以是不能使用vue.use()方法 
*/

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios,axios)

this.axios.get('https://jsonplaceholder.typicode.com/users').then(({data,status})=>{})