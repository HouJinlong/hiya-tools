import { useReducer } from 'react';
import { ComponentType } from './EditorContext';
import { v4 as uuid } from 'uuid';
export interface EditComponentInfoType {
  id: string;
  formData: any;
  key: string;
}

export interface EditDataType {
  // 组件数据 模版组件｜自定义组件
  ComponentsInfo: Array<
    Omit<ComponentType, 'getConfig' | 'Component'> & {
      getConfig?: string;
      key: string;
    }
  >;
  //  组件列表
  components: {
    [key in EditComponentInfoType['id']]: EditComponentInfoType;
  };
  // 组件渲染顺序与包含关系
  layout: {
    key: EditComponentInfoType['id'];
    children: EditDataType['layout'];
  }[];
  // 编辑后台｜展示前台自己需要使用的数据
  other: {
    [key in string]: any;
  };
  select?: EditComponentInfoType['id'];
  copyData?: {
    layout: EditDataType['layout'][0];
    components: EditDataType['components'];
  };
  type?:{
    id:string,
    text:string
  }
}
export const getComponentInfo = (data: {
  EditDataState: EditDataType;
  componentInfo: EditDataType['ComponentsInfo'][0];
  formData: EditComponentInfoType['formData'];
}) => {
  const { getConfig, ...other } = data.componentInfo;
  let ret = {};
  try {
    if (getConfig) {
      ret = {
        ...other,
        ...new Function(`return (${getConfig})`)()({
          EditDataState: data.EditDataState,
          formData: data.formData,
          uuid,
        }),
      };
    } else {
      ret = {
        ...other,
      };
    }
  } catch (error) {
    console.log('配置错误: ', error);
  }
  return ret as Omit<ComponentType, 'getConfig' | 'Component'> & {
    key: string;
  };
};

export const getComponentInfoById = (data: {
  EditDataState: EditDataType;
  id?: EditComponentInfoType['id'];
}) => {
  if (data.id && data.EditDataState.components[data.id]) {
    const editComponentInfo = data.EditDataState.components[data.id];
    return {
      data: editComponentInfo,
      componentInfo: getComponentInfo({
        EditDataState: data.EditDataState,
        componentInfo: data.EditDataState.ComponentsInfo.find(
          (v) => v.key === editComponentInfo.key
        )!,
        formData: editComponentInfo.formData,
      }),
    };
  } else {
    return null;
  }
};

export function deepLayout<T extends any[]>(
  layout: T,
  fn: (data: {
    item: T[number];
    i: number;
    layout: T;
    path: T[number][];
  }) => any,
  path: T[number][] = []
) {
  for (let i = 0; i < layout.length; i++) {
    let _path = [layout[i], ...path];
    if (fn({ item: layout[i], i, layout, path: _path })) {
      return;
    } else {
      deepLayout(layout[i]?.children || [], fn, _path);
    }
  }
}
export const transformLayout = <T extends any[],K=T[number]>(layout:T,fn:(item:K,parentLayout?:K)=>any,parentLayout?:K)=>{
  let ret:any = [];
  for (let i = 0; i < layout.length; i++) {
    let item = fn(layout[i],parentLayout)
    ret.push(item)
  }
  return ret
}

export const EditDataInitialState = (): EditDataType =>( {
  ComponentsInfo: [],
  components: {},
  layout: [],
  other: {},
})
type ACTIONTYPE =
  | { type: 'historyInit'; data: Pick<EditDataType,'components'|'layout'|'select'> }
  | { type: 'ComponentsInfo'; data: EditDataType['ComponentsInfo'] }
  | {
      type: 'other';
      data: EditDataType['other'];
    }
  | {
      type: 'select';
      data: EditComponentInfoType['id'];
    }
  | {
      type: 'add';
      data: {
        components: EditDataType['components'];
        layout: EditDataType['layout'][0];
      };
    }
  | {
      type: 'update';
      data: EditComponentInfoType;
    }
  | {
      type: 'delete';
      data: EditComponentInfoType['id'];
    }
  | {
      type: 'copy';
      data: EditDataType['copyData'];
    }
  | {
      type: 'drop';
      data: {
        dragNode: EditComponentInfoType['id'];
        targetNode: EditComponentInfoType['id'];
        dropPosition: number;
      };
    };
function EditDataReducer(state: EditDataType, action: ACTIONTYPE) {
  const tempGetComponentInfoById = (id: EditComponentInfoType['id']) =>
    getComponentInfoById({ EditDataState: state, id });
  const virtualNodes = (data: {
    layout: EditDataType['layout'][0];
    data: NonNullable<ReturnType<typeof tempGetComponentInfoById>>;
  }) => {
    let ret: any = {};
    const { all, current } = data.data.componentInfo.children as any;
    const keys = Object.keys(all);
    data.layout.children.forEach((v) => {
      if (keys.includes(v.key)) {
        ret[v.key] = v;
      } else {
        deepLayout(v.children, ({ item }) => {
          delete state.components[item.key];
        });
      }
    });
    keys.forEach((v) => {
      if (!ret[v]) {
        ret[v] = {
          key: v,
          children: [],
        };
      }
    });
    data.layout.children = Object.values(ret);
    return {
      data,
      currentLayout: ret[current] as EditDataType['layout'][0],
    };
  };
  switch (action.type) {
    case 'historyInit':
      return {
        ...state,
        ...action.data
      };
    case 'select':
      return {
        ...state,
        select: action.data,
      };
    case 'other':
      return {
        ...state,
        other: {
          ...state.other,
          ...action.data,
        },
      };
    case 'ComponentsInfo':
      return {
        ...state,
        ComponentsInfo: action.data,
      };
    case 'add':
       // 无选中添加到根
      let parentLayout:any = state.layout;
      // 有选中从选中中取
      if (state.select) {
        const selectInfo = tempGetComponentInfoById(state.select)!;
        deepLayout(state.layout, ({ item, path }) => {
          if (item.key === selectInfo.data.id) {
            let temp;
            // 选中可添加
            if (selectInfo.componentInfo.children) {
              temp = {
                layout: item,
                data: selectInfo,
              };
            } else {
              //   选中不可添加 沿着路径向上找
              for (let index = 0; index < path.length; index++) {
                const v = path[index];
                let data = tempGetComponentInfoById(v.key)!;
                if (data?.componentInfo.children) {
                  temp = {
                    layout: v,
                    data,
                  };
                  break;
                }
              }
            }
            if (temp) {
              // 添加
              const { all, current } = temp.data.componentInfo.children!;
              if (all) {
                if (!all[current]) {
                  parentLayout = null;
                  return true;
                }
                parentLayout = virtualNodes(temp).currentLayout.children;
              } else {
                parentLayout = temp.layout.children;
              }
            }
            return true;
          }
        });
      } 
      if (!parentLayout) {
        return state;
      }
      state.components = {
        ...state.components,
        ...action.data.components,
      };
      parentLayout.push(action.data.layout);
      return {
        ...state,
        select: action.data.layout.key,
        type:{
          id:uuid(),
          text:'添加组件'
        },
      };
    case 'update':
      state.components[action.data.id] = action.data;
      // 存在虚拟层 进行处理
      const data = tempGetComponentInfoById(action.data.id);
      if (data?.componentInfo.children?.all) {
        deepLayout(state.layout, ({ item }) => {
          if (item.key === action.data.id) {
            virtualNodes({
              layout: item,
              data,
            });
          }
        });
      }
      return {
        ...state,
        type:{
          id:uuid(),
          text:'更新组件'
        },
      };
    case 'delete':
      let select = '';
      deepLayout(state.layout, ({ item, i, layout, path }) => {
        if (item.key === action.data) {
          if (path[1]) {
            select = path[1].key;
          }
          deepLayout(layout.splice(i, 1), (v) => {
            if (state.components[v.item.key]) {
              delete state.components[v.item.key];
            }
          });
          return true;
        }
      });
      return {
        ...state,
        select,
        type:{
          id:uuid(),
          text:'删除组件'
        },
      };
    case 'copy':
      return {
        ...state,
        copyData: action.data,
      };
    case 'drop':
      let { dragNode, targetNode, dropPosition } = action.data;
      let dragData: EditDataType['layout'];
      deepLayout(state.layout, ({ item, i, layout }) => {
        if (item.key === dragNode) {
          dragData = layout.splice(i, 1);
          return true;
        }
      });
      deepLayout(state.layout, ({ item, i, layout }) => {
        if (item.key === targetNode) {
          if (dropPosition === 0) {
            item.children.unshift(...dragData);
          } else if (dropPosition === -1) {
            layout.splice(-1, 0, ...dragData);
          } else {
            layout.splice(i + 1, 0, ...dragData);
          }
          return true;
        }
      });
      return {
        ...state,
        type:{
          id:uuid(),
          text:'拖动组件'
        },
      };
    default:
      return state;
  }
}
export function useEditDataReducer(state: EditDataType) {
  return useReducer(EditDataReducer, {
    ...EditDataInitialState(),
    ...state,
  });
}
