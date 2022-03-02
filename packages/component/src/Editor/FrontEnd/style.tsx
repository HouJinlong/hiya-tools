
import styled from "styled-components"
export const ActionBox =styled.div`
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    pointer-events:none;
`;
export const Box = styled.div`
    position:absolute;
`;

export const BoxActive = styled.div`
    position:absolute;
    top:0;
    left:0;
    z-index:1;
    width:100%;
    height:100%;
    // background:rgba(255;0;0;.2);
    box-sizing:border-box;
    border:3px dashed red;
    pointer-events:none;
`

export const OperationBox =  styled.div`
    display: flex;
    position:absolute;
    left: 50%;
    transform:translateX(-50%);
    z-index:2;
    pointer-events:all;
`


export const OperationBoxItem = styled.div`
    width:30px;
    height:30px;
    display:flex;
    align-items:center;
    justify-content:center;
    border: 1px solid red;
    cursor:pointer;
    background:#fff;
    opacity:.8;
    &:hover{
        opacity:1
    };
    svg{
        width:20px;
        height:20px
    }
`