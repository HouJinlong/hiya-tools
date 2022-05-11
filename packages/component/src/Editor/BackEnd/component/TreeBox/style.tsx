
import styled from "styled-components"
export const TreeBox =styled.div`
    height: 100%;
    .ant-menu-vertical{
      border: 0;
    }
    .ant-menu-vertical > .ant-menu-item{
      margin-top: 0;
      height: 30px;
    }
    .ant-menu-vertical .ant-menu-item:not(:last-child){
      margin-bottom: 0;
    }
`

export const MenuBox =styled.div`
    .ant-menu-vertical{
      border: 0;
    }
    .ant-menu-vertical > .ant-menu-item{
      margin-top: 0;
      height: 30px;
      line-height: 30px;
      margin-bottom: 0;
    }
    .ant-menu-vertical > .ant-menu-item:hover{
      background-color: #e6f7ff;
    }
`
  
  