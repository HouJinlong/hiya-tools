import React, { useMemo,useEffect, useRef, useState, useCallback  } from 'react';
import { v4 as uuid } from 'uuid';

export interface ComponentType {
  key: string;
  name: string;
  preview: string;
  schema: any;
  uiSchema?: any;
  formData?: any;
  children?:{
    deep:string,
    getName?:string
  }
}

export enum BackEndMessageTypeEnum {
  init = 'init',
}
export enum PublicMessageTypeEnum {
  setGlobalData = 'setGlobalData',
}
export interface MessageType {
  onMessage: {
    [key in any]: (data: any) => void;
  };
  postMessage?: (data: any) => void;
}
export interface ComponentsItemType extends Pick<ComponentType,'key'|'formData'> {
  id: string;
}
export interface EditDataType {
  //  组件列表
  components: {
    [key in ComponentsItemType['id']]: ComponentsItemType;
  };
  //  组件渲染顺序与包含关系
  layout: {
    key:ComponentsItemType['id'];
    children:EditDataType['layout']
  }[];
}
export interface GlobalData {
  components: {
    [key in ComponentType['key']]:ComponentType
  };
  editData: EditDataType;
  selectComponentId: ComponentsItemType['id'];
}
interface SetGlobalDataSyncType {
  (fn: (data: GlobalData) => Partial<GlobalData>): void;
}



export function deepLayout<T extends any[]>(
  layout:T,
  fn:(data:{
    item:T[number];
    i:number;
    layout:T;
    path:T[number][]
  })=>any,
  path:T[number][] = []
){
  for (let i = 0; i < layout.length; i++) {
    let _path = [layout[i],...path]
    if(fn({item:layout[i],i,layout,path:_path})){
      return
    }else{
      deepLayout(layout[i]?.children||[], fn,_path);
    }
  }
}
export function useMessageRef(
  iframe: React.RefObject<HTMLIFrameElement>
) {
  // 全局数据
  const [GlobalData, setGlobalData] = useState<GlobalData>({
    components:{},
    editData:{
      components: {},
      layout: []
    },
    selectComponentId:''
  });
  useEffect(()=>{
    console.log("编辑");
  },[GlobalData.editData])
  const getComponent = useCallback((id)=>{
   const editComponent = GlobalData.editData.components[id]
    if(editComponent){
      return {
        component:GlobalData.components[editComponent.key],
        editComponent
      }
    }else{
      return null
    }
  },[GlobalData])
  // 正在编辑的 组件
  const select = useMemo(()=>{
    return getComponent(GlobalData.selectComponentId)
  },[GlobalData.selectComponentId,getComponent])
  // iframe 消息通信
  const message = useRef<MessageType>({
    onMessage:{}
  } as MessageType);
  useEffect(() => {
    window.addEventListener(
      'message',
      (event) => {
        if (event.data.type) {
          let type:any;
          if (iframe.current) {
            type = 'BackEnd';
          } else {
            if(event.data.type===BackEndMessageTypeEnum.init){
              // FrontEnd 初始化
              message.current.postMessage = (data: any) => {
                console.log('FrontEnd','-->',data.type,data.data);
                window.parent.postMessage(data, event.data.data);
              };
            }
            type = 'FrontEnd';
          }
          console.log(type,'<--',event.data.type,event.data.data);
          if (event.data.type === PublicMessageTypeEnum.setGlobalData) {
            setGlobalData((pre) => {
              return Object.assign({},pre,event.data.data);
            });
          }
          message.current.onMessage[event.data.type] &&
            message.current.onMessage[event.data.type](event.data.data);
        }
      },
      false
    );
    if (iframe.current) {
      const iframeEl = iframe.current
      // BackEnd 初始化
      iframeEl.onload = () => {
        message.current.postMessage = (data: any) => {
          console.log('BackEnd','-->',data.type,data.data);
          iframeEl.contentWindow?.postMessage(
            data,
            new URL(iframeEl.src).origin
          );
        };
        message.current.postMessage({
          type: BackEndMessageTypeEnum.init,
          data: window.location.origin,
        });
      };
    } 
  }, [iframe.current]);
  // 带通信同步的修改全局数据方法
  const setGlobalDataSync = useCallback<SetGlobalDataSyncType>((fn) => {
    setGlobalData((pre) => {
      const _pre = fn(pre);
      if(message.current.postMessage){
        message.current.postMessage({
          type: PublicMessageTypeEnum.setGlobalData,
          data: _pre,
        });
      }
      return  Object.assign({},pre,_pre);
    });
  }, []);
  // 操作
  const Action = useMemo(()=>{
    return {
      delete:(id:ComponentsItemType['id'])=>{
        setGlobalDataSync(({editData}) => {
          deepLayout(editData.layout,({item,i,layout})=>{
            if(item.key===id){
              deepLayout(layout.splice(i,1),(v)=>{
                if(editData.components[v.item.key]){
                  delete editData.components[v.item.key]
                }
              })
              return true
            }
          })
          return {
            selectComponentId:'',
            editData
          }
        })
      },
      add:({components,layout}:any)=>{
        setGlobalDataSync(({editData,}) => {
          // 无选中添加到根
          let parentLayout = editData.layout
          // 有选中从选中中取
          if(select){
            deepLayout(editData.layout,({item,path})=>{
              if(item.key===select.editComponent.id){
                let temp
                if(select.component.children){
                  temp={
                    layout:item,
                    data:select,
                  }
                }else{
                  for (let index = 0; index < path.length; index++) {
                    const v = path[index];
                    let data = getComponent(v.key);
                    if(data?.component.children){
                      temp={
                        layout:v,
                        data,
                      };
                      break;
                    }
                  }
                }
                if(temp){
                  if(temp.data.component.children?.deep){
                    const key = temp.data.editComponent.formData[temp.data.component.children.deep];
                    let index = temp.layout.children.findIndex(v=>v.key===key) 
                    if(index===-1){
                      // 创建虚拟层
                      index = temp.layout.children.length;
                      temp.layout.children[index] = {
                        key,
                        children:[]
                      }
                    }
                    parentLayout = temp.layout.children[index].children
                  }else{
                    parentLayout = temp.layout.children
                  }
                }
                return true
              }
            })
          }
          editData.components = {
            ...editData.components,
            ...components
          }
          parentLayout.push(layout)
          return {
            editData
          }
        })
      },
      update:(component:ComponentsItemType)=>{
        setGlobalDataSync(({editData}) => {
          editData.components[component.id] = component
          return {
            editData
          }
        })
      },
      select:(id:ComponentsItemType['id'])=>{
        setGlobalDataSync(()=>{
          return {
            selectComponentId:id
          }
        })
      },
      syncEditData:(editData:GlobalData['editData'])=>{
        setGlobalDataSync((pre)=>{
          return {
            editData:{
              ...pre.editData,
              ...editData
            },
          }
        })
      },
      syncComponents:(components:GlobalData['components'])=>{
        setGlobalDataSync(()=>{
          return {
            components,
          }
        })
      }
    }
  },[select])

  // 复制粘贴
  useEffect(()=>{
    if(iframe.current)return;
    const EventMap:any = {
      copy:(event:any) => {
        deepLayout(GlobalData.editData.layout,({item:layoutData})=>{
          if(layoutData.key===GlobalData.selectComponentId){
            let copyLayout:any = JSON.parse(JSON.stringify(layoutData))
            let copyComponents:any = {}
            deepLayout([copyLayout],({item})=>{
              const components = GlobalData.editData.components[item.key]
              if(components){
                let copyComponent = JSON.parse(JSON.stringify(components))
                copyComponents[item.key] = copyComponent
              }
            })
            event.clipboardData.setData('text/plain', JSON.stringify({
              copyComponents,
              copyLayout
            }));
            event.preventDefault();
            event.stopPropagation();
          }
        })
      },
      paste:(e:any)=>{
        let paste = (e.clipboardData || (window as any).clipboardData).getData('text/plain');
        try {
          let {copyComponents,copyLayout} = JSON.parse(paste)
          if(copyComponents&&copyLayout){
            let newCopyComponents:any = {}
            deepLayout([copyLayout],({item})=>{
              const components = copyComponents[item.key]
              if(components){
                const id = uuid()
                let copyComponent = JSON.parse(JSON.stringify(components))
                copyComponent.id = id;
                newCopyComponents[id] = copyComponent
                item.key = id
              }
            })
            Action.add({
              components:newCopyComponents,
              layout:copyLayout
            })
          }
        } catch (error) {
          console.log('error: ', error);
        }
      }
    }
    Object.keys(EventMap).forEach(v=>{
      window.addEventListener(v,EventMap[v]);
    })
   
    return ()=>{
      Object.keys(EventMap).forEach(v=>{
        window.removeEventListener(v,EventMap[v]);
      })
    }
  },[GlobalData])
  return {
    Action,
    message:message.current,
    GlobalData,
    select,
    getComponent,
  };
}

export const EditorContext =
  React.createContext<ReturnType<typeof useMessageRef>>({} as any);
