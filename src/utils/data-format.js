/**
 * 格式化 Number 播放量数据
 * @param {Number} count 
 * @returns 
 */
export function getCount(count) {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + "万";
  } else {
    return Math.floor(count / 10000000) / 10 + "亿";
  }
}

/**
 * 配置请求图片的url 来获取对应图片大小
 * @param {String} imgUrl 
 * @param {Number} size 
 * @returns 
 */
export function getSizeImage(imgUrl, size) {
  return `${imgUrl}?param=${size}x${size}`;
}

/**
 * 时间格式化 函数
 * @param {Number} time 传入毫秒值 
 * @param {*} fmt 传入格式化模板
 * @returns 
 */
export function formatTime(time, fmt) {
  let date = new Date(time);

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};