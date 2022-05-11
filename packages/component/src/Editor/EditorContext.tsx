import React, { useEffect, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { FrontEndPropsType } from './FrontEnd';
import { BackEndPropsType } from './BackEnd';
import {
  useEditDataReducer,
  EditDataType,
  getComponentInfoById,
  EditDataInitialState
} from './useEditData';
//---- 公共
type MessageEvent<T> = {
  data:T
}
// 消息类型
interface PostMessageData<T> {
  type: T;
  data: any;
}
interface PostMessageType<T> {
  (data: PostMessageData<T>): void;
}

// 组件类型
export interface ComponentBaseType {
  name: string;
  Component: React.ComponentType<any>;
}
export interface ComponentType extends ComponentBaseType {
  icon?:string;
  schema?: any;
  uiSchema?: any;
  formData?: any;
  children?: {
    all?: {
      [key in string]: string;
    };
    current?: string;
  };
  getConfig?: (
    data: any
  ) => Pick<ComponentType, 'schema' | 'uiSchema' | 'children'>;
}
//---- 后台编辑
enum BackEndPostMessageType {
  // 告诉前台编辑器自己的origin 建立通信
  init = 'init',
  syncEditDataState = 'EditDataState',
}
export function useBackEndEditorContext(
  iframe: React.RefObject<HTMLIFrameElement>,
  data: BackEndPropsType
) {
  const [postMessage, setPostMessage] =
    useState<PostMessageType<BackEndPostMessageType>>();
  // iframe加载完，通知它进行通信初始化
  useEffect(() => {
    if (postMessage) {
      postMessage({
        type: BackEndPostMessageType.init,
        data: window.location.origin,
      });
    }
  }, [postMessage]);
  //---- 数据
  // 编辑数据
  const [EditDataState, EditDataDispatch] = useEditDataReducer({
    ...data.defaultData,
    type:{
      id:uuid(),
      text:'初始化'
    }
  });
  // 设置prop中的EditDataStateOther
  useEffect(() => {
    EditDataDispatch({ type: 'other', data: data.EditDataStateOther })
  }, [EditDataDispatch, data.EditDataStateOther]);
  // 数据同步 到编辑页面
  useEffect(() => {
    if (postMessage) {
      postMessage({
        type: BackEndPostMessageType.syncEditDataState,
        data: EditDataState,
      });
    }
  }, [postMessage, EditDataState]);
  // 编辑历史 
  const [EditDataHistory,setEditDataHistory] = useState<{
    data:Array<{
      type:NonNullable<EditDataType['type']>,
      data:string
    }>,
    index:number
  }>({
    data:[],
    index:0,
  })
  useEffect(()=>{
    const {type,select,components,layout} =EditDataState
    if(type){
      let _type = type
      setEditDataHistory((v)=>{
        if(!v.data.length||v.data[v.data.length-1].type.id!== _type.id){
          const _data = [
            ...v.data.slice(0,v.index),
            {
              data:JSON.stringify({select,components,layout}),
              type
            }
          ]
          return {
            data:_data,
            index:_data.length
          }
        }else{
          return v
        }
      })
    }
  },[EditDataState])

  const selectInfo = useMemo(() => {
    return getComponentInfoById({
      EditDataState,
      id: EditDataState.select,
    });
  }, [EditDataState]);
  
  //---- 通信
  useEffect(() => {
    const fn = (
      event: MessageEvent<PostMessageData<FrontEndPostMessageType>>
    ) => {
      const temp = {
        [FrontEndPostMessageType.sync]: () => {
          EditDataDispatch(event.data.data);
        },
      }[event.data.type];
      if (temp) {
        console.log('BackEnd', '<--', event.data);
        temp();
      }
    };
    window.addEventListener('message', fn, false);
    if (iframe.current) {
      const iframeEl = iframe.current;
      iframeEl.onload = () => {
        setPostMessage(() => (data: any) => {
          console.log('BackEnd', '-->', data);
          iframeEl.contentWindow?.postMessage(
            data,
            new URL(iframeEl.src).origin
          );
        });
      };
    }
    return () => {
      window.removeEventListener('message', fn, false);
    };
  }, [iframe.current]);

  return {
    selectInfo,
    EditDataState,
    EditDataDispatch,
    EditDataHistory,
    setEditDataHistory
  };
}
export const BackEndEditorContext = React.createContext<
  ReturnType<typeof useBackEndEditorContext>
>({} as any);
//---- 前台编辑
export enum FrontEndPostMessageType {
  sync = 'sync',
}
export function useFrontEndEditorContext(data: FrontEndPropsType) {
  // 通信
  const [postMessage, setPostMessage] =
    useState<PostMessageType<FrontEndPostMessageType>>();
  // 传送 组件数据 
  useEffect(() => {
    if (postMessage) {
      const ComponentsInfo: EditDataType['ComponentsInfo'] = Object.entries(
        data.Components
      ).map((v) => {
        const { Component, getConfig, ...other } = v[1];
        return {
          key: v[0],
          ...other,
          getConfig: getConfig ? getConfig.toString() : undefined,
        };
      });
      postMessage({
        type: FrontEndPostMessageType.sync,
        data: { type: 'ComponentsInfo', data: ComponentsInfo },
      });
    }
  }, [postMessage, data.Components]);
  // 传送 EditDataStateOther
  useEffect(() => {
    if (postMessage) {
      postMessage({
        type: FrontEndPostMessageType.sync,
        data: { type: 'other', data: data.EditDataStateOther },
      });
    }
  }, [postMessage, data.EditDataStateOther]);
  //  接收同步过来的 EditDataState
  const [EditDataState, setEditDataState] = useState<EditDataType>(EditDataInitialState());
  // --- 通信
  useEffect(() => {
    const fn = (
      event: MessageEvent<PostMessageData<BackEndPostMessageType>>
    ) => {
      const temp = {
        [BackEndPostMessageType.init]: () => {
          setPostMessage(() => (data: any) => {
            console.log('FrontEnd', '-->', data);
            window.parent.postMessage(data, event.data.data);
          });
        },
        [BackEndPostMessageType.syncEditDataState]: () => {
          setEditDataState(() => event.data.data);
        },
      }[event.data.type];
      if (temp) {
        console.log('FrontEnd', '<--', event.data);
        temp();
      }
    };
    window.addEventListener('message', fn, false);
    return () => {
      window.removeEventListener('message', fn, false);
    };
  }, []);

  return {
    EditDataState,
    postMessage,
  };
}
export const FrontEndEditorContext = React.createContext<
  ReturnType<typeof useFrontEndEditorContext>
>({} as any);


