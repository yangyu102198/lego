import { FnType, TreeNode, Engin } from '@lego/core';
import { TreeObserver } from './types';

class ObserveResize {
    private observeList: TreeObserver[] = [];
    private Observer: ResizeObserver;
    constructor(private resizeHandler: FnType) {
        this.Observer = new ResizeObserver(entries => {
            this.handlerResize(entries);
        });
    }
    observe(nodes: TreeNode[]) {
        const ids = nodes.map(node => node.id);
        const copyNodes = nodes.slice();
        const removeNodes: TreeNode[] = [];
        this.observeList.forEach(item => {
            const i = ids.indexOf(item.id);
            if (i == -1) {
                removeNodes.push(item.treeNode);
            } else {
                copyNodes.splice(i, 1);
            }
        });

        copyNodes.forEach(node => {
            if (node.component?.$el) {
                const treeObserver = {
                    el: node.component.$el,
                    treeNode: node,
                    first: true,
                    id: node.id
                };
                this.observeList.push(treeObserver);
                this.Observer.observe(node.component.$el);
            }
        });
        this.unobserve(removeNodes);
    }
    unobserve(nodes: TreeNode[]) {
        nodes.forEach(node => {
            const id = node.id;
            const observeTree = this.observeList.find(item => item.id == id);
            if (observeTree) {
                this.Observer.unobserve(observeTree.el);
                const index = this.observeList.indexOf(observeTree);
                this.observeList.splice(index, 1);
            }
        });
    }
    private handlerResize(entries: ResizeObserverEntry[]) {
        const resizeNode: TreeNode[] = [];
        entries.forEach(({ target }) => {
            const treeObserver = this.observeList.find(item => {
                if (item.el == target) {
                    // 新加Observer的时候会触发回调，第一次不执行
                    if (item.first) {
                        item.first = false;
                    } else {
                        return true;
                    }
                }
            });
            if (treeObserver) {
                resizeNode.push(treeObserver.treeNode);
            }
        });
        // 当有节点发生了尺寸变化时，触发treeNode-actived-resize回调
        if (resizeNode.length) {
            this.resizeHandler('treeNode-actived-resize', resizeNode);
        }
    }
}

let resizeObserver: ObserveResize | null = null;

export default {
    init(handler, engin) {
        resizeObserver = new ObserveResize(handler);
        this.addEvent(engin);
        return resizeObserver;
    },
    addEvent(engin: Engin) {
        engin.hooks.selectedNode.tap(nodes => {
            resizeObserver!.observe(nodes);
        });
        engin.hooks.treeNodeCreate.tap(node => {
            node.event.on('destroyedComponent', () => {
                resizeObserver!.unobserve([node]);
            });
        });
    }
};
