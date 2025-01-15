import blockContainerMeterial, {
    blockContainerComponent
} from './blockContainer';
import pageContainerMeterial, {
    pageContainerComponent
} from './pageContainer/index';
import textMeterial, { textComponent } from './text/index';
import imageMeterial, { imageComponent } from './image/index';

import innerBlockContainerMeterial, {
    innerBlockContainerComponent
} from './innerBlockContainer/index';

export default [
    blockContainerMeterial,
    pageContainerMeterial,
    textMeterial,
    imageMeterial,
    innerBlockContainerMeterial
];
export {
    blockContainerComponent,
    pageContainerComponent,
    textComponent,
    imageComponent,
    innerBlockContainerComponent
};
