import React from 'react';
import { ComponentType} from './EditorContext';

export function getComponents(data:{
    Components:any,
    config:Omit<ComponentType,'key'>
}) {
    Object.assign(data.Components, {
      config:data.config
    })
    return data.Components
}
export const getComponentConfig =(data:any)=>{
  const {getConfig,...other} = data.Config
  if(getConfig){
    try {
      const Config = new Function(`return (${getConfig})`)()({CustomComponents:data.CustomComponents,formData:data.formData,editData:data.editData,customData:data.customData})
      return {
        ...other,
        ...Config
      }
    } catch (error) {
      console.log('配置错误: ', error);
    }
  }else{
    return other
  }
}

export const transformLayout = <T extends any[],K=T[number]>(layout:T,fn:(item:K,parentLayout?:K)=>any,parentLayout?:K)=>{
  let ret = [];
  for (let i = 0; i < layout.length; i++) {
    let item = fn(layout[i],parentLayout)
    ret.push(item)
  }
  return ret
}

export const prefix = 'editId'  
export const renderFn = (data:{
  editData:any,
  customData:any,
  Components:any,
  edit:boolean
}) => (v:any)=>{
  const current = data.editData.components[v.key]
  const Component = data.Components[current.key]
  const deepLayoutChildrenRender = ()=>{
    const children = v.children||[]
    let ret:any = null
    if(children[0]&&!data.editData.components[children[0].key]){
      // 虚拟层处理
      ret = {}
      children.forEach((item:any)=>{
        ret[item.key] = transformLayout(item.children,renderFn(data))
      })
    }else{
      ret = transformLayout(children,renderFn(data))
    }
    return ret
  }
  return (
    <>
      {data.edit?<input type="hidden" id={prefix+current.id} />:null}
      <Component {...current.formData}   key={current.id} >
        {deepLayoutChildrenRender()}
      </Component>
    </>
  );
}