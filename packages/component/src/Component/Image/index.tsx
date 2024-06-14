import React from 'react'
import { ComponentType } from '../../Editor/EditorContext';
import { useRenderViewContext } from '../../Editor/RenderView';
export interface ImageProps{
  width:string,
  height:string,
  src: string;
}
export const ImageDefaultProps={
  width:'100%',
  height:'inherit',
  src: 'http://static.ixiaochuan.cn/hiya-version_test/c57fbd56c2c08328f7bb.png'
}
export function Image(props:ImageProps) {
  const {AutoHost:{replaceAutoHost}} = useRenderViewContext()
  const {src,...style} = props
  return (
    <img
      className='ToyBricks-Image'
      src={replaceAutoHost(props.src)}
      style={{
        ...style,
        display: 'block'
      }}
      alt=""
    />
  )
}

export const ImageComponent:ComponentType = {
  name: '图片组件',
  icon:'http://img01.mehiya.com/img/png/id/50721838173',
  Component: Image,
  schema: {
    type: 'object',
    required: ['src'],
    properties: {
      width: {
        type: 'string',
        title: '宽度',
      },
      height: {
        type: 'string',
        title: '高度',
      },
      src: {
        type: 'string',
        title: '图片地址',
      },
    },
  },
  uiSchema: {
    width: {
      'ui:widget': 'SizeInput',
    },
    height: {
      'ui:widget': 'SizeInput',
    },
    src: {
      'ui:widget': 'ImageInput',
    },
  },
  formData:ImageDefaultProps,
}