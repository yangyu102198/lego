import Layout from './Layout';

// 组件级容器
export default class InnerLayout extends Layout {
    constructor(id) {
        super(id);
    }
    accept() {
        return false;
    }
    calcAnchor() {
        return null;
    }
}
