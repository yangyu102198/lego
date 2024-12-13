export type TreeNodeEvent = {
    // 节点销毁
    destoryed: undefined;
    // 设置了组件，意味组件创建
    setComponent: any;
    // 组件销毁（不等于节点销毁）
    destroyedComponent: undefined;
};

export enum Postion {
    First = 'first',
    Last = 'last'
}
