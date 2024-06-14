import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import type { getHost } from '@xc/hiya-host';
import { RenderView,prefix } from '../RenderView/index';
import * as Style from './style';

import {
  useFrontEndEditorContext,
  ComponentType,
  FrontEndEditorContext,
  FrontEndPostMessageType
} from '../EditorContext';

const EditWarp = () => {
  const { EditDataState,postMessage} = useContext(FrontEndEditorContext);
  const boxRef = useRef<HTMLDivElement>(null);
  const getRect = useCallback(
    (el) => {
      const baseRect = boxRef?.current?.getBoundingClientRect() || {
        top: 0,
        left: 0,
      };
      if (el) {
        const elRect = el.getBoundingClientRect();
        return {
          width: elRect.width + 'px',
          height: elRect.height + 'px',
          top: elRect.top - baseRect.top + 'px',
          left: elRect.left - baseRect.left + 'px',
        };
      } else {
        return null;
      }
    },
    [boxRef.current]
  );
  // 点击选中
  useEffect(() => {
    const fn = (e: any) => {
      const path =  e.path|| (e.composedPath && e.composedPath())
      for (let index = 0; index < path.length; index++) {
        const id = path[index]?.previousElementSibling?.id?.replace(
          prefix,
          ''
        );
        if (EditDataState.components[id]) {
          e.stopPropagation();
          postMessage!({type:FrontEndPostMessageType.sync,data:{ type: 'select', data: id }})
          return 
        }
      }
    };
    window.addEventListener('click', fn, true);
    return () => {
      window.removeEventListener('click', fn, true);
    };
  }, [EditDataState.components]);
  const [rect, setRect] = useState<any>(null);
  const ObserverRef = useRef<any>(null)
  // 显示当前选中的操作条
  useEffect(() => {
    if(! ObserverRef.current){
      ObserverRef.current = {
        el:undefined as unknown,
        resizeObserver:new window.ResizeObserver(() => {
          setRect(()=>{
            return getRect(ObserverRef.current.el)
          })
        })
      }
    }
    const el =  document.querySelector('#' + prefix + EditDataState.select)
              ?.nextElementSibling
    if(el){
      el.scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
      ObserverRef.current.el = el
      ObserverRef.current.resizeObserver.observe(el)
      return ()=>{
        ObserverRef.current.resizeObserver.unobserve(el)
      }
    }else{
      setRect(()=>{
        return null
      })
    }
  }, [EditDataState.select,EditDataState.layout]);
  return (
    <Style.ActionBox ref={boxRef}>
      {rect && (
        <Style.Box style={rect}>
          <Style.BoxActive></Style.BoxActive>
        </Style.Box>
      )}
    </Style.ActionBox>
  );
};
export interface FrontEndPropsType {
  Components: {
    [key in string]: ComponentType;
  };
  Warp: React.ComponentType;
  EditDataStateOther: {
    [key in string]: any;
  };
  AutoHost: ReturnType<typeof getHost>;
  other:{
    [key in string]: any;
  };
}
export function FrontEnd(props: FrontEndPropsType) {
  const data = useFrontEndEditorContext(props);
  return (
    <div style={{ position: 'relative' }}>
      <FrontEndEditorContext.Provider value={data}>
        <EditWarp />
        <RenderView
          Components={props.Components}
          edit={true}
          Warp={props.Warp}
          other={props.other}
          AutoHost={props.AutoHost}
          EditDataState={{
            components: data.EditDataState.components,
            layout: data.EditDataState.layout,
            other: data.EditDataState.other,
          }}
        />
      </FrontEndEditorContext.Provider>
    </div>
  );
}
