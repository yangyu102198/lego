export const getProps = () => {
    return {
        engin: Object,
        treeNode: Object,
        src: {
            type: String,
            default:
                'https://img.alicdn.com/tps/TB16TQvOXXXXXbiaFXXXXXXXXXX-120-120.svg'
        },
        title: {
            type: String
        },
        alt: {
            type: String
        }
    };
};
