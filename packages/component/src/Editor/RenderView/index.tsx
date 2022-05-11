import React from 'react';
import {FrontEndPropsType} from '../FrontEnd'
import {EditDataType,transformLayout} from '../useEditData'


export const prefix = 'ToyBricks-editId'  
export const renderFn = (data:RenderViewProps) => (v:RenderViewProps['EditDataState']['layout'][0])=>{
  const current = data.EditDataState.components[v.key] 
  const {Component} = data.Components[current.key] 
  const deepLayoutChildrenRender = ()=>{
    const children = v.children||[]
    let ret:any = null
    if(children[0]&&!data.EditDataState.components[children[0].key]){
      // 虚拟层处理
      ret = {}
      children.forEach((item)=>{
        ret[item.key] = transformLayout(item.children,renderFn(data))
      })
    }else{
      ret = transformLayout(children,renderFn(data))
    }
    return ret
  }
  return (
    <React.Fragment key={v.key}>
      {data.edit?<input type="hidden" id={prefix+current.id} />:null}
      <Component {...current.formData} key={current.id} >
        {deepLayoutChildrenRender()}
      </Component>
    </React.Fragment>
  );
}

export interface RenderViewProps{
  Components:FrontEndPropsType['Components'],
  edit:boolean;
  other:{
    [key in string]:any
  };
  EditDataState:Pick<EditDataType,'components'|'layout'|'other'>
}
export const RenderViewContext =
  React.createContext<RenderViewProps>({} as any);
export const RenderView = ({Warp,...data}:RenderViewProps&{
  Warp:React.ComponentType
})=>{
    return <RenderViewContext.Provider value={data}>
      <Warp>
          {
            transformLayout(data.EditDataState.layout,renderFn(data))
          }
      </Warp>
     </RenderViewContext.Provider>
}