import { h, VNode, Component } from 'vue';
import ApplyerFactory from './ApplyerFactory';
import { Applyer, Setter, SetterConfig } from './types/setter';

export default abstract class BaseSetter implements Setter {
    children: Setter[] = [];
    appler: Applyer;
    view!: Component;
    constructor(public setterConfig: SetterConfig) {
        this.appler = ApplyerFactory(
            {
                treeNode: setterConfig.treeNode,
                key: setterConfig.key
            },
            setterConfig.applyer
        );
    }
    addView(view: Component) {
        this.view = view;
    }
    addChildren(setterLists: Setter[]) {
        this.children.push(...setterLists);
    }

    private getChildren() {
        return this.children.map(child => child.render()) as VNode[];
    }
    render() {
        return h(
            this.view,
            {
                setterConfig: this.setterConfig,
                treeNode: this.setterConfig.treeNode,
                key: this.setterConfig.key,
                appler: this.appler
            },
            [...this.getChildren()]
        );
    }
}
