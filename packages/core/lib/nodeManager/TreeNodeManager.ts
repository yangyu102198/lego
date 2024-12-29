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
    // 激活的根节点
    public rootNodeActived!: TreeNode | null;
    // 节点树容器
    public treeNodeContainer: TreeNode[] = [];
    // 选中的节点
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
    setSelectedNode(selectedNode: TreeNode | TreeNode[], isClear = true) {
        selectedNode = Array.isArray(selectedNode)
            ? selectedNode
            : [selectedNode];

        // 调用处理程序处理选择的节点
        let result = this.driver.handlerSelectedNodes.call<TreeNode[]>(
            selectedNode,
            this.selectedNode,
            isClear
        );
        result = [
            ...new Set([...result, ...(isClear ? [] : this.selectedNode)])
        ];

        // 判断处理后的选择节点是否和当前相同
        const diff = () => {
            const oldSelectedNodesIds = this.selectedNode.map(node => node.id);
            const newSelectedNodeIds = result.map(node => node.id);
            const oldIdSet = new Set(oldSelectedNodesIds);
            const newIdSet = new Set(newSelectedNodeIds);
            const mergeIdSet = new Set([
                ...oldSelectedNodesIds,
                ...newSelectedNodeIds
            ]);
            if (
                oldIdSet.size == newIdSet.size &&
                oldIdSet.size == mergeIdSet.size
            ) {
                return true;
            }
        };
        if (!diff()) {
            this.selectedNode = result;
            this.driver.selectedNode.call(result);
        }
    }
    copyNodeAndChild(node: TreeNode) {
        const copyNode = this.treeNodeFactory.copyNodeAndChild(node, node => {
            this.driver.treeNodeCreate.call(node);
        });
        return copyNode;
    }
}
