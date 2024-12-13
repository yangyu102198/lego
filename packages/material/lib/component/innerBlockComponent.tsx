import { defineComponent, type PropType } from 'vue';
import { Engin, TreeNode } from '@lego/core';

export default defineComponent({
    // expose: ['removeTreeNode'],
    props: {
        index: { type: Number, required: true },
        engin: { type: Object as PropType<Engin>, required: true },
        parentTreeNode: { type: Object as PropType<TreeNode>, required: true }
    },
    data() {
        return {
            treeNode: null
        } as {
            treeNode: TreeNode | null;
        };
    },
    methods: {
        removeTreeNode() {
            if (this.treeNode) {
                this.treeNode.removeSelf();
            }
        }
    },
    mounted() {
        if (this.engin.option.state == 'edit') {
            let treeNode = this.parentTreeNode.childNodes[this.index];

            if (!treeNode) {
                treeNode = this.engin.treeNodeManager.createTeeNode({
                    componentName: 'blockContainer',
                    componentEditConfig: {
                        drag: false
                    }
                });
            }
            this.parentTreeNode.insertNode(this.index, treeNode);
            this.treeNode = treeNode;
        }
    },
    render() {
        const vSlots = this.$parent?.$slots?.default;
        const currentNodeSlot = vSlots ? vSlots()[this.index] : [];
        return currentNodeSlot;
    }
});
