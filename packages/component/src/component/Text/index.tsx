import React, { FC } from 'react';
import { ComponentType } from '../../Editor/EditorContext';
export interface TextProps {
  text: string;
  style: React.CSSProperties;
}
export const Text: FC<TextProps> = ({ text, style }) => {
  return (
    <div
      className="ToyBricks-Text"
      style={{
        display: 'flex',
        ...style,
      }}
    >
      {text}
    </div>
  );
};
export const TextComponent:ComponentType = {
  Component:Text,
  name: '文本组件',
  icon:'https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2022-04-21/Text.png',
  schema: {
    type: 'object',
    required: ['text'],
    properties: {
      text: {
        type: 'string',
        title: '文本',
        default: '占位文本',
      },
      style: {
        type: 'object',
        title: '文字样式',
      },
    },
  },
  uiSchema: {
    style: {
      'ui:field': 'StyleSetter',
    },
    text: {
      'ui:widget': 'textarea',
    },
  },
}
export default Text