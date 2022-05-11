import React, { useContext } from 'react';
import { List } from 'antd';
import { BackEndEditorContext } from '../../../EditorContext';
export function HistoryBox() {
  const { EditDataHistory, setEditDataHistory, EditDataDispatch } =
    useContext(BackEndEditorContext);
  return (
    <List
      size="small"
      style={{
        margin: '-13px',
      }}
      bordered
      dataSource={EditDataHistory.data}
      renderItem={(item, index) => (
        <List.Item
          key={item.type.id}
          style={{
            fontSize: '12px',
            color: index + 1 === EditDataHistory.index ? '#1890ff' : '',
            opacity: index + 1 > EditDataHistory.index ? '.5' : '1',
            cursor: 'pointer',
          }}
          onClick={() => {
            setEditDataHistory((pre) => {
              return {
                ...pre,
                index: index + 1,
              };
            });
            EditDataDispatch({
              type: 'historyInit',
              data: JSON.parse(EditDataHistory.data[index].data),
            });
          }}
        >
          {item.type.text}
        </List.Item>
      )}
    />
  );
}
