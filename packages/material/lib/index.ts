import blockContainerPlugin, {
    blockContainerComponent
} from './blockContainer';
import pageContainerPlugin from './pageContainer/index';
import testPlugin from './text/index';
import innerBlockTest from './innerBlockTest/index';

export default [
    blockContainerPlugin,
    pageContainerPlugin,
    testPlugin,
    innerBlockTest
];
export { blockContainerComponent, blockContainerPlugin, pageContainerPlugin };
