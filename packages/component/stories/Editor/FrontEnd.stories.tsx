import React, { useContext } from 'react';
import { Meta, Story } from '@storybook/react';
import { FrontEnd } from '../../src/Editor/FrontEnd/index';
import { getComponents } from '../../src/Editor/tool';
import * as  Component from '../../src/Component';
import { RenderViewContext } from '../../src/Editor/RenderView';
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

const Warp = ({children})=>{
  const data = useContext(RenderViewContext)
  console.log('Warp',data);
  return <div style={{color:'red'}}>{children}</div>
}
Default.args = {
  Components: {
    Card:getComponents({
      Components:Component.Card,
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
          style:Component.CardDefaultStyle
        },
        children:true
      }
    }),
    Image: getComponents({
      Components:Component.Image,
      config:{
        name: '图片组件',
        preview:
          'http://static.ixiaochuan.cn/hiya-version_test/c57fbd56c2c08328f7bb.png',
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
        uiSchema:{
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
        formData:Component.ImageDefaultProps
      }
    }),
    Text:getComponents({
      Components:Component.Text,
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
      Components:Component.Tab,
      config:{
        name: '选项卡',
        preview:
          'http://static.ixiaochuan.cn/hiya-version_test/c57fbd56c2c08328f7bb.png',
        schema: {
          type: 'object',
          required: [ 'tabIndex'],
          properties: {
            tabIndex: {
              title: '默认显示第几个选项卡',
              type: 'string',
              default: '0',
            },
            TabsStyle: {
              type: 'object',
              title: '选项卡样式',
            },
            TabsItemStyle: {
              type: 'object',
              title: '选项卡项正常样式',
            },
            TabsItemActiveStyle: {
              type: 'object',
              title: '选项卡项选中样式',
            },
            TabsAndStyles: {
              type: 'array',
              title: '选项卡项',
              items: {
                type: 'object',
                properties: {
                  text: {
                    title: '文案',
                    type: 'string',
                  },
                  ActiveStyle: {
                    title: '选中时样式',
                    type: 'string',
                  },
                },
              },
            }
          },
        },
        uiSchema: {
          TabsStyle: {
            'ui:field': 'StyleSetter',
          },
          TabsItemStyle: {
            'ui:field': 'StyleSetter',
          },
          TabsItemActiveStyle: {
            'ui:field': 'StyleSetter',
          },
          TabsAndStyles: {
            items: {
              ActiveStyle: {
                'ui:field': 'StyleSetter',
              },
            },
          },
        },
        formData: {},
        getConfig : ((data) => {
          return {
            children: {
              deep: data.formData.tabIndex,
              getName:  (e) => {
                return data.formData.TabsAndStyles[e].text
              },
            },
          }
        }).toString(),
      }
    }),
    CustomComponent:getComponents({
      Components:Component.CustomComponent,
      config:{
        name: '自定义组件',
        getConfig : ((data) => {
          console.log('data: ', data);
          return {
            schema: {
              type: 'object',
              required: [],
              properties: {
                CustomComponentKey: {
                  type:'string',
                  title: '自定义组件',
                }
              }
            },
            uiSchema: {
              CustomComponentKey: {
                'ui:field': 'Select',
                'ui:options':{
                  labels: data.CustomComponents,
                  showSearch:true,
                  filterOption:(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  
                }
              }
            },
          }
        }).toString(),
        formData: {},
      }
    })
  }, 
  CustomComponents:{
    Test:{
      name:'测试组件',
      Component:()=><div>测试组件</div>
    },
    Alert:{
      name:'弹框组件',
      Component:()=><div>弹框组件</div>
    }
  }, 
  Warp
};