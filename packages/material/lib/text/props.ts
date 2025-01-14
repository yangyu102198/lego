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
        }
    };
};
