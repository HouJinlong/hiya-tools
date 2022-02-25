import React, { FC } from 'react';

export interface TextProps{
  text:string;
  style: React.CSSProperties
}
export const Text: FC<TextProps> = ({ text,style}) => {
  return <div className='ToyBricks-Text' style={{
    display: 'flex',
    ...style,
  }}>
      {text}
    </div>;
};

