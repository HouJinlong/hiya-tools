import React, { FC,  ReactChild } from 'react';
export interface Props{
  children?: ReactChild;
  style: React.CSSProperties
}
export const DefaultStyle:Props['style'] = {
  // 固定样式
  display:'flex',
  flexWrap:'wrap',
  justifyContent:'flex-start',
  alignContent: 'flex-start',
  boxSizing:'border-box',
  //可调整样式 
  width:'100%',
  height:'100%',
}

export const Card: FC<Props> = ({ children,style}) => {
  return <div style={{
    ...DefaultStyle,
    ...style,
  }}>
      {children}
    </div>;
};
