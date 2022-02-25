import React from 'react';
import { transformLayout,renderFn } from '../tool';
export const RenderViewContext =
  React.createContext({} as any);
export const RenderView = ({editData,customData,Components,edit,Warp}:any)=>{
    return <RenderViewContext.Provider value={{editData,customData,edit}}>
      <Warp>
          {
            transformLayout(editData.layout,renderFn({
              editData,
              customData,
              Components,
              edit
            }))
          }
      </Warp>
     </RenderViewContext.Provider>
}