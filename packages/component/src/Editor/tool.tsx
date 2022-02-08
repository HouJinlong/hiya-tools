


import { ComponentType} from './EditorContext';
export function getComponents(data:{
    Components:any,
    config:ComponentType
}) {
    Object.assign(data.Components, {
      config:data.config
    })
    return data.Components
}