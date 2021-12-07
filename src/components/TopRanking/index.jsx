import React, { memo } from 'react'
import { useDispatch } from 'react-redux'

import { TopRankingWrapper } from './style'
import { getSizeImage } from '@/utils/data-format.js'
import { getSongDetailsAction } from '@/store/actions/playedSong.js'

export default memo(function TopRanking(props) {
  const { info } = props;
  const { tracks = [] } = info;

  // redux hook
  const dispatch = useDispatch();

  // other handle
  const playMusic = (item) => { // 播放当前音乐
    dispatch(getSongDetailsAction(item.id));
  }
  const addPlayList = (item) => { // 将当前音乐添加到播放列表
    console.log("添加到播放列表");
  }
  return (
    <TopRankingWrapper>
      <div className="header">
        <div className="image">
          <img src={getSizeImage(info.coverImgUrl)} alt="" />
          <a href="/todo" className="image_cover">ranking</a>
        </div>
        <div className="info">
          <a href={`https://music.163.com/discover/toplist?id=${info.id}`}>{info.name}</a>
          <div>
            <button className="btn play sprite_02"></button>
            <button className="btn favor sprite_02"></button>
          </div>
        </div>
      </div>
      <div className="list">
        {
          tracks.slice(0, 10).map((item, index) => {
            return (
              <div key={item.id} className="list-item">
                <div className="rank">{index + 1}</div>
                <div className="info">
                  <a href={`https://music.163.com/#/song?id=${item.id}`} className="name text-nowrap">{item.name}</a>
                  <div className="operate">
                    <button className="btn sprite_02 play"
                      onClick={e => playMusic(item)} title="播放"></button>
                    <button className="btn sprite_icon2 addto" title="添加到播放列表" onClick={e => addPlayList(item)}></button>
                    <button className="btn sprite_02 favor" title="收藏"></button>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="footer">
        <a href="/todo">查看全部 &gt;</a>
      </div>
    </TopRankingWrapper>
  )
})
