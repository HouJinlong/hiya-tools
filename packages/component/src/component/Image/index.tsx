import React from 'react'
export interface Props{
  src: string;
}
export function Index(props:Props) {
  return (
    <img
      src={props.src}
      style={{
        maxWidth: "100%",
        maxHeight: "100%"
      }}
      alt=""
    />
  )
}