import { TreeNode, type FnType, ComponentLayoutName } from '@lego/core';
import Layout from './Layout';
import { getDomElementPosition, bindDomEvent, removeDomEvent } from '../utils';
import { Message, TempData } from './type';

// 绑定元素的拖动事件
export default class LayoutEventLinker {
    private emitData: TempData = {};
    private removeListern = () => {};
    constructor(
        private node: TreeNode,
        private Layout: Layout,
        private callback: FnType
    ) {}
    addNodeLister(el: HTMLElement) {
        bindDomEvent(el, 'dragover', this.getDragOverHandler(el));
        bindDomEvent(el, 'dragleave', this.getDragLeaverHandler());
        bindDomEvent(el, 'drop', this.getDragDropHandler());
        this.removeListern = () => {
            removeDomEvent(el, ['dragover', 'dragleave', 'drop']);
        };
    }
    private getDragLeaverHandler() {
        return event => {
            event.preventDefault();
            event.stopPropagation();
            this.emitData.result = undefined;
            this.callback('region-leaver');
        };
    }
    private getDragDropHandler() {
        return event => {
            event.preventDefault();
            event.stopPropagation();
            // 当有结果信息时，更新树
            if (this.emitData.result) {
                this.callback('region-drop', {
                    data: this.emitData.result
                });
            }
        };
    }
    private getDragOverHandler(currentEl: HTMLElement) {
        return event => {
            // 获取拖动的layout数据
            let layoutData: Message | null;
            // 解析拖动的数据
            try {
                layoutData = (window as any).__tmpLayoutData.layout;
                if (!layoutData) {
                    return;
                }
            } catch (_e) {
                return;
            }
            // 当reqion对象接收目标时：
            if (
                this.Layout.accept({
                    id: layoutData.id,
                    target: layoutData.target
                })
            ) {
                this.callback('region-accept');
                event.preventDefault();
                event.stopPropagation();
                // 获取当前node的位置信息
                const layoutPosition = getDomElementPosition(currentEl);
                // 获取有效的子节点，目前判断是否有挂载
                const availableChildNode = this.node.childNodes.filter(
                    childNode => {
                        return childNode.component?.$el;
                    }
                );
                // 获取有效子节点的位置信息
                const availableAnchors = availableChildNode.map(childNode => {
                    const nodeLayoutType: ComponentLayoutName =
                        childNode.configApplier.getDefaultConfig(
                            'componentLayoutType'
                        ) || ComponentLayoutName.Atom;
                    const rect = getDomElementPosition(
                        childNode.component!.$el!
                    );
                    return {
                        left: rect.left,
                        top: rect.top,
                        width: rect.width,
                        height: rect.height,
                        layoutType: nodeLayoutType
                    };
                });
                const result = this.Layout.calcAnchor(
                    layoutPosition,
                    availableAnchors,
                    {
                        left: event.clientX,
                        top: event.clientY
                    }
                );

                if (result) {
                    // 当计算结果有位置信息时，回调。可以用于界面的变化
                    this.callback('region-over', {
                        data: {
                            position: result.position ? result.position : null
                        }
                    });
                    // 记录需要更新的信息
                    this.emitData.result = {
                        anchorNodeId:
                            result.insertIndex !== 'self'
                                ? availableChildNode[result.insertIndex].id
                                : this.node.id,
                        insertPostion: result.insertPostion,
                        targetNodeId: layoutData.id
                    };
                }
            }
        };
    }
    destroyed() {
        this.removeListern();
    }
}
