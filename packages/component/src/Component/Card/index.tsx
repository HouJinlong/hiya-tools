import React, { FC, ReactChild } from 'react';
import { ComponentType } from '../../Editor/EditorContext';
import { useRenderViewContext } from '../../Editor/RenderView';
export interface CardProps {
  children?: ReactChild;
  style: React.CSSProperties;
}
export const CardDefaultStyle: CardProps['style'] = {
  // 固定样式
  display: 'flex',
  flexWrap: 'nowrap',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  alignContent: 'flex-start',
  boxSizing: 'border-box',
  //可调整样式
  width: '100%',
  height: '100%',
};

export const Card: FC<CardProps> = ({ children, style }) => {
  const {
    AutoHost: { replaceAutoHostStyle },
  } = useRenderViewContext();
  return (
    <div
      className="ToyBricks-Card"
      style={{
        ...CardDefaultStyle,
        ...replaceAutoHostStyle(style),
      }}
    >
      {children}
    </div>
  );
};

export const CardComponent: ComponentType = {
  name: '布局组件',
  icon: 'http://img01.mehiya.com/img/png/id/50721837186',
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
  },
};
