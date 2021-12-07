import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { getTopBannersAction } from '@/store/actions/recommend.js'

import { Carousel } from 'antd';
import { BannerWrapper, BannerLeft, BannerRight, BannerControl } from './style'

export default memo(function TopBanner() {
  // state
  const [currentIndex, setCurrentIndex] = useState(0)

  // 获取 redux 中的 轮播图数据
  const { topBanners } = useSelector(state => ({
    // 使用 immutableJS 
    topBanners: state.recommend.get("topBanners")
  }), shallowEqual);

  const dispatch = useDispatch();
  const bannerRef = useRef();

  useEffect(() => {
    dispatch(getTopBannersAction());
  }, [dispatch]);

  // 轮播图切换前触发的回调函数
  const bannerBeforeChange = useCallback((from, to) => {
    setCurrentIndex(to);
  }, []);

  // 轮播图背景图片
  const bgImage = topBanners[currentIndex] && (topBanners[currentIndex].imageUrl + "?imageView&blur=40x20")

  return (
    <BannerWrapper bgImage={bgImage}>
      <div className="banner wrap-v2">
        {/* 轮播图组件 */}
        <BannerLeft>
          <Carousel effect="fade" autoplay ref={bannerRef} beforeChange={bannerBeforeChange}>
            {
              topBanners.map(item => {
                return (
                  <div className="banner-item" key={item.imageUrl}>
                    <img className="image" src={item.imageUrl} alt={item.typeTitle} />
                  </div>
                )
              })
            }
          </Carousel>
        </BannerLeft>
        <BannerRight></BannerRight>
        {/* 轮播图左右控件 */}
        <BannerControl>
          <button className="btn left" onClick={e => bannerRef.current.prev()}></button>
          <button className="btn right" onClick={e => bannerRef.current.next()}></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
})
