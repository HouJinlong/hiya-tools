import React from 'react';
import { Meta, Story } from '@storybook/react';
import { BackEnd,BackEndPropsType } from '../../src/Editor/BackEnd/index';

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

const Template: Story<BackEndPropsType> = args => <div style={{margin:'-1rem',height:'100vh'}}><BackEnd {...args} /></div>;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  'iframe':`${window.location.origin}/iframe.html?id=editor-frontend--default&args=&viewMode=story`,
  data:{
    "components": {
        "9021843e-500d-469b-9586-4772ddf32fb2": {
            "id": "9021843e-500d-469b-9586-4772ddf32fb2",
            "formData": {
                "src": "http://static.ixiaochuan.cn/hiya-version_test/c57fbd56c2c08328f7bb.png"
            },
            "key": "Image"
        },
        "8b29914f-7e0a-40c5-84a0-b4261c61e040": {
            "id": "8b29914f-7e0a-40c5-84a0-b4261c61e040",
            "formData": {
                "text": "占位文本",
                "style": {}
            },
            "key": "Text"
        },
        "133a347f-98ba-4c77-8967-6160a1c9d3db": {
            "id": "133a347f-98ba-4c77-8967-6160a1c9d3db",
            "formData": {
                "tab": [
                    "选项卡1",
                    "选项卡2"
                ],
                "tabIndex": 0,
                "TabsStyle": {},
                "TabsItemStyle": {},
                "TabsItemActiveStyle": {}
            },
            "key": "Tab"
        }
    },
    "layout": [
        {
            "key": "9021843e-500d-469b-9586-4772ddf32fb2",
            "children": []
        },
        {
            "key": "8b29914f-7e0a-40c5-84a0-b4261c61e040",
            "children": []
        },
        {
            "key": "133a347f-98ba-4c77-8967-6160a1c9d3db",
            "children": []
        }
    ]
  },
  onSave:(e)=>{
    console.log('e: ', e);
  },
  onView:()=>{
      return '测试预览'
  }
};