import React, { useEffect, useState,ReactChild} from 'react';
import { ComponentType } from '../../Editor/EditorContext';
import { useRenderViewContext } from '../../Editor/RenderView';
// 新版的tab组件 在原版本的基础为 TabsAndStyles增加了唯一id
export interface TabV1Props {
  tabIndex: string;
  children:{
    [key in string]:ReactChild
  },
  TabsStyle:React.CSSProperties
  TabsItemStyle:React.CSSProperties
  TabsItemActiveIsEqually:boolean
  TabsItemActiveStyle?:React.CSSProperties
  TabsAndStyles?:Array<{text:string,style:React.CSSProperties,ActiveStyle:React.CSSProperties,_id:string}>
}
export function TabV1(props: TabV1Props) {
  const {AutoHost:{replaceAutoHostStyle}} = useRenderViewContext()
  const [tabIndex, setTabIndex] = useState(props.tabIndex);
  useEffect(() => {
    setTabIndex(props.tabIndex);
  }, [props.tabIndex]);
  
  return (
    <>
      <div className='ToyBricks-Tab' style={replaceAutoHostStyle({
        display:'flex',
        alignItems:'center',
        transform: 'translate3d(0, 0, 0)',
        ...props.TabsStyle,
      })}>
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
                style={replaceAutoHostStyle({
                  flexShrink: 0,
                  boxSizing:'border-box',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  ...props.TabsItemStyle,
                  ...v.style,
                  ...Object(tabIndex === i ?{
                    ...props.TabsItemActiveStyle,
                    ...v.ActiveStyle
                  }:{
                  })
                })}
              >
                {v.text}
              </div>
            );
          })
        }
      </div>
      {props.children[
        ((props.TabsAndStyles||[])[Number(tabIndex)]?._id) 
      ]}
    </>
  );
}


export const TabV1Component:ComponentType = {
  Component:TabV1,
  hide:true,
  name: '选项卡',
  icon:'http://img01.mehiya.com/img/png/id/50721838421',
  schema: {
    type: 'object',
    required: ['tabIndex'],
    properties: {
      tabIndex: {
        title: '默认显示第几个选项卡',
        type: 'string',
        default:0,
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
            style: {
              title: '样式',
              type: 'object',
            },
            ActiveStyle: {
              title: '选中时样式',
              type: 'object',
            },
          }
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
        style: {
          'ui:field': 'StyleSetter',
        },
      },
    },
  },
  formData: {
    TabsAndStyles:[
      {
        text:'默认文案'
      },
      {
        text:'默认文案1'
      }
    ]
  },
  getConfig: (data) => {
    let children = {
      all:{},
      current:""
    }
    if(data.formData.TabsAndStyles){
      const isModify = data.formData?._TabsAndStyles?.length=== data.formData.TabsAndStyles.length
      data.formData.TabsAndStyles = data.formData.TabsAndStyles.map((v,i)=>{
        if(!v._id){
          if(isModify){
            // 纯修改
            v._id = data.formData._TabsAndStyles[i]._id
          }else{
            // 添加
            v._id=data.uuid()
          }
        }
        children.all[v._id] = v.text
        if(Number(data.formData.tabIndex) === i){
          children.current = v._id
        }
        // 排序
        return v
      })
      data.formData._TabsAndStyles = data.formData.TabsAndStyles
    }
    return {
      children,
    };
  },
}