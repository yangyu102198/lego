import Layout from './Layout';

// 可以绝对定位容器
export default class AbsoluteLayout extends Layout {
    constructor(node) {
        super(node);
    }
    accept() {
        return false;
    }
    calcAnchor() {
        return null;
    }
}
