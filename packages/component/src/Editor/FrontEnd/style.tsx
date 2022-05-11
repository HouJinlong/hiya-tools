
import styled from "styled-components"
export const ActionBox =styled.div`
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    pointer-events:none;
    z-index: 99999;
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
    box-sizing:border-box;
    opacity: .8;
    border:3px dashed red;
    pointer-events:none;
`
