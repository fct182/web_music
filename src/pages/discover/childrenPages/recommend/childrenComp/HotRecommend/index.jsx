import React, { memo, useEffect } from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import { HotRecommendWrapper } from './style'
import { getHotRecommendsAction } from '@/store/actions/recommend.js'

import TopTitleRcm from '@/components/TopTitleRcm'
import SongsCover from '@/components/SongsCover'

export default memo(function HotRecommendRanking() {
  // state

  // redux hook
  const { hotRecommends } = useSelector(state => ({ hotRecommends: state.recommend.get("hotRecommends") }), shallowEqual);
  const dispatch = useDispatch();

  // other hook
  useEffect(() => {
    dispatch(getHotRecommendsAction(8));
  }, [dispatch]);

  return (
    <HotRecommendWrapper>
      {/* 标题 */}
      <TopTitleRcm title="热门推荐" keywords={["华语", "流行", "摇滚", "民谣", "电子"]} />
      {/* 热门歌曲列表 */}
      <div className="recommend-list">
        {
          hotRecommends.map(item => {
            return (
              <SongsCover key={item.id} info={item} />
            )
          })
        }
      </div>
    </HotRecommendWrapper>
  )
})
