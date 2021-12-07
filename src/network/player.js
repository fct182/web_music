/**
 * 播放歌曲 的网络请求
 */
import request from './request'

// 请求歌曲详情内容
export function getSongDetails(ids) {
  return request({
    url: "/song/detail",
    params: {
      ids
    }
  })
}

// 获取 当前播放音乐的音频
export function getPlaySong(id) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}

// 获取 歌曲的歌词数据
export function getLyric(id) {
  return request({
    url: "/lyric",
    params: {
      id
    }
  })
}