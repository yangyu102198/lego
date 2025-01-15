export const getProps = () => {
    return {
        engin: Object,
        treeNode: Object,
        textContent: {
            type: String,
            default: '文本内容'
        },
        mark: {
            type: Boolean,
            default: false
        },
        del: {
            type: Boolean,
            default: false
        },
        u: {
            type: Boolean,
            default: false
        },
        strong: {
            type: Boolean,
            default: false
        }
    };
};
