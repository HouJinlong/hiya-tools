import React, { FC } from 'react';

export interface Props{
  text:string;
  style: React.CSSProperties
}
export const Index: FC<Props> = ({ text,style}) => {
  return <div style={{
    ...style,
  }}>
      {text}
    </div>;
};

