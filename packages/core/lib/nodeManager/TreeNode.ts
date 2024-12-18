import emitter from '@utils/emitter';
import { copy } from '@utils/util';
import { type TreeNodeMetaBase } from '@type/meterialMeta';
import { type FnType } from '@type/utils';
import { type TreeNodeEvent, Postion } from '@type/treeNode';
import RuleApplier, { RuleApplierInterface } from './RuleApplier';
import ConfigApplier from './ConfigApplier';

class TreeNode<NodeMetaData extends TreeNodeMetaBase = TreeNodeMetaBase> {
    public childNodes: TreeNode[] = [];
    public ruleApplier!: RuleApplierInterface<NodeMetaData>;
    public id: NodeMetaData['id'];
    public component!: any;
    public event = emitter<TreeNodeEvent>();
    constructor(
        public configApplier: ConfigApplier,
        public parentNode?: TreeNode
    ) {
        this.id = configApplier.getCurrentConfig('id');
    }
    // 当前节点移动到指定父节点
    moveTo(parent: TreeNode, postion: Postion | number) {
        parent.insertNode(postion, this);
    }
    insertNode(postion: Postion | number, node: TreeNode) {
        if (node.parentNode) {
            node.parentNode.delChildNode(node);
        }
        const len = this.childNodes.length;
        let index: number;
        if (postion == Postion.First) {
            index = 0;
        } else if (postion == Postion.Last) {
            index = len;
        } else {
            if (postion >= len) {
                index = len;
            } else {
                index = postion;
            }
        }
        this.childNodes.splice(index, 0, node);
        node.parentNode = this;
    }
    // 移除当前节点
    // 当移除节点的时候异步调用destroyed事件
    removeSelf() {
        if (this.childNodes.length) {
            this.childNodes.forEach(node => {
                node.removeSelf();
            });
        }
        if (this.parentNode) {
            this.parentNode.delChildNode(this);
        }
        Promise.resolve().then(() => this.destroyed());
    }
    removeChildNode(child: TreeNode) {
        const childIndex = this.childNodes.indexOf(child);
        if (childIndex >= 0 && child.parentNode == this) {
            child.removeSelf();
        }
    }
    getChldNodeIndex(node) {
        return this.childNodes.indexOf(node);
    }
    private delChildNode(child: TreeNode) {
        const childIndex = this.childNodes.indexOf(child);
        if (childIndex >= 0) {
            this.childNodes.splice(childIndex, 1);
        }
    }
    // 是否有子节点
    hasChildren() {
        return !!this.childNodes.length;
    }
    // 是否是根节点
    isRoot() {
        return this.parentNode == undefined;
    }
    getRoot() {
        if (this.isRoot()) {
            return this;
        } else {
            return this.parentNode?.getRoot();
        }
    }
    // 使用前序遍历node树
    travese(callback: FnType<any[], boolean | void>) {
        const iteratorNode = (nodes: TreeNode[]) => {
            return nodes.some(item => {
                if (callback(item)) {
                    return true;
                } else {
                    return iteratorNode(item.childNodes);
                }
            });
        };
        iteratorNode([this]);
    }
    // 从当前节点反向遍历父节点
    traveseParent(callback: FnType<TreeNode[], boolean | void>) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let currentNode: TreeNode | undefined = this;
        while (currentNode) {
            // 当反向遍历回调返回true时停止
            if (callback(currentNode)) {
                return;
            } else {
                currentNode = currentNode!.parentNode;
            }
        }
    }
    // 设置修改器
    attachModifier<T extends NodeMetaData>(applier: RuleApplierInterface<T>) {
        this.ruleApplier = applier;
    }
    getModifier() {
        if (!this.ruleApplier) {
            this.ruleApplier = new RuleApplier<NodeMetaData>();
        }
        return this.ruleApplier;
    }
    setComponent(component) {
        this.component = component;
        this.event.emit('setComponent', component);
    }
    destroyedComponent() {
        this.event.emit('destroyedComponent');
        this.component = null;
    }
    // 序列化
    serialize(): TreeNodeMetaBase {
        const serializeObj: TreeNodeMetaBase = {
            ...this.configApplier.getCurrentConfig(),
            childrens: []
        };

        this.childNodes.forEach(childNode => {
            serializeObj.childrens!.push(childNode.serialize());
        });
        return serializeObj;
    }
    destroyed() {
        this.event.emit('destoryed');
    }
    copyConfig() {
        return copy(this.configApplier.getCurrentConfig());
    }
}

export default TreeNode;
