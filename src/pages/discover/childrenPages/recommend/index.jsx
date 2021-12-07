import React, { memo } from 'react'
import { RecommendWrapper, Content, RecommendLeft, RecommendRight } from './style'

import TopBanner from './childrenComp/TopBanner';
import HotRecommend from './childrenComp/HotRecommend';
import NewAlbum from './childrenComp/NewAlbum'
import RecommendRanking from './childrenComp/RecommendRanking'
import UserLogin from './childrenComp/UserLogin'
import SetterSinger from './childrenComp/SetterSinger'
import HotAnchor from './childrenComp/HotAnchor'

function Recommend() {
  return (
    <RecommendWrapper>
      {/* 顶部轮播图 */}
      <TopBanner />
      {/* 内容区域 */}
      <Content className="wrap-v2">

        {/* 左边 */}
        <RecommendLeft>
          {/* 热门推荐 */}
          <HotRecommend />

          {/* 新碟上架 */}
          <NewAlbum />

          {/* 榜单 */}
          <RecommendRanking />
        </RecommendLeft>

        {/* 右边 */}
        <RecommendRight>
          {/* 用户登录 */}
          <UserLogin />

          {/* 入驻歌手 */}
          <SetterSinger />

          {/* 热门主播 */}
          <HotAnchor />
        </RecommendRight>
      </Content>
    </RecommendWrapper>
  )
}

export default memo(Recommend);
