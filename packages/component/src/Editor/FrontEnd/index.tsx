import React, { useCallback, useContext, useEffect ,useState,useRef} from 'react';
import {
  useEditorContext,
  EditorContext,
} from '../EditorContext';
import { icons } from './icons';
import {prefix } from '../tool';
import { RenderView } from '../RenderView/index';
import * as Style from './style';




const EditWarp = () => {
  
  const { GlobalData, Action } =
    useContext(EditorContext);
  const boxRef = useRef<HTMLDivElement>(null) 
  const getRect = useCallback((el)=>{
    const baseRect = boxRef?.current?.getBoundingClientRect() || {
      top:0,
      left:0
    }
    if(el){
      const elRect = el.getBoundingClientRect()
      return {
        width:elRect.width+'px',
        height:elRect.height+'px',
        top:elRect.top-baseRect.top+'px',
        left:elRect.left-baseRect.left+'px',
      }
    }else{
      return null
    } 
  },[boxRef.current])
  // 点击选中 
  useEffect(()=>{
    const fn  = (e:any)=>{
      for (let index = 0; index < e.path.length; index++) {
        const id = e.path[index]?.previousElementSibling?.id?.replace(prefix,'')
        if(GlobalData.editData.components[id]){
          e.stopPropagation();  
          return Action.select(id)
        }
      }
    }
    window.addEventListener('click',fn,true)
    return ()=>{
      window.removeEventListener('click',fn,true)
    }
  },[GlobalData.editData.components])
  const [rect,setRect] = useState<any>(null)
  // 显示当前选中的操作条
  useEffect(()=>{
    setRect(()=>{
      return getRect(GlobalData.selectComponentId&&document.querySelector('#'+prefix+GlobalData.selectComponentId)?.nextElementSibling)
    })
  },[GlobalData,getRect])
  // 粘贴
  useEffect(()=>{
    const fn = (e:any)=>{
      Action.paste((e.clipboardData || (window as any).clipboardData).getData('text/plain'))
    }
    document.addEventListener('paste',fn)
    return ()=>{
      document.removeEventListener('paste',fn)
    }
  },[Action.paste])
  return  <Style.ActionBox ref={boxRef}>
    {
      rect&&(
        <Style.Box
            style={rect}
          >
           <Style.BoxActive></Style.BoxActive>
            <Style.OperationBox style={
              parseInt(rect.top)>300?{
                bottom:'100%'
              }:{
                top:'100%'
              }
            }>
              {
                GlobalData.copyStr?<Style.OperationBoxItem  onClick={() => {
                  Action.paste(GlobalData.copyStr)
               }} >
                   {icons.paste}
               </Style.OperationBoxItem>:null
              }
              <Style.OperationBoxItem  onClick={() => {
                  Action.copy()
              }} >
                  {icons.copy}
              </Style.OperationBoxItem>
              <Style.OperationBoxItem onClick={() => {
                Action.delete(GlobalData.selectComponentId)
              }} >
                  {icons.delete}
              </Style.OperationBoxItem>
            </Style.OperationBox>
        </Style.Box>
      )
    }
  </Style.ActionBox>
};

export function FrontEnd(props: any) {
  const  data = useEditorContext({} as any);
  const  {setGlobalDataSync,GlobalData:{editData,customData},publisher} = data
  useEffect(()=>{
    publisher.subscribe(()=>{
      let components = {} as any;
      Object.keys(props.Components).forEach((key) => {
        components[key] = Object.assign({}, props.Components[key].config, {
          key,
        });
      });
      setGlobalDataSync('components',()=>{
        return components
      })
      setGlobalDataSync('selectComponentId',()=>{
        return ''
      })
    },'init')
  },[])
  return (
    <div style={{position: "relative"}}>
      <EditorContext.Provider value={data}>
        <EditWarp></EditWarp>
        <RenderView editData={editData} customData={customData} Components={props.Components} edit={true}  Warp={props.Warp}/>
      </EditorContext.Provider>
    </div>
  );
}
