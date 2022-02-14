import React from 'react';
import { Meta, Story } from '@storybook/react';
import { FrontEnd } from '../../src/Editor/FrontEnd/index';
import { getComponents } from '../../src/Editor/tool';
import {Card,CardDefaultStyle,Image,Text,Tab} from '../../src/Component';

const meta: Meta = {
  title: 'Editor/FrontEnd',
  component: FrontEnd,
  argTypes: {},
  parameters: {
    // controls: { expanded: true },
  },
};

export default meta;

const Template: Story<any> = (args) => <div style={{margin:'-1rem'}}><FrontEnd {...args} /></div>;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  Components: {
    Card:getComponents({
      Components:Card,
      config:{
        name: '布局组件',
        preview:'http://static.ixiaochuan.cn/hiya-version_test/c57fbd56c2c08328f7bb.png',
        schema: {
          type: 'object',
          required: [],
          properties: {
            style:{
              type:'object',
              title:'样式'
            }
          },
        },
        uiSchema:{
          "style":{
            "ui:field": "StyleSetter"
          }
        },
        formData:{
          style:CardDefaultStyle
        },
        children:true
      }
    }),
    Image: getComponents({
      Components:Image,
      config:{
        name: '图片组件',
        preview:
          'http://static.ixiaochuan.cn/hiya-version_test/c57fbd56c2c08328f7bb.png',
         schema: {
          type: 'object',
          required: ['src'],
          properties: {
            src: {
              type: 'string',
              title: '图片地址',
              default:
                'http://static.ixiaochuan.cn/hiya-version_test/c57fbd56c2c08328f7bb.png',
            },
          },
        },
      }
    }),
    Text:getComponents({
      Components:Text,
      config:{
        name: '文本组件',
        preview:
          'http://static.ixiaochuan.cn/hiya-version_test/c57fbd56c2c08328f7bb.png',
          schema: {
          type: 'object',
          required: ['text'],
          properties: {
            text: {
              type: 'string',
              title: '文本',
              default:'占位文本',
            },
            style:{
              type:'object',
              title:'文字样式'
            },
          },
        },
        uiSchema:{
          "style":{
            "ui:field": "StyleSetter"
          },
          "text":{
            "ui:widget": "textarea"
          }
        },
      }
    }),
    Tab:getComponents({
      Components:Tab,
      config:{
        name: '选项卡',
        preview:
          'http://static.ixiaochuan.cn/hiya-version_test/c57fbd56c2c08328f7bb.png',
          schema: {
          type: 'object',
          required: ['tab','tabIndex'],
          properties: {
            "tab": {
              "type": "array",
              "title": "选项卡文案",
              "items": {
                "type": "string",
              },
            },
            "tabIndex": {
              "title": "默认显示第几个选项卡",
              "type": "number",
               default:0,
            },
            TabsStyle:{
              type:'object',
              title:'选项卡样式'
            },
            TabsItemStyle:{
              type:'object',
              title:'选项卡正常样式'
            },
            TabsItemActiveStyle:{
              type:'object',
              title:'选项卡选中样式'
            }
          },
        },
        uiSchema:{
          "TabsStyle":{
            "ui:field": "StyleSetter"
          },
          "TabsItemStyle":{
            "ui:field": "StyleSetter"
          },
          "TabsItemActiveStyle":{
            "ui:field": "StyleSetter"
          }
        },
        formData:{
          tab:[
            "选项卡1",
            "选项卡2"
          ]
        },
        children:{
          deep:'tabIndex',
          getName:'return data.formData.tab[data.deep]'
        }
      }
    })
  },   
};

