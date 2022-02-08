import { styled } from '@stitches/react';

export const Box = styled('div', {
  display: 'flex',
  height: '100%',
});
export const EditBox = styled('div', {
//   flex: '1',
  width: '455px',
  height: '780px',
  background: 'no-repeat 0 0 / 100% auto',
  padding: '68px 47px 10px 47px',
  boxSizing:'border-box',
  margin:'0 auto'
});
export const EditBoxIframe = styled('iframe', {
  width: '100%',
  height: '640px',
  display: 'block',
  border: '0',
});

export const scrollBox= styled('div', {
  height:'100%',
  '>.ant-card':{
    height:"100%",
    display: "flex",
    flexDirection: 'column',
    '>.ant-card-body':{
      flex: 1,
      overflow: 'auto',
    }
  }
});