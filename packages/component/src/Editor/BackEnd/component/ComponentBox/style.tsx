import { styled } from '@stitches/react';

export const ComponentBox = styled('div', {
  display:'flex',
  justifyContent:'space-between',
  flexWrap:'wrap'
});
export const ComponentBoxItem = styled('div', {
  width: '80px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  textAlign: 'center',
  cursor: 'pointer',
  marginBottom:'10px'
});
export const ComponentBoxImg = styled('img', {
  width: '100%',
  height: '60px',
  display: 'block',
});
