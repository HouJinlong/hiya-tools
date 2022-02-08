import { styled } from '@stitches/react';
export const ActionBox = styled('div', {
    position:'absolute',
    top:'0',
    left:'0',
    width:'100%',
    height:'100%',
    pointerEvents:'none'
});
export const Box = styled('div', {
    position:'absolute',
});

export const BoxActive = styled('div', {
    position:"absolute",
    top:'0',
    left:0,
    zIndex:1,
    width:'100%',
    height:'100%',
    // background:'rgba(255,0,0,.2)',
    boxSizing:'border-box',
    border:"3px dashed red",
    pointerEvents:"none"   
});

export const OperationBox = styled('div', {
    position:'absolute',
    right:0,
    top:'50%',
    transform:'translateY(-50%)',
    zIndex:2,
    pointerEvents:'all'
});


export const OperationBoxItem = styled('div', {
    width:'40px',
    height:'40px',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    cursor:'pointer',
    background:'#fff',
    opacity:.8,
    '&:hover':{
        opacity:1
    },
    'svg':{
        width:'20px',
        height:'20px'
    }
});