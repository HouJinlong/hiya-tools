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
  Components:any,
  edit:boolean
}) => (v:any)=>{
  const current = data.editData.components[v.key]
  const Component = data.Components[current.key]
  const deepLayoutChildrenRender = ()=>{
    if(Component.config?.children){
      const children = v.children||[]
      let ret:any = {}
      if(Component.config.children.deep){
        children.forEach((item:any)=>{
          ret[item.key] = transformLayout(item.children,renderFn(data))
        })
      }else{
        ret = transformLayout(children,renderFn(data))
      }
      return ret
    }else{
      return null
    }
  }
  return (
    <>
      {data.edit?<input type="hidden" id={prefix+current.id} />:null}
      <Component {...current.formData} key={current.id} >
        {deepLayoutChildrenRender()}
      </Component>
    </>
  );
}