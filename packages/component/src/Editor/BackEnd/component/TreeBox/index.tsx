import React, { useContext, useMemo } from 'react';
import { Tree, Empty } from 'antd';
import { EditorContext,transformLayout } from '../../../EditorContext';

export function TreeBox() {
  const { GlobalData,Action,getComponent } = useContext(EditorContext);
  const treeData = useMemo(()=>{
    if(!Object.keys(GlobalData.components).length) return []
    return transformLayout(GlobalData.editData.layout,function transformFn(item,parentLayout){
      let ret:any = {}
      const editComponent = getComponent(item.key)
      ret.key = item.key 
      if(editComponent){
        const {name} = editComponent.component
        ret.title = <div style={{whiteSpace: 'nowrap'}}>{name}</div>
        ret.disabled = false
      }else{
        ret.title = item.key
        ret.disabled = true
        if(parentLayout){
          const parentEditComponent = getComponent(parentLayout.key)
          let getName = parentEditComponent?.component.children?.getName
          if(getName){
            try {
              const fn =  new Function('data', getName)
              ret.title = fn({deep:item.key,formData:parentEditComponent?.editComponent.formData})
            } catch (error) {
            }
          }
        }
      }
      ret.children = transformLayout(item.children,transformFn,item)
      return ret
    })
  },[GlobalData]) 
  const TreeEvent = useMemo(()=>{
    return {
        onSelect:(selectedKeys: React.Key[]) => {
          Action.select(selectedKeys[0] as string)
        }
    }
  },[])
  return treeData.length ? (
    <Tree  blockNode treeData={treeData} defaultExpandAll  selectedKeys={GlobalData.selectComponentId?[GlobalData.selectComponentId]:[]} onSelect={TreeEvent.onSelect} />
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无内容" />
  );
}