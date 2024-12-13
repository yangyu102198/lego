import Layout from './Layout';

// 可以绝对定位容器
export default class AbsoluteLayout extends Layout {
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
