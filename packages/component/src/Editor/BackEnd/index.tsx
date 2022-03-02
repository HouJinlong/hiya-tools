import React, { useRef, useState, useEffect } from 'react';
import { Layout, Card, Button } from 'antd';

import 'antd/dist/antd.css';
import { useEditorContext, EditorContext } from '../EditorContext';
import * as Style from './style';

import { ComponentBox } from './component/ComponentBox';
import { AttributeBox } from './component/AttributeBox';
import { TreeBox } from './component/TreeBox';
import { ToolBox } from './component/ToolBox';
import { HistoryBox } from './component/HistoryBox';
import { IconWidget } from '../../IconWidget';
export interface BackEndPropsType {
  iframe: string;
  data: any;
  onSave: any;
  customData:any;
  onView:any;
  UploadProps:any
  ToolBoxSlot:any
}
const leftSiderButton = {
  Component: {
    title: '组件',
    Component: ComponentBox,
  },
  Outline: {
    title: '结构',
    Component:TreeBox,
  },
  History: {
    title: '修改历史',
    Component:HistoryBox,
  },
};
const leftSiderButtonKeys = Object.keys(
  leftSiderButton
) as (keyof typeof leftSiderButton)[];
export function BackEnd(props: BackEndPropsType) {
  const iframe = useRef<HTMLIFrameElement>(null);
  const data = useEditorContext(iframe);
  const {publisher,editDataHistory,setGlobalDataSync} = data
  const [isInit,setIsInit] = useState(0)
  useEffect(()=>{
    const fn = ()=>{
      if(editDataHistory.index){
        setGlobalDataSync('editData',()=>{
          return JSON.parse(editDataHistory.data[editDataHistory.index-1].data)
        })
      }else{
        setGlobalDataSync('editData',(pre:any)=>{
          return {
            ...pre,
            ...props.data,
            type:'初始化'
          }
        })
      }
      setGlobalDataSync('copyStr',(pre:any)=>{
        return pre
      })
      setIsInit((e)=>e+1)
    }
    
    publisher.subscribe(fn,'init')
    return ()=>{
      publisher.unsubscribe(fn,'init')
    }
  },[editDataHistory])
  useEffect(()=>{
    if(isInit){
      setGlobalDataSync('customData',()=>{
        return props.customData
      })
    }
  },[isInit,props.customData])
  const [leftSider, setLeftSider] = useState(leftSiderButtonKeys[0]);
  return (
    <EditorContext.Provider value={data}>
      <Layout
        style={{
          height: '100%',
        }}
      >
        <Layout.Sider theme="light">
          <Style.scrollBox>
            <Card title={leftSiderButton[leftSider].title} size="small">
              {(()=>{
                const Component = leftSiderButton[leftSider].Component
                return <Component {...(props as any)}></Component>
              })()}
            </Card>
          </Style.scrollBox>
        </Layout.Sider>
        <Layout.Sider theme="light" width="40">
          {leftSiderButtonKeys.map((v) => {
            return (
              <Button
                key={v}
                type={v === leftSider ? 'primary' : 'default'}
                size="large"
                icon={
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconWidget
                      title={leftSiderButton[v].title}
                      icon={v}
                      placement="right"
                    ></IconWidget>
                  </div>
                }
                onClick={() => {
                  setLeftSider(v);
                }}
              />
            );
          })}
        </Layout.Sider>
        <Layout.Content
          style={{ overflow: 'auto', display: 'flex', flexDirection: 'column' }}
        >
          <ToolBox {...props}></ToolBox>
          <Style.EditBox
            style={
              {
                // backgroundImage: `url(${phonePng})`,
              }
            }
          >
              <Style.EditBoxIframe
                ref={iframe}
                src={props.iframe}
              ></Style.EditBoxIframe>
          </Style.EditBox>
        </Layout.Content>
        <Layout.Sider theme="light" width="300">
          <Style.scrollBox>
            <Card title="属性编辑区" size="small">
              <AttributeBox {...props} />
            </Card>
          </Style.scrollBox>
        </Layout.Sider>
      </Layout>
    </EditorContext.Provider>
  );
}
