import React, { useCallback, useContext, useEffect ,useState,useRef} from 'react';
import {
  useMessageRef,
  BackEndMessageTypeEnum,
  EditorContext
} from '../EditorContext';
import { icons } from '../icons';
import { transformLayout,renderFn,prefix } from '../tool';
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
          return Action.select(id)
        }
      }
    }
    window.addEventListener('click',fn)
    return ()=>{
      window.removeEventListener('click',fn)
    }
  },[GlobalData.editData.components])
  const [rect,setRect] = useState<any>(null)
  // 显示当前选中的操作条
  useEffect(()=>{
    setRect(()=>{
      return getRect(GlobalData.selectComponentId&&document.querySelector('#'+prefix+GlobalData.selectComponentId)?.nextElementSibling)
    })
  },[GlobalData,getRect])
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
  const data = useMessageRef({} as any);
  useEffect(() => {
    data.message.onMessage = {
      [BackEndMessageTypeEnum.init]: () => {
        let components = {} as any;
        Object.keys(props.Components).forEach((key) => {
          components[key] = Object.assign({}, props.Components[key].config, {
            key,
          });
        });
        data.Action.syncComponents(components)
      },
    };
  }, []);
  return (
    <div style={{position: "relative"}}>
      <EditorContext.Provider value={data}>
        <EditWarp></EditWarp>
        {transformLayout(data.GlobalData.editData.layout,renderFn({
          editData:data.GlobalData.editData,
          Components:props.Components,
          edit:true
        }))}
      </EditorContext.Provider>
    </div>
  );
}
