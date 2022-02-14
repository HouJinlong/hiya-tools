import React, { FC } from 'react';

export interface TextProps{
  text:string;
  style: React.CSSProperties
}
export const Text: FC<TextProps> = ({ text,style}) => {
  return <div style={{
    ...style,
  }}>
      {text}
    </div>;
};

