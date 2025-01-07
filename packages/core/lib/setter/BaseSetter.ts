import { h, VNode, Component } from 'vue';
import ApplyerFactory from './ApplyerFactory';
import { Applyer, SetterConfig } from '@type/setter';
import Engin from '../engine';
import TreeNode from '../nodeManager/TreeNode';
// import { buildSetterInstance } from '../utils/buildSetter';

export default class BaseSetter {
    children: any[] = [];
    applyer: Applyer;
    view!: Component;
    private isInitChildren = false;
    constructor(
        public engin: Engin,
        public treeNode: TreeNode,
        public setterConfig: SetterConfig
    ) {
        this.applyer = ApplyerFactory(
            {
                engin: engin,
                treeNode: treeNode,
                prop: setterConfig.prop || ''
            },
            setterConfig.applyer || {}
        );
    }
    addView(view: Component) {
        this.view = view;
    }
    addChildren(setterLists: BaseSetter[]) {
        this.children.push(...setterLists);
    }
    initChildren() {
        if (this.isInitChildren) {
            return;
        }
        const childConfig: Partial<SetterConfig>[] =
            this.setterConfig.children || [];
        this.children = [...this.children, ...childConfig].map(child => {
            if ('render' in child) {
                return child;
            } else {
                // return buildSetterInstance(this.engin, this.treeNode, child);
            }
        });
        this.isInitChildren = true;
    }
    private getChildren() {
        return this.children.map(child =>
            (child as BaseSetter).render()
        ) as VNode[];
    }

    render() {
        this.initChildren();
        return h(
            this.view,
            {
                setterConfig: this.setterConfig,
                treeNode: this.treeNode,
                engin: this.engin,
                applyer: this.applyer
            },
            [...this.getChildren()]
        );
    }
}
