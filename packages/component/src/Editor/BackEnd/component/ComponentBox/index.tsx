import React, { useContext } from 'react';
import { EditorContext, ComponentType } from '../../../EditorContext';
import { utils } from '@rjsf/core';
import * as Style from './style';
import { v4 as uuid } from 'uuid';
import { getComponentConfig } from '../../../tool';
export function ComponentBox() {
  const { GlobalData, Action } = useContext(EditorContext);
  return (
    <Style.ComponentBox>
      {Object.values(GlobalData?.components || {}).map((v)=>getComponentConfig({
        Config:v,
        formData:{},
        customData:GlobalData.customData,
        editData:GlobalData.editData
      })).map((v) => {
        return (
          <Style.ComponentBoxItem
            key={v.key}
            onClick={() => {
              const id = uuid();
              const data: ComponentType = JSON.parse(JSON.stringify(v));
              Action.add({
                components:{
                  [id]:{
                    id,
                    formData: utils.getDefaultFormState(
                      data.schema,
                      data.formData
                    ),
                    key:data.key
                  }
                },
                layout:{
                  key:id,
                  children:[]
                }
              })
              Action.select(id)
            }}
          >
            {v.preview?<Style.ComponentBoxImg src={v.preview} />:null}
            <div>{v.name}</div>
          </Style.ComponentBoxItem>
        );
      })}
    </Style.ComponentBox>
  );
}
