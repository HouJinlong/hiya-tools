import React from 'react';
import { Tooltip,TooltipProps } from 'antd';
import * as icons from './svgs';
interface Props{
    title:string,
    size?:string,
    icon:keyof typeof icons
    placement?:TooltipProps['placement']
}
export const  IconWidget = (props:Props)=>{
    const size = props.size||'20px'
    return (
        <Tooltip title={props.title} placement={props.placement}>
            <svg
                viewBox="0 0 1024 1024"
                height={size}
                width={size}
                fill="currentColor"
                focusable="false"
                aria-hidden="true"
            >
                {icons[props.icon]}
            </svg>
        </Tooltip>
    )
}