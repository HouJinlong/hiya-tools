
import styled from "styled-components";
export const Box = styled.div`
    display:flex;
    .ant-collapse{
        width:100%;
    };
    .ant-collapse > .ant-collapse-item > .ant-collapse-header{
        padding:0;
        width:100%;
        >div:last-of-type{
            width:100%;
        }
    }
    .ant-collapse-arrow{
        position:absolute;
        top:9px;
    };
    .ant-form-item-label{
        padding-left:16px;
    };
    .ant-collapse-ghost > .ant-collapse-item > .ant-collapse-content{
        margin-bottom: 24px;
    }
    .ant-collapse-ghost > .ant-collapse-item > .ant-collapse-content > .ant-collapse-content-box{
        padding:0;
    }
`

export const Wrap =  styled.div`
    display:flex;
    background:#ebebeb;
    padding:10px 5px;
    flex-wrap:wrap;
    justify-content:space-between;
    height: 90px;
    align-content:space-between;
`

export const Item = styled.div`
    width:48%;
    display:flex;
    align-items:center;
    svg{
        flex-shrink:0;
        margin-right:2px
    }
`