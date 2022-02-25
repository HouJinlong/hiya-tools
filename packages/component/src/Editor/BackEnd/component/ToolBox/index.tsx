import React, { useContext,useState} from 'react';
import ReactQr from 'react-awesome-qr'
import { EditorContext } from '../../../EditorContext';
import { Space, Button,Modal,Input} from 'antd';
import { IconWidget } from '../../../../IconWidget';
import { BackEndPropsType } from '../../index';

export function ToolBox(props: BackEndPropsType) {
  const data = useContext(EditorContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [view,setView] = useState(props.onView())
  return (
    <div
      style={{
        display: 'flex',
        height: '40px',
        background: '#fff',
        justifyContent: 'center',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      <Space>
        {
          props.ToolBoxSlot
        }
        {
          props.onView?(
            <>
              <Modal title="预览" visible={isModalVisible} width={340} footer={null} onCancel={()=>{
              setIsModalVisible(false)
            }}>
              <ReactQr text={view} size={300} dotScale={0.4}/>
              <Input.TextArea rows={4} value={view} onChange={(e)=>{
                setView(e.target.value)
              }} />
            </Modal>
            <Button
              icon={<IconWidget icon="View" title="预览"></IconWidget>}
              onClick={() => {
                setIsModalVisible(true)
              }}
            >
            </Button>
            </>
          ):<></>
        }
        {
          props.onSave?(
            <Button
            icon={<IconWidget icon="Save" title="保存"></IconWidget>}
            onClick={() => {
              props.onSave(data.GlobalData.editData);
            }}
          >
          </Button>
          ):<></>
        }
      </Space>
    </div>
  );
}
