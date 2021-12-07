import styled from "styled-components";
// 引入图片
import pic from "@/assets/img/sprite_01.png"


//  给 APPHeader 组件外层包裹 一个 div
export const HeaderWrapper = styled.div`
  height: 75px;
  background-color: #242424;
  font-size: 14px;

  .content{
    height: 70px;

    display: flex;
    justify-content: space-between;
  }
  .divider{
    height: 5px;
    background-color: #c20c0c;
  }
`
export const HeaderLeft = styled.div`
  display: flex;

  .logo{
    display: block;
    width: 176px;
    height: 69px;
    background-position: 0 0;
  }
  .select-list{
    display: flex;
    line-height: 70px;

    .select-item{
      position: relative;

      a{
        display: block;
        padding: 0 20px;
        color: #ccc;
      }

      :last-of-type a{
        position: relative;
        ::after{
          position: absolute;
          top: 20px;
          right: -15px;
          content: "";
          width: 28px;
          height: 19px;
          background-image: url(${pic});
          background-position: -190px 0;
        }
      }

      &:hover a, a.active{
        color: #fff;
        background-color: #000;
        text-decoration: none;
      }

      a.active .icon{ 
        position: absolute;
        display: inline-block;
        width: 12px;
        height: 7px;
        bottom: -1px;
        left: 50%;
        transform: translate(-50%, 0);
        background-position: -226px 0;
      }
    }
  }
`
export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  color: #ccc;
  font-size: 12px;


  .search {
    width: 158px;
    height: 32px;
    border-radius: 16px;

    input {
      &::placeholder {
        font-size: 12px;
      }
    }
  }

  .center {
    width: 90px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border: 1px solid #666;
    border-radius: 16px;
    margin: 0 16px;
  }
  .btn{
    cursor: pointer;
  }
`