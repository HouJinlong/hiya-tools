import React from 'react'
export interface ImageProps{
  width:string,
  height:string,
  src: string;
}
export const ImageDefaultProps={
  width:'100%',
  height:'auto',
  src: 'http://static.ixiaochuan.cn/hiya-version_test/c57fbd56c2c08328f7bb.png'
}
export function Image(props:ImageProps) {
  const {src,...style} = props
  return (
    <img
      className='ToyBricks-Image'
      src={props.src}
      style={{
        ...style,
        display: 'block'
      }}
      alt=""
    />
  )
}