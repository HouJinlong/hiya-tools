import React, { useCallback, useContext, useEffect ,useState,useRef} from 'react';
import {
  useEditorContext,
  EditorContext,
  deepLayout
} from '../EditorContext';
import { icons } from '../icons';
import {prefix } from '../tool';
import { RenderView } from '../RenderView/index';
import * as Style from './style';
import { v4 as uuid } from 'uuid';



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
  // 复制粘贴
  useEffect(()=>{
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
  return  <Style.ActionBox ref={boxRef}>
    {
      rect&&(
        <Style.Box
            style={rect}
          >
           <Style.BoxActive></Style.BoxActive>
            <Style.OperationBox>
              {[
                {
                  icon: icons.delete,
                  fn: () => {
                    Action.delete(GlobalData.selectComponentId)
                  },
                },
              ].map((v,i) => {
                return (
                  <Style.OperationBoxItem onClick={v.fn} key={i}>
                    {v.icon}
                  </Style.OperationBoxItem>
                );
              })}
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
