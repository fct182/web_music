import { Map } from 'immutable'
import { CHANGE_CURRENT_SONG, CHANGE_CURRENT_INDEX, CHANGE_PLAY_LIST, CHANGE_SEQUENCE, CHANGE_LYRICS, CHANGE_LYRIC_INDEX } from '../constants.js'

const initState = Map({
  currentSong: {},
  currentIndex: 0,
  playList: [],
  sequence: 0,  // 0 默认循环播放，1 随机播放，2 单曲循环
  lyrics: [],
  currentLyricIndex: 0
})

export default function playedSong(state = initState, action) {
  switch (action.type) {
    case CHANGE_CURRENT_SONG:
      return state.set("currentSong", action.data);
    case CHANGE_CURRENT_INDEX:
      return state.set("currentIndex", action.data);
    case CHANGE_PLAY_LIST:
      return state.set("playList", action.data);
    case CHANGE_SEQUENCE:
      return state.set("sequence", action.data);
    case CHANGE_LYRICS:
      return state.set("lyrics", action.data);
    case CHANGE_LYRIC_INDEX:
      return state.set("currentLyricIndex", action.data);
    default:
      return state;
  }
}