import TreeNode from './TreeNode';
import { Postion } from '@type/treeNode';
import { ToPartial } from '@type/utils';
import TreeNodeFactory from './TreeNodeFactory';
import ExpiredCache from '@utils/ExpiredCache';
import { JSONSchemeData, TreeNodeMetaBase } from '@type/meterialMeta';
import { HooksInstanceDriver } from '@type/hookInstance';
import Meterial from '../meterial';

const cache = new ExpiredCache();
export default class TreeNodeManage {
    public rootNodeActived!: TreeNode | null;
    public treeNodeContainer: TreeNode[] = [];
    public selectedNode: TreeNode[] = [];
    private treeNodeFactory: TreeNodeFactory;
    constructor(
        private driver: HooksInstanceDriver,
        private meterial: Meterial
    ) {
        this.treeNodeFactory = new TreeNodeFactory(this.meterial);
    }
    createTreeNodeByScheme(scheme: JSONSchemeData) {
        const treeNodeContainer = this.treeNodeFactory.createTreeNodeByScheme(
            scheme,
            node => {
                this.driver.treeNodeCreate.call(node);
            }
        );
        this.treeNodeContainer.push(...treeNodeContainer);
    }
    createTeeNode(
        nameOrData: ToPartial<TreeNodeMetaBase, 'id'> | string,
        parentNode?: TreeNode
    ): TreeNode {
        const node = this.treeNodeFactory.createTeeNode(nameOrData, parentNode);
        this.driver.treeNodeCreate.call(node);
        return node;
    }
    //创建临时树节点，会放入缓存，固定时间后失效
    createTempTreeNode(nameOrData) {
        const node = this.createTeeNode(nameOrData);
        cache.set(node.id, node);
        return node;
    }
    moveNodeTo(
        anchorNodeId: string,
        insertPostion: 'before' | 'after' | 'first' | 'last',
        targetNodeId: string
    ) {
        const getNodeFromActivedNode = (id): TreeNode | null => {
            let ret: TreeNode | null = null;
            if (this.rootNodeActived) {
                this.rootNodeActived.travese(node => {
                    if (node.id == id) {
                        ret = node;
                        return true;
                    }
                });
            }
            return ret;
        };
        // 需要移动的节点，先去缓存找，再在当前激活节点找。
        // 需要移动的节点有可能是性创建的
        const targetNode: TreeNode | null =
            cache.consume(targetNodeId) || getNodeFromActivedNode(targetNodeId);
        const anchorNode: TreeNode | null =
            getNodeFromActivedNode(anchorNodeId);
        if (targetNode && anchorNode) {
            switch (insertPostion) {
                case 'before':
                    if (anchorNode.parentNode) {
                        anchorNode.parentNode.insertNode(
                            anchorNode.parentNode.getChldNodeIndex(anchorNode),
                            targetNode
                        );
                    }
                    break;
                case 'after':
                    if (anchorNode.parentNode) {
                        anchorNode.parentNode.insertNode(
                            anchorNode.parentNode.getChldNodeIndex(anchorNode) +
                                1,
                            targetNode
                        );
                    }
                    break;
                case 'first':
                    anchorNode.insertNode(Postion.Last, targetNode);
                    break;
                case 'last':
                    anchorNode.insertNode(Postion.Last, targetNode);
                    break;
            }
        }
    }
    createRootTreeNode() {
        const rootTreeNode = this.createTeeNode('pageContainer');
        const num = this.treeNodeContainer.push(rootTreeNode) - 1;
        this.activeTreeNode(num);
    }
    activeTreeNode(num: number) {
        const rootNodeActived = this.treeNodeContainer[num];
        if (rootNodeActived) {
            this.rootNodeActived = rootNodeActived;
        }
    }
    setActivedRootNode(treeNode: TreeNode | null) {
        this.rootNodeActived = treeNode;
        this.driver.rootNodeActived.call(treeNode);
    }
    setSelectedNode(selectedNode: TreeNode[]) {
        this.selectedNode = selectedNode;
        this.driver.selectedNode.call(selectedNode);
    }
    copyNodeAndChild(node: TreeNode) {
        const copyNode = this.treeNodeFactory.copyNodeAndChild(node, node => {
            this.driver.treeNodeCreate.call(node);
        });
        return copyNode;
    }
}
