import React, { useContext } from 'react';
import { utils } from '@rjsf/core';
import * as Style from './style';
import { v4 as uuid } from 'uuid';
import { getComponentInfo } from '../../../useEditData';
import { BackEndEditorContext } from '../../../EditorContext';
export function ComponentBox() {
  const { EditDataState, EditDataDispatch } =
    useContext(BackEndEditorContext);
  return (
    <Style.ComponentBox>
      {(EditDataState?.ComponentsInfo || []).map((v) => {
        return (
          <Style.ComponentBoxItem
            key={v.key}
            onClick={() => {
              const id = uuid();
              const data = getComponentInfo({
                EditDataState,
                componentInfo:JSON.parse(JSON.stringify(v)),
                formData:v.formData
              }) 
              EditDataDispatch({
                type: 'add',
                data: {
                  components: {
                    [id]: {
                      id,
                      formData: utils.getDefaultFormState(
                        data.schema,
                        data.formData
                      ),
                      key: data.key,
                    },
                  },
                  layout: {
                    key: id,
                    children: [],
                  },
                },
              });
            }}
          >
            {v.icon&&<Style.ComponentBoxImg src={v.icon} />}
            <div>{v.name}</div>
          </Style.ComponentBoxItem>
        );
      })}
    </Style.ComponentBox>
  );
}
