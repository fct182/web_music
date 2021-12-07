import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { PlaybarWrapper, Control, PlayInfo, Operator } from './style'
import { getSongDetailsAction, changeSequenceAction, changePlayedSongAction, changeLyricIndexAction } from '@/store/actions/playedSong.js'
import { getSizeImage, formatTime } from '@/utils/data-format.js'
import { getPlaySong } from '@/network/player.js'

import { Slider, message } from 'antd'

export default memo(function PlayerBar() {
  // state and props
  const [currentTime, setCurrentTime] = useState(0);// 毫秒值
  const [progress, setProgress] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // redux hook
  const { currentSong, sequence, playListLen, lyricList, currentLyricIndex } = useSelector(state => ({
    currentSong: state.playedSong.get("currentSong"),
    sequence: state.playedSong.get("sequence"),
    playListLen: state.playedSong.get("playList").length,
    lyricList: state.playedSong.get("lyrics"),
    currentLyricIndex: state.playedSong.get("currentLyricIndex")
  }), shallowEqual);
  const dispatch = useDispatch();

  // other hook
  useEffect(() => {
    dispatch(getSongDetailsAction("1891469546"));
  }, [dispatch]);

  const audioRef = useRef();

  useEffect(() => {
    audioRef.current.src = getPlaySong(currentSong.id);
    // 切换歌曲，音乐自动播放
    audioRef.current.play().then(res => {
      setIsPlaying(true);
    }).catch(err => {
      setIsPlaying(false);
    });
  }, [currentSong]);

  // other handle
  const picUrl = currentSong.al ? currentSong.al.picUrl : "";
  const authorName = currentSong.ar ? currentSong.ar[0].name : "未知歌手";
  const duration = formatTime(currentSong.dt, "mm:ss");
  const showCurrentTime = formatTime(currentTime, "mm:ss");

  // function handle
  const playMusic = useCallback(() => {// 播放 or 暂停播放
    if (!isPlaying) {
      setIsPlaying(true);
      audioRef.current.play();
    } else {
      setIsPlaying(false);
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // audio 时间改变的回调函数
  function timeUpdate(e) {
    const currentTime = e.target.currentTime;// 取的是秒值
    if (!isChanging) {    // 是否在改变状态  
      setCurrentTime(currentTime * 1000);
      setProgress(currentTime * 1000 / currentSong.dt * 100);
    }
    // 获取当前的歌词
    let currentIndexLyric = 0;
    for (let i = currentIndexLyric; i < lyricList.length; i++) {
      if (currentTime * 1000 < lyricList[i].time) {
        currentIndexLyric = i - 1;
        break;
      }
    }
    if (currentLyricIndex !== currentIndexLyric) {
      dispatch(changeLyricIndexAction(currentIndexLyric));
      // 歌词展示
      message.open({
        content: lyricList[currentIndexLyric].content,
        duration: 0,
        key: "lyric",
        className: "lyric-class"
      })
    }
  }

  // 滑动过程 赋值当前的进度--progress 和 进度上的时间
  const sliderChangeHandle = useCallback((value) => {
    setIsChanging(true);
    setCurrentTime(value / 100 * currentSong.dt);
    setProgress(value);
  }, [currentSong]);

  // 滑动完成时，取进度值
  const sliderAfterChangeHandle = useCallback((value) => {
    // 进度条滑动停止后，播放滑到位置的音乐
    const currentTime = value / 100 * currentSong.dt / 1000;
    audioRef.current.currentTime = currentTime;
    setCurrentTime(currentTime * 1000);
    setIsChanging(false);

    if (!isPlaying) {   // 暂停时，滑动结束自动播放
      playMusic();
    }
  }, [currentSong, isPlaying, playMusic]);

  // 切歌
  function changePlaySong(tag) {
    dispatch(changePlayedSongAction(tag));
  }

  // 改变 音乐播放顺序
  function changeSequence() {
    let currentSequence = sequence + 1;
    if (currentSequence === 3) {
      currentSequence = 0;
    }
    dispatch(changeSequenceAction(currentSequence));
  }

  // 音乐播放完毕触发回调
  function handleMusicEnd() {
    if (sequence === 2) { // 单曲循环
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      dispatch(changePlayedSongAction(1));
    }
  }

  return (
    <PlaybarWrapper className="sprite_player">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <button className="sprite_player prev" onClick={e => changePlaySong(-1)}></button>
          <button className="sprite_player play" onClick={e => playMusic()}></button>
          <button className="sprite_player next" onClick={e => changePlaySong(1)}></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <NavLink to={`/discover/player`}>
              <img src={getSizeImage(picUrl, 35)} alt="" />
            </NavLink>
          </div>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong.name}</span>
              <a href="/todo" className="singer-name">{authorName}</a>
            </div>
            <div className="progress">
              <Slider defaultValue={0} value={progress} tooltipVisible={false} onChange={sliderChangeHandle} onAfterChange={sliderAfterChangeHandle} />
              <div className="time">
                <span className="now-time">{showCurrentTime}</span>
                <span className="divider">/</span>
                <span className="duration">{duration}</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator sequence={sequence}>
          <div className="left">
            <button className="sprite_player btn favor" ></button>
            <button className="sprite_player btn share"></button>
          </div>
          <div className="right sprite_player">
            <button className="sprite_player btn volume"></button>
            <button className="sprite_player btn loop" onClick={e => changeSequence()}></button>
            <button className="sprite_player btn playlist">
              &nbsp;{playListLen}</button>
          </div>
        </Operator>
        <audio ref={audioRef} onTimeUpdate={timeUpdate} onEnded={handleMusicEnd}></audio>
      </div>
    </PlaybarWrapper>
  )
})
