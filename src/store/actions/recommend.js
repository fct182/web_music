import {
  CHANGE_TOP_BANNERS,
  CHANGE_HOT_RECOMMEND,
  CHANGE_NEW_ALBUM,
  CHANGE_UP_LIST,
  CHANGE_NEW_LIST,
  CHANGE_ORIGIN_LIST
} from '../constants'
// 引入请求方法
import {
  getTopBanners,
  getHotRecommends,
  getNewAlbums,
  getTopLists
} from '@/network/recommend.js'

/**
 * 将 轮播图 数据存放到 redux
 * @param {Array} data 
 * @returns 
 */
function addTopBanners(data) {
  return {
    type: CHANGE_TOP_BANNERS,
    data
  }
}

/**
 * 异步 Action 请求轮播图数据
 */
export function getTopBannersAction() {
  return (dispatch, getState) => {
    getTopBanners().then(res => {
      dispatch(addTopBanners(res.banners));
    })
  }
}

/**
 * 将 热门推荐 数据存放到 redux
 */
function addHotRecommends(data) {
  return {
    type: CHANGE_HOT_RECOMMEND,
    data
  }
}

/**
 * 异步 Action 请求 热门推荐 数据
 */
export function getHotRecommendsAction(limit) {
  return (dispatch, getState) => {
    getHotRecommends(limit).then(res => {
      dispatch(addHotRecommends(res.result));
    })
  }
}

// 将 新碟上架 数据存放到 redux
function addNewAlbums(data) {
  return {
    type: CHANGE_NEW_ALBUM,
    data
  }
}
/**
 * 异步 Action 请求 新碟上架 数据
 */
export function getNewAlbumsAction(limit) {
  return (dispatch) => {
    getNewAlbums(limit).then(res => {
      dispatch(addNewAlbums(res.albums));
    })
  }
}

// 将 飙升榜  数据 存放到 redux 中
function addUpLists(data) {
  return {
    type: CHANGE_UP_LIST,
    data
  }
}
// 将 新歌榜 数据 存放到 redux 中
function addNewLists(data) {
  return {
    type: CHANGE_NEW_LIST,
    data
  }
}
// 将  原创榜 数据 存放到 redux 中
function addOriginLists(data) {
  return {
    type: CHANGE_ORIGIN_LIST,
    data
  }
}

/**
 * 异步 Action 请求 榜单列表----数据
 */
export function getTopListsAction(idx) {
  return (dispatch) => {
    getTopLists(idx).then(res => {
      const list = res.playlist;
      switch (idx) {
        case 0:
          dispatch(addNewLists(list));
          break;
        case 2:
          dispatch(addOriginLists(list));
          break;
        case 3:
          dispatch(addUpLists(list));
          break;
        default:
          break;
      }
    })
  }
}