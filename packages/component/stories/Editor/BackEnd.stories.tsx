import React from 'react';
import { Meta, Story } from '@storybook/react';
import { BackEnd,BackEndPropsType } from '../../src/Editor/BackEnd/index';
import { useRef, useState } from '@storybook/addons';

const meta: Meta = {
  title: 'Editor/BackEnd',
  component: BackEnd,
  argTypes: {
  },
  parameters: {
    // controls: { expanded: true },
  },
};

export default meta;

const Template: Story<BackEndPropsType> = args =>{
    const [config,SetConfig]=useState({
        s:1,
    })
    const [data,setData] = useState({
        "components": {
            
        },
        "layout": [
            
        ]
      })
    return <div style={{margin:'-1rem',height:'100vh'}}><BackEnd ToolBoxSlot={<div onClick={()=>{
        SetConfig(()=>{
                return {
                    s:config.s+1
                }
            })
        }}>{config.s}</div>} {...args} data={data} customData={config} /></div>
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  'iframe':`http://127.0.0.1:6006/iframe.html?id=editor-frontend--default&args=&viewMode=story`,
  onSave:(e)=>{
    console.log('e: ', e);
  },
  onView:()=>{
      return '测试预览'
  }
};