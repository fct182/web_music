import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { HeaderWrapper, HeaderLeft, HeaderRight } from './style'
import { headerLinks } from "@/common/local-data.js"
import { Input } from "antd"
import { SearchOutlined } from "@ant-design/icons"

export default memo(function AppHeader() {
  function dealSelectItem(item, index) {
    if (index < 3) {
      return (
        <NavLink to={item.link}>
          {item.title}
          <i className="sprite_01 icon"></i>
        </NavLink>)
    } else {
      return (<a href={item.link}>{item.title}</a>)
    }
  }

  return (
    <HeaderWrapper>
      {/* 头部顶栏 */}
      <div className="content wrap-v1">
        <HeaderLeft>
          <a href="#/" className="logo sprite_01"> </a>
          <div className="select-list">
            {
              headerLinks.map((item, index) => {
                return (
                  <div key={item.title} className="select-item">
                    {dealSelectItem(item, index)}
                  </div>
                )
              })
            }
          </div>
        </HeaderLeft>
        <HeaderRight>
          <Input className="search" placeholder="音乐/视频/电台/用户" prefix={<SearchOutlined />}></Input>
          <div className="center btn">创作者中心</div>
          <div className="btn">登录</div>
        </HeaderRight>
      </div>
      {/* 头部顶栏下红线 */}
      <div className="divider"></div>
      {/* <p>
        <NavLink to="/">发现音乐</NavLink>
      </p>
      <p><NavLink to="/mine">我的音乐</NavLink></p>
      <p><NavLink to="/friend">朋友</NavLink></p> */}
    </HeaderWrapper>
  )
})
