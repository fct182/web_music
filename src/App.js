import React, { memo, Suspense } from 'react'

import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from './router'

import AppFooter from '@/components/AppFooter'
import AppHeader from '@/components/AppHeader'
import PlayerBar from './pages/player/PlayerBar'

export default memo(function App() {
  return (
    <HashRouter>
      <AppHeader />
      <Suspense fallback={<h1>Loading</h1>}>
        {renderRoutes(routes)}
      </Suspense>
      <AppFooter />
      {/* 底部播放栏 */}
      <PlayerBar />
    </HashRouter>
  )
})
