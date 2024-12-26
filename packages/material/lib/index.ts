import blockContainerMeterial, {
    blockContainerComponent
} from './blockContainer';
import pageContainerMeterial, {
    pageContainerComponent
} from './pageContainer/index';
import textMeterial, { textComponent } from './text/index';
import innerBlockContainerMeterial, {
    innerBlockContainerComponent
} from './innerBlockContainer/index';

export default [
    blockContainerMeterial,
    pageContainerMeterial,
    textMeterial,
    innerBlockContainerMeterial
];
export {
    blockContainerComponent,
    pageContainerComponent,
    textComponent,
    innerBlockContainerComponent
};
