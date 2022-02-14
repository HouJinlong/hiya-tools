import React from 'react'
export interface ImageProps{
  src: string;
}
export function Image(props:ImageProps) {
  return (
    <img
      src={props.src}
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        display: 'block'
      }}
      alt=""
    />
  )
}