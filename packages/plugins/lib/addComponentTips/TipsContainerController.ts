import { createApp, App, ComponentPublicInstance } from 'vue';
import { Engin, TreeNode } from '@lego/core';
import TipsContainer from './tips/tipsContainer.vue';

class TipsContainerMountController {
    private tipsApp!: App | null;
    constructor(private engin: Engin) {}
    mount(component, containerNode) {
        if (component.$el) {
            this.tipsApp = createApp(TipsContainer, {
                containerNode: containerNode,
                engin: this.engin
            });
            const wrap = document.createElement('div');
            (component.$el as HTMLElement).appendChild(wrap);
            this.tipsApp.mount(wrap);
        }
    }
    unMount() {
        if (this.tipsApp) {
            this.tipsApp.unmount();
            this.tipsApp = null;
        }
    }
}

const TipsContainerController = {
    addContainer(node: TreeNode, engin: Engin) {
        const tipsContainerMountController = new TipsContainerMountController(
            engin
        );
        node.event.on('setComponent', (component: ComponentPublicInstance) => {
            if (component.$el) {
                tipsContainerMountController.mount(component, node);
            }
        });
        // 节点销毁时，销毁tipsContainer
        const removedestroyedComponent = node.event.on(
            'destroyedComponent',
            () => {
                tipsContainerMountController.unMount();
            }
        );
        node.event.on('destoryed', () => {
            removedestroyedComponent();
            tipsContainerMountController.unMount();
        });
    }
};

export default TipsContainerController;
