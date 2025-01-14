import TreeNode from './TreeNode';
import { JSONSchemeData, TreeNodeMetaBase } from '@type/meterialMeta';
import { FnType, ToPartial } from '@type/utils';
import { genUUID } from '@utils/util';
import Meterial from '../meterial';
import ConfigApplier, { createTreeNodePropertySetWay } from './ConfigApplier';
// 树节点对外管理器
class TreeNodeFactory {
    constructor(private meterial: Meterial) {}
    // 通过scheme创建树
    createTreeNodeByScheme(scheme: JSONSchemeData, hander: FnType = () => {}) {
        const container: TreeNode[] = [];
        const iteratorCreateTreeNode = (
            data: TreeNodeMetaBase,
            parentNode?: TreeNode
        ): TreeNode => {
            const node = this.createTeeNode(data, parentNode);
            hander(node);
            const childNodes = data.childrens?.map(childData => {
                return iteratorCreateTreeNode(childData, node);
            });
            node.childNodes = childNodes || [];
            return node;
        };

        for (let i = 0; i < scheme.pages.length; i++) {
            const treeNodeScheme = scheme.pages[i];
            container.push(iteratorCreateTreeNode(treeNodeScheme));
        }
        return container;
    }
    // 创建树节点
    createTeeNode(
        nameOrData: ToPartial<TreeNodeMetaBase, 'id'> | string,
        parentNode?: TreeNode
    ): TreeNode {
        if (typeof nameOrData == 'string') {
            nameOrData = {
                componentName: nameOrData
            };
        }
        if (!nameOrData.id) {
            nameOrData.id = genUUID();
        }

        // 获取组件资源的默认数据
        const meterialMeta = this.meterial.getMeterialByType(
            'component',
            nameOrData.componentName
        ) as any as TreeNodeMetaBase;
        const componentMeterialMeta = meterialMeta[0];
        const configApplier = new ConfigApplier(
            componentMeterialMeta,
            nameOrData
        );
        configApplier.addPropertySetWay(createTreeNodePropertySetWay);
        const treeNode = new TreeNode(configApplier, parentNode);
        if (componentMeterialMeta.onTreeNodeCreate) {
            componentMeterialMeta.onTreeNodeCreate(treeNode);
        }
        return treeNode;
    }
    // copy树节点以及子节点
    copyNodeAndChild(node: TreeNode, hander: FnType = () => {}) {
        const iteratorCreateTreeNode = (
            node: TreeNode,
            parentNode?: TreeNode
        ) => {
            // 复制当前节点的配置
            const nodeConfig = node.copyConfig();
            // 删除原始节点的id
            nodeConfig.id = null;

            const copyNode = this.createTeeNode(nodeConfig, parentNode);

            hander(copyNode);
            const childrens = copyNode.childNodes.map(childNode => {
                return iteratorCreateTreeNode(childNode, copyNode);
            });

            copyNode.childNodes = childrens || [];
            return copyNode;
        };
        return iteratorCreateTreeNode(node);
    }
}

export default TreeNodeFactory;
