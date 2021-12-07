import React, { lazy } from "react";

import { Redirect } from "react-router-dom";

const Discover = lazy(() => import("@/pages/discover"));
const Mine = lazy(() => import("@/pages/mine"));
const Friend = lazy(() => import("@/pages/friend"));
const Recommend = lazy(() => import("@/pages/discover/childrenPages/recommend"));
const Ranking = lazy(() => import("@/pages/discover/childrenPages/ranking"));
const Songs = lazy(() => import("@/pages/discover/childrenPages/songs"));
const Djradio = lazy(() => import("@/pages/discover/childrenPages/djradio"));
const Artist = lazy(() => import("@/pages/discover/childrenPages/artist"));
const Album = lazy(() => import("@/pages/discover/childrenPages/album"));
const Player = lazy(() => import("@/pages/player"));


const routes = [
  {
    path: "/",
    exact: true,
    render: () => (<Redirect to="/discover" />)
  },
  {
    path: "/discover",
    component: Discover,
    routes: [
      {
        path: "/discover",
        exact: true,
        render: () => (<Redirect to="/discover/recommend" />)
      },
      {
        path: "/discover/recommend",
        component: Recommend
      },
      {
        path: "/discover/ranking",
        component: Ranking
      },
      {
        path: "/discover/songs",
        component: Songs
      },
      {
        path: "/discover/djradio",
        component: Djradio
      },
      {
        path: "/discover/artist",
        component: Artist
      },
      {
        path: "/discover/album",
        component: Album
      },
      {
        path: "/discover/player",
        component: Player
      },
    ]
  },
  {
    path: "/mine",
    component: Mine
  },
  {
    path: "/friend",
    component: Friend
  }
];

export default routes;