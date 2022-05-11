import React, { FC,  ReactChild } from 'react';
import { ComponentType } from '../../Editor/EditorContext';
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
  return <div className='ToyBricks-Card' style={{
    ...CardDefaultStyle,
    ...style,
  }}>
      {children}
    </div>;
};



export const CardComponent:ComponentType = {
  name: '布局组件',
  icon:'https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2022-04-21/Card.png',
  Component: Card,
  schema: {
    type: 'object',
    required: [],
    properties: {
      style: {
        type: 'object',
        title: '样式',
      },
    },
  },
  uiSchema: {
    style: {
      'ui:field': 'StyleSetter',
    },
  },
  formData: {
    style: CardDefaultStyle,
  },
  getConfig: () => {
    return {
      children: {},
    };
  }
}