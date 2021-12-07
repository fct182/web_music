import {
  CHANGE_TOP_BANNERS,
  CHANGE_HOT_RECOMMEND,
  CHANGE_NEW_ALBUM,
  CHANGE_UP_LIST,
  CHANGE_NEW_LIST,
  CHANGE_ORIGIN_LIST
} from '../constants'

// 使用 immutableJS 包裹对象
import { Map } from 'immutable'

const initState = Map({
  topBanners: [],
  hotRecommends: [],
  newAlbums: [],
  upLists: {},
  newLists: {},
  originLists: {}
})

export default function recommend(state = initState, action) {
  switch (action.type) {
    case CHANGE_TOP_BANNERS:
      // return { ...state, topBanners: action.data };
      return state.set("topBanners", action.data);
    case CHANGE_HOT_RECOMMEND:
      return state.set("hotRecommends", action.data);
    case CHANGE_NEW_ALBUM:
      return state.set("newAlbums", action.data);
    case CHANGE_UP_LIST:
      return state.set("upLists", action.data);
    case CHANGE_NEW_LIST:
      return state.set("newLists", action.data);
    case CHANGE_ORIGIN_LIST:
      return state.set("originLists", action.data);
    default:
      return state;
  }
}