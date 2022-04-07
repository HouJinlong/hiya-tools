import React, { useMemo,useEffect, useRef, useState, useCallback  } from 'react';
import { v4 as uuid } from 'uuid';
import copy from 'copy-to-clipboard';
import { getComponentConfig } from './tool';
export interface ComponentType {
  key: string;
  name: string;
  getConfig?: string;
  preview?: string;
  schema?: any;
  uiSchema?: any;
  formData?: any;
  children?:any
  // {
  //   deep:string,
  //   getName?:string
  // }
}

export enum BackEndMessageTypeEnum {
  init = 'init',
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
  // 本次修改的类型
  type?:string;
  [key:string]:any
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
export function useEditorContext(
  iframe: React.RefObject<HTMLIFrameElement>,
) {
  const publisher = useMemo(()=>{
    return {
      subscribers: {
        any: []
      } as any,
      subscribe: function(fn:any, type = 'any') {
        if (typeof this.subscribers[type] === 'undefined') {
          this.subscribers[type] = []
        }
        this.subscribers[type].push(fn)
      },
      unsubscribe: function(fn:any, type:any) {
        this.visitSubscribers('unsubscribe', fn, type)
      },
      publish: function(publication:any, type:any) {
        this.visitSubscribers('publish', publication, type)
      },
      visitSubscribers: function(action:'unsubscribe'|'publish', arg:any, type = 'any') {
        (this.subscribers[type]||[]).forEach((currentValue:any, index:any) => {
          if (action === 'publish') {
            currentValue(arg)
          } else if (action === 'unsubscribe') {
            if (currentValue === arg) {
              this.subscribers[type].splice(index, 1)
            }
          }
        })
      }
    }
  },[])
  const GlobalDataState = {
     // 组件配置信息
    components:useState<{
      [key in ComponentType['key']]:ComponentType
    }>({}),
    // 自定义组件
    CustomComponents:useState<any>([]),
     // 编辑信息 组件配置数据 + 布局
    editData:useState<EditDataType>({
      components: {},
      layout: [],
    }),
     // 当前选中组件
    selectComponentId:useState(''),
     // 编辑信息 组件配置数据 + 布局
    customData:useState<any>({}),
    copyStr:useState(''),
  }
 
  // iframe 消息通信
  const postMessage = useRef<any>(null);
  useEffect(() => {
    const fn = (event:any) => {
      if (event.data.type) {
        let type:any;
        if (iframe.current) {
          type = 'BackEnd';
        } else {
          if(event.data.type==='init'){
            // FrontEnd 初始化
            postMessage.current=(data: any) => {
              console.log('FrontEnd','-->',data.type,data.data);
              window.parent.postMessage(data, event.data.data);
            }
            postMessage.current({
              type:'init',
              data:window.location.origin
            })
          }
          type = 'FrontEnd';
        }
        console.log(type,'<--',event.data.type,event.data.data);
        publisher.publish(event.data.data,event.data.type) 
      }
    }
    window.addEventListener(
      'message',
      fn,
      false
    );
    if (iframe.current) {
      const iframeEl = iframe.current
      // BackEnd 初始化
      iframeEl.onload = () => {
        postMessage.current=(data:any) => {
          console.log('BackEnd','-->',data.type,data.data);
          iframeEl.contentWindow?.postMessage(
            data,
            new URL(iframeEl.src).origin
          );
        }
        postMessage.current({
          type:'init',
          data:window.location.origin
        })
      };
    } 
    return ()=>{
      window.removeEventListener(
        'message',
        fn,
        false
      );
    }
  }, [iframe.current]);
 
  const [editDataHistory,setEditDataHistory] = useState<any>({
    data:[],
    index:0,
  })
  const editDataChange = (_pre:any)=>{
    if(iframe.current&&_pre.type){
      setEditDataHistory((v:any)=>{
        const {type,...other} = _pre
        const data = [
          ...(type==='初始化'?[]:v.data.slice(0,v.index)),
          {
            data:JSON.stringify(other),
            text:type
          }
        ]
        return {
          data,
          index:data.length
        }
      })
    }
  }
   // 同步修改
   const GlobalData:any = {}
  for(let _key  in GlobalDataState){
    const key = _key as keyof typeof GlobalDataState
    GlobalData[key] = GlobalDataState[key][0]
    useEffect(()=>{
      const fn = (data:any)=>{
        if(key==='editData'&&iframe.current){
          editDataChange(data)
        }
        GlobalDataState[key][1](data)
      }
      publisher.subscribe(fn,key);
      return ()=>{
        publisher.unsubscribe(fn,key);
      }
    },[GlobalDataState])
  }
  // 带步的修改方法
  const setGlobalDataSync = (key:keyof typeof GlobalDataState,fn:any) =>{
    GlobalDataState[key][1]((pre:any) => {
      let _pre = fn(pre);
      if(key==='editData'&&iframe.current){
        editDataChange(_pre)
      }
      postMessage.current!({
        type: key,
        data: _pre,
      })
      return _pre
    });
  }
  const getComponentById = useCallback((id)=>{
     const editComponent = GlobalData.editData.components[id]
      if(editComponent){
        return {
          component:getComponentConfig({
            CustomComponents:GlobalData.CustomComponents,
            Config:GlobalData.components[editComponent.key],
            formData:editComponent.formData,
            editData:GlobalData.editData,
            customData:GlobalData.customData
          }),
          editComponent
        }
      }else{
        return null
      }
   },[GlobalData])
  const select = useMemo(()=>{
    return getComponentById(GlobalData.selectComponentId)
  },[GlobalData])

  // 操作
  const Action = useMemo(()=>{
    return {
      delete:(id:ComponentsItemType['id'])=>{
        setGlobalDataSync('editData',(editData:EditDataType)  => {
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
          editData['type']='删除组件'
          return editData
        })
        setGlobalDataSync('selectComponentId',()=>"")
      },
      add:({components,layout}:any)=>{
        setGlobalDataSync('editData',(editData:EditDataType)  => {
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
                    let data = getComponentById(v.key);
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
                  const key = temp.data.component.children?.deep
                  if(key){
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
          editData['type']='添加组件'
          return editData
        })
      },
      update:(component:ComponentsItemType)=>{
        setGlobalDataSync('editData',(editData:EditDataType)  => {
          editData.components[component.id] = component
          editData['type']='属性修改'
          return editData
        })
      },
      select:(id:ComponentsItemType['id'])=>{
        setGlobalDataSync('selectComponentId',()=>id)
      },
      syncEditData:(editData:EditDataType)=>{
        setGlobalDataSync('editData',(pre:EditDataType)=>{
          return {
            ...pre,
            ...editData,
            type:'初始化'
          }
        })
      },
      copy(){
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
            const str = JSON.stringify({
              copyComponents,
              copyLayout
            })
            setGlobalDataSync('copyStr',()=>str)
            copy(str)
          }
        })
      },
      paste(data:any){
        try {
          let {copyComponents,copyLayout} = JSON.parse(data)
          if(copyComponents&&copyLayout){
            let newCopyComponents:any = {}
            deepLayout([copyLayout],({item}:any)=>{
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
            setTimeout(()=>{
              setGlobalDataSync('copyStr',()=>"")
              copy('clear')
            },0)
          }
        } catch (error) {
          console.log('error: ', error);
        }
      }
    }
  },[select,setGlobalDataSync])
  
  return {
    publisher,
    GlobalData,
    editDataHistory,
    setEditDataHistory,
    setGlobalDataSync,
    getComponentById,
    select,
    Action
  }
}
export const EditorContext =
  React.createContext<ReturnType<typeof useEditorContext>>({} as any);



