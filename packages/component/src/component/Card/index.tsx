import React, { FC,  ReactChild } from 'react';
export interface CardProps{
  children?: ReactChild;
  style: React.CSSProperties
}
export const CardDefaultStyle:CardProps['style'] = {
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

export const Card: FC<CardProps> = ({ children,style}) => {
  return <div style={{
    ...CardDefaultStyle,
    ...style,
  }}>
      {children}
    </div>;
};
