import React, { useEffect, useState,ReactChild} from 'react';
import { ComponentType } from '../../Editor/EditorContext';
export interface TabProps {
  tabIndex: string;
  children:{
    [key in TabProps['tabIndex']]:ReactChild
  },
  TabsStyle:React.CSSProperties
  TabsItemStyle:React.CSSProperties
  TabsItemActiveIsEqually:boolean
  TabsItemActiveStyle?:React.CSSProperties
  TabsAndStyles?:Array<{text:string,ActiveStyle:React.CSSProperties}>
}
export function Tab(props: TabProps) {
 
  const [tabIndex, setTabIndex] = useState(props.tabIndex);
  useEffect(() => {
    setTabIndex(props.tabIndex);
  }, [props.tabIndex]);
  
  return (
    <>
      <div className='ToyBricks-Tab' style={{
        display:'flex',
        alignItems:'center',
        transform: 'translate3d(0, 0, 0)',
        ...props.TabsStyle,
      }}>
        {
          (props.TabsAndStyles||[]).map((v, _i) => {
            const i = String(_i)
            return (
              <div
                className='ToyBricks-Tab-Item'
                key={i}
                onClick={() => {
                  setTabIndex(i)
                }}
                style={{
                  flexShrink: 0,
                  boxSizing:'border-box',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  ...props.TabsItemStyle,
                  ...Object(tabIndex === i ?{
                    ...props.TabsItemActiveStyle,
                    ...v.ActiveStyle
                  }:{
                  })
                }}
              >
                {v.text}
              </div>
            );
          })
        }
      </div>
      {props.children[tabIndex]}
    </>
  );
}

export const TabComponent:ComponentType = {
  Component:Tab,
  name: '选项卡',
  icon:'http://img01.mehiya.com/img/png/id/50721838421',
  hide:true,
  schema: {
    type: 'object',
    required: ['tabIndex'],
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
      },
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
  getConfig: (data) => {
    let children = {
      all:{},
      current:data.formData.tabIndex
    }
    if(data.formData.TabsAndStyles){
      data.formData.TabsAndStyles.forEach((v,i)=>{
        children.all[i] = v.text
      })
    }
    return {
      children,
    };
  },
}