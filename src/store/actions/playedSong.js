/**
 * 播放栏 的 action 方法
 */
import {
  CHANGE_CURRENT_SONG,
  CHANGE_CURRENT_INDEX,
  CHANGE_PLAY_LIST,
  CHANGE_SEQUENCE,
  CHANGE_LYRICS,
  CHANGE_LYRIC_INDEX
} from '../constants'
import { getSongDetails, getLyric } from '@/network/player.js'
import { parseLyric } from '@/utils/parseLyric.js'

function changeCurrentSong(data) {
  return {
    type: CHANGE_CURRENT_SONG,
    data
  }
}

function changePlayListAction(data) {
  return {
    type: CHANGE_PLAY_LIST,
    data
  }
}

function changeCurrentSongIndexAction(data) {
  return {
    type: CHANGE_CURRENT_INDEX,
    data
  }
}

function changeLyricsAction(data) {
  return {
    type: CHANGE_LYRICS,
    data
  }
}

/**
 * 获取 播放音乐  的详细信息
 * 点击 音乐的播放按钮 触发
 * @param {String} ids 歌曲的 id
 * @returns 
 */
export function getSongDetailsAction(ids) {
  return (dispatch, getState) => {
    // 1. 判断当前 ID 是否存在于 playList 播放列表
    const playList = getState().playedSong.get("playList");
    const songIndex = playList.findIndex(song => song.id === ids);

    // 判断是否在播放列表中找到当前歌曲
    let song = null;
    if (songIndex !== -1) { // 在播放列表中
      dispatch(changeCurrentSongIndexAction(songIndex));
      song = playList[songIndex];
      dispatch(changeCurrentSong(song));
      // 请求歌词
      dispatch(getLyricAction(song.id));
    } else {
      getSongDetails(ids).then(res => {
        song = res.songs && res.songs[0];
        if (!song) return;
        // 1. 将新歌曲添加到播放列表中去
        const newPlayList = [...playList];
        newPlayList.push(song);
        // 2. 更新 redux 数据
        dispatch(changePlayListAction(newPlayList));
        dispatch(changeCurrentSong(song));
        dispatch(changeCurrentSongIndexAction(newPlayList.length - 1));
        // 请求歌词
        dispatch(getLyricAction(song.id));
      });
    }

  }
}

/**
 * 改变播放音乐的顺序
 * @param {Number，0,1,2} data 
 * @returns 
 */
export function changeSequenceAction(data) {
  return {
    type: CHANGE_SEQUENCE,
    data
  }
}

/**
 * 当 用户 点击上一曲或者下一曲 时，或当前音乐播放完毕时  触发
 * @param {Number,-1 或 1} tag 表示上一曲或者下一曲
 * @returns 
 */
export function changePlayedSongAction(tag) {
  return (dispatch, getState) => {
    const sequence = getState().playedSong.get("sequence");
    const playList = getState().playedSong.get("playList");
    let currentIndex = getState().playedSong.get("currentIndex");
    switch (sequence) {
      case 1: //随机播放
        let randomIndex = Math.floor(Math.random() * playList.length);
        while (randomIndex === currentIndex) {
          randomIndex = Math.floor(Math.random() * playList.length);
        }
        currentIndex = randomIndex;
        break;
      default:  // 顺序播放 或 单曲循环
        currentIndex += tag;
        if (currentIndex >= playList.length) {
          currentIndex = 0;
        }
        if (currentIndex < 0) {
          currentIndex = playList.length - 1;
        }
        break;
    }
    dispatch(changeCurrentSong(playList[currentIndex]));
    dispatch(changeCurrentSongIndexAction(currentIndex));
    // 请求歌词
    dispatch(getLyricAction(playList[currentIndex].id));
  }
}

/**
 * 获取 歌曲 的歌词
 * @param {Number} id 
 * @returns 
 */
export function getLyricAction(id) {
  return dispatch => {
    getLyric(id).then(res => {
      const lyricList = parseLyric(res.lrc.lyric);
      dispatch(changeLyricsAction(lyricList));
    })
  }
}

/**
 * 修改当前歌词下标
 * @param {Number} data 
 * @returns 
 */
export function changeLyricIndexAction(data) {
  return {
    type: CHANGE_LYRIC_INDEX,
    data
  }
}