import React, { memo, useEffect, useRef } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { getNewAlbumsAction } from '@/store/actions/recommend.js'
import { AlbumWrapper } from './style'

import { Carousel } from 'antd'
import TopTitleRcm from '@/components/TopTitleRcm'
import AlbumCover from '@/components/AlbumCover'

export default memo(function NewAlbum() {
  // state

  // redux hook
  const { newAlbums } = useSelector(state => ({
    newAlbums: state.recommend.get("newAlbums")
  }), shallowEqual);
  const dispatch = useDispatch();

  // other hook
  const albumList = useRef();

  useEffect(() => {
    dispatch(getNewAlbumsAction(10));
  }, [dispatch]);
  return (
    <AlbumWrapper>
      <TopTitleRcm title="新碟上架" />
      <div className="content">
        <button className="arrow arrow-left sprite_02" onClick={e => albumList.current.prev()}></button>
        <div className="album">
          <Carousel dots={false} ref={albumList}>
            {
              [0, 1].map(item => (
                <div key={item} className="page">
                  {
                    newAlbums.slice(item * 5, (item + 1) * 5).map(it => (
                      <AlbumCover key={it.id} size={110} width={118} bgp="-570px" info={it} />
                    ))
                  }
                </div>
              ))
            }
          </Carousel>
        </div>
        <button className="arrow arrow-right sprite_02" onClick={e => albumList.current.next()}></button>
      </div>
    </AlbumWrapper>
  )
})
