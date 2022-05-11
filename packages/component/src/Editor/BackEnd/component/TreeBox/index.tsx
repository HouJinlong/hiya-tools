import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Empty, Tooltip, Menu, Modal } from 'antd';
import { v4 as uuid } from 'uuid';
import Tree, { TreeNodeProps } from 'rc-tree';
import 'rc-tree/assets/index.css';
import * as Style from './style';
import {
  getComponentInfoById,
  deepLayout,
  transformLayout,
  EditDataType,
} from '../../../useEditData';
import { BackEndEditorContext } from '../../../EditorContext';
import { ComponentBox } from '../ComponentBox';
const VirtualKeySeparator = '-VirtualKeySeparator-';

interface MenuBoxProps {
  menuStyle: React.CSSProperties | undefined;
  setMenuStyle: React.Dispatch<
    React.SetStateAction<React.CSSProperties | undefined>
  >;
}
function MenuBox({ menuStyle, setMenuStyle }: MenuBoxProps) {
  const { EditDataState, EditDataDispatch } = useContext(BackEndEditorContext);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <div style={menuStyle}>
      <Modal
        title="添加组件"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <ComponentBox></ComponentBox>
      </Modal>
      {menuStyle ? (
        <Tooltip
          trigger="click"
          placement="right"
          defaultVisible
          color={'#fff'}
          title={() => (
            <Style.MenuBox>
              <Menu>
                {[
                  {
                    text: '添加',
                    onClick: () => {
                      setModalVisible(true);
                      setMenuStyle(undefined);
                    },
                  },
                  {
                    text: '复制',
                    onClick: () => {
                      let copyData: EditDataType['copyData'];
                      deepLayout(EditDataState.layout, ({ item }) => {
                        if (item.key === EditDataState.select) {
                          let copyLayout: EditDataType['layout'][0] =
                            JSON.parse(JSON.stringify(item));
                          let copyComponents: EditDataType['components'] = {};
                          deepLayout([copyLayout], ({ item }) => {
                            const components =
                              EditDataState.components[item.key];
                            if (components) {
                              copyComponents[item.key] = JSON.parse(
                                JSON.stringify(components)
                              );
                            }
                          });
                          copyData = {
                            layout: copyLayout,
                            components: copyComponents,
                          };
                          return true;
                        }
                      });
                      EditDataDispatch({ type: 'copy', data: copyData });
                    },
                  },
                  {
                    text: '粘贴',
                    disabled: !EditDataState.copyData,
                    onClick: () => {
                      const { layout, components } = EditDataState.copyData!;
                      let copyLayout = JSON.parse(
                        JSON.stringify(layout)
                      ) as typeof layout;
                      let copyComponents = {} as typeof components;
                      deepLayout([copyLayout], ({ item }) => {
                        const id = uuid();
                        copyComponents[id] = {
                          ...JSON.parse(JSON.stringify(components[item.key])),
                          id,
                        };
                        item.key = id;
                      });
                      EditDataDispatch({
                        type: 'add',
                        data: {
                          components: copyComponents,
                          layout: copyLayout,
                        },
                      });
                      EditDataDispatch({ type: 'copy', data: undefined });
                    },
                  },
                  {
                    text: '删除',
                    onClick: () => {
                      EditDataDispatch({
                        type: 'delete',
                        data: EditDataState.select!,
                      });
                      setMenuStyle(undefined);
                    },
                  },
                ].map((v) => {
                  return (
                    <Menu.Item
                      key={v.text}
                      disabled={v.disabled}
                      onClick={v.onClick}
                    >
                      {v.text}
                    </Menu.Item>
                  );
                })}
              </Menu>
            </Style.MenuBox>
          )}
        >
          <span />
        </Tooltip>
      ) : null}
    </div>
  );
}
type TreeKeysType = Array<NonNullable<TreeNodeProps['eventKey']>>
export function TreeBox() {
  const { EditDataState, EditDataDispatch, selectInfo } =
    useContext(BackEndEditorContext);
  const treeData = useMemo(() => {
    return {
      data: transformLayout(
        EditDataState.layout,
        function transformFn(item, parentLayout) {
          let ret = {
            key: item.key,
            title: '',
            isLeaf: true,
            style: {},
            children:[]
          };
          let data = getComponentInfoById({ EditDataState, id: item.key });
          if (data) {
            ret.title = data.componentInfo.name;
            ret.isLeaf = data.componentInfo.children ? false : true;
          } else {
            // 虚拟节点
            ret.title = item.key;
            ret.style = {
              pointerEvents: 'none',
              opacity: '.3',
            };
            if (parentLayout) {
              const parentEditComponent = getComponentInfoById({
                EditDataState,
                id: parentLayout.key,
              });
              ret.key = `${parentLayout.key}${VirtualKeySeparator}${item.key}`;
              ret.title = (parentEditComponent?.componentInfo.children?.all ||
                {})[item.key];
              ret.isLeaf = false;
            }
          }
          ret.children = transformLayout(item.children, transformFn, item);
          return ret;
        }
      ),
      selectedKeys: [EditDataState.select] as TreeKeysType
    };
  }, [EditDataState]);
  const treeRef = React.useRef<Tree>(null);
  const [expandedKeys, setExpandedKeys] = useState<TreeKeysType>([]);
  useEffect(() => {
    if(EditDataState.select ){
      if (treeRef.current) {
        treeRef.current.scrollTo({ key: EditDataState.select as TreeKeysType[0] });
      }
      setExpandedKeys((v) => {
        return Array.from(new Set([
          ...v,
          ...[
            EditDataState.select,
            ...Object.keys(selectInfo?.componentInfo.children?.all || {}).map(
              (v) => {
                return `${EditDataState.select}${VirtualKeySeparator}${v}`;
              }
            ),
          ],
        ])) as TreeKeysType
      });
    }
  }, [EditDataState.select]);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>();

  return (
    <Style.TreeBox>
      <MenuBox menuStyle={menuStyle} setMenuStyle={setMenuStyle}></MenuBox>
      {treeData.data.length ? (
        <>
          <Tree
            ref={treeRef}
            autoExpandParent={true}
            defaultExpandAll={true}
            expandedKeys={expandedKeys}
            selectedKeys={treeData.selectedKeys}
            treeData={treeData.data}
            onSelect={(...[,info]) => {
              let id =  String(info.node.key);
              if (!EditDataState.components[id]) {
                return;
              }
              if (id === EditDataState.select) {
                id = '';
              }
              EditDataDispatch({ type: 'select', data: id });
            }}
            onRightClick={(info) => {
              let id = String(info.node.key);
              if (!EditDataState.components[id]) {
                return;
              }
              setMenuStyle(undefined);
              setTimeout(() => {
                EditDataDispatch({ type: 'select', data: id });
                // 设置Menu展示
                const rect = (info.event.target as any).getBoundingClientRect();
                setMenuStyle(() => ({
                  position: 'absolute',
                  left: `${rect.x + rect.width}px`,
                  top: `${rect.y + rect.height / 2}px`,
                }));
              }, 0);
            }}
            draggable
            onExpand={(expandedKeys) => {
              // 拖动时自动展开
              setExpandedKeys(expandedKeys);
            }}
            allowDrop={({ dropNode, dropPosition }) => {
              let key = String(dropNode.key)
              if (dropNode.isLeaf) {
                if (dropPosition === 0) {
                  // 如果当前节点有虚拟节点，禁止直接拖入
                  const data = getComponentInfoById({
                    EditDataState,
                    id:key,
                  });
                  if (data?.componentInfo.children?.all) {
                    return false;
                  }
                } else {
                  // 禁止拖动到虚拟节点同级
                  if (
                    key.split(VirtualKeySeparator).length > 1
                  ) {
                    return false;
                  }
                }
              }
              return true;
            }}
            onDrop={(info) => {
              let dropPosition = info.dropPosition;
              if(info.dropToGap===false){
                if(info.node.isLeaf ){
                  dropPosition=1
                }else{
                  dropPosition=0
                }
              }
              EditDataDispatch({
                type: 'drop',
                data: {
                  dragNode: String(info.dragNode.key),
                  targetNode: String(info.node.key)
                    .split(VirtualKeySeparator)
                    .pop()!,
                  dropPosition,
                },
              });
            }}
          />
        </>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无内容" />
      )}
    </Style.TreeBox>
  );
}
