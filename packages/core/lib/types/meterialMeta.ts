import { type MaybePromise, type MaybeArray, IncludeTo } from '@type/utils';
export type MeterialMetaType = 'component' | 'setter';
export type MeterialMetaVersion = `v${number}.${number}.${number}`;

// 资源的基础配置
export interface MeterialMeta {
    // 资源的版本
    version?: MeterialMetaVersion;
    // 资源的类型
    type: MeterialMetaType;
    // 资源名称
    name: string;
    // 资源别名
    alias?: string;
    url?: string;
    getMetrial(...arg: unknown[]): any;
}

type PropsAndExtraBase = Record<keyof any, any>;
type StyleBase = Record<keyof any, any>;

// 组件资源中组件的配置
export interface ComponentConfig {
    props?: PropsAndExtraBase | boolean;
    // 暴露出来的方法
    publicMethod?: string[];
    // 发布的事件
    publicEvent?: (string | { name: string; params: string[] })[];
    styles?: StyleBase | boolean;
    extra?: PropsAndExtraBase;
}

// 组件资源中组件的编辑配置
export interface ComponentEditConfig {
    showInNav?: boolean;
    drag?: boolean;
}

// 组件分类方式： 布局
// 布局组件和原子组件
type ComponentLayoutClassify = {
    layoutComponent: 'block' | 'page' | 'absolute';
    atomComponent: 'atom';
};

export enum ComponentLayoutName {
    Block = 'block',
    Page = 'page',
    Absolute = 'absolute',
    Atom = 'atom'
}

export interface LayoutComponentEditConfig extends ComponentEditConfig {
    locked?: boolean;
}

type ComponentLayoutEditConfig = {
    layoutComponent: LayoutComponentEditConfig;
    atomComponent: ComponentEditConfig;
};

// 组件资源的配置
export interface ComponentMeterialMeta<
    LayoutName extends ComponentLayoutName = ComponentLayoutName.Atom
> extends MeterialMeta {
    componentConfig?: ComponentConfig;
    componentEditConfig?: ComponentLayoutEditConfig[IncludeTo<
        ComponentLayoutClassify,
        LayoutName
    >];
    componentEditPanel?: any[];
    componentName: string;
    componentIcon?: string;
    componentLayoutType?: LayoutName;
}

// setter资源配置
export interface SetterMeterialMeta extends MeterialMeta {
    type: 'setter';
    setterName: string;
    setterConfig?: {
        layout: boolean;
    };
}

// 保存的节点树资源配置
export interface TreeNodeMetaBase<
    LayoutName extends ComponentLayoutName = ComponentLayoutName.Atom
> extends Pick<
        ComponentMeterialMeta<LayoutName>,
        | 'version'
        | 'url'
        | 'componentEditConfig'
        | 'componentName'
        | 'componentConfig'
    > {
    id: string;
    childrens?: TreeNodeMetaBase[];
}

export interface JSONSchemeData {
    pages: TreeNodeMetaBase[];
}

export type GetMeterialMeta = () => MaybePromise<
    MaybeArray<MeterialMeta | GetMeterialMeta>
>;
export type MeterialRegister = GetMeterialMeta extends () => MaybePromise<
    infer U
>
    ? U
    : never;

export type MeterialConfig = {
    meterialSource?: MeterialRegister;
    persistent?: boolean;
};
