import axios from 'axios'

const ERR_OK = 0
export function get(url) {
  return function(params) {
    return axios.get(url, {
      params
    }).then((res) => {
      // 成功回调
      const { errno, data } = res.data
      if (errno === ERR_OK) {
        return data
      }
    }).catch(() => {
      // 失败回调
    })
  }
}

// axios({
//   method: 'post',
//   url: '/user/12345',
//   data: {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
//   }
// });
