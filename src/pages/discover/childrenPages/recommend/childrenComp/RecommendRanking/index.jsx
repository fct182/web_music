import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RankingWrapper } from './style'
import { getTopListsAction } from '@/store/actions/recommend.js'

import TopTitleRcm from '@/components/TopTitleRcm'
import shallowEqual from 'shallowequal'
import TopRanking from '@/components/TopRanking'

export default memo(function RecommendRanking() {
  // redux hook
  const { upLists, newLists, originLists } = useSelector(state => ({
    upLists: state.recommend.get("upLists"),
    newLists: state.recommend.get("newLists"),
    originLists: state.recommend.get("originLists"),
  }), shallowEqual);
  const dispatch = useDispatch();

  // other hook
  useEffect(() => {
    dispatch(getTopListsAction(0));
    dispatch(getTopListsAction(2));
    dispatch(getTopListsAction(3));
  }, [dispatch]);

  return (
    <RankingWrapper>
      <TopTitleRcm title="榜单" />
      <div className="tops">
        <TopRanking info={upLists} />
        <TopRanking info={newLists} />
        <TopRanking info={originLists} />
      </div>
    </RankingWrapper>
  )
})
