/**
 * 存放所有 recommend 模块的请求方法
 */
import request from './request.js'

/**
 * 获取 推荐页面的--------轮播图数据
 */
export function getTopBanners() {
  return request({
    url: "/banner"
  })
}

/**
 * 获取 推荐页面的------热门推荐数据
 * @param {Number} limit 请求几条数据
 * @returns axios 对象
 */
export function getHotRecommends(limit) {
  return request({
    url: "/personalized",
    params: {
      limit
    }
  })
}

/**
 * 获取 推荐页面的--------新碟数据
 * @param {Number} limit 
 * @returns 
 */
export function getNewAlbums(limit) {
  return request({
    url: "/top/album",
    params: {
      limit
    }
  })
}

/**
 * 获取  榜单数据列表
 * @param {Number} idx 
 * @returns 
 */
export function getTopLists(idx) {
  return request({
    url: "/top/list",
    params: {
      idx
    }
  })
}
