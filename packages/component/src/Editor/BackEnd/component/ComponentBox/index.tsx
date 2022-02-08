import React, { useContext } from 'react';
import { EditorContext, ComponentType } from '../../../EditorContext';
import { utils } from '@rjsf/core';
import * as Style from './style';
import { v4 as uuid } from 'uuid';
export function ComponentBox() {
  const { GlobalData, Action } = useContext(EditorContext);
  return (
    <Style.ComponentBox>
      {Object.values(GlobalData?.components || {}).map((v) => {
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
            <Style.ComponentBoxImg src={v.preview} />
            <div>{v.name}</div>
          </Style.ComponentBoxItem>
        );
      })}
    </Style.ComponentBox>
  );
}
