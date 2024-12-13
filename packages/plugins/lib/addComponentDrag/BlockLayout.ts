import {
    type LayoutCalcResult,
    type AnchorInfo,
    type SourcePosition,
    type Message
} from './type';
import { ComponentLayoutName } from '@lego/core';
import Layout from './Layout';

// 页面级容器，可以添加所有容器
export default class BlockLayout extends Layout {
    layoutType = ComponentLayoutName.Block;
    constructor(id) {
        super(id);
    }
    accept(message: Message) {
        if (
            (!message.target || message.target == ComponentLayoutName.Atom) &&
            message.id !== this.id
        ) {
            return true;
        } else {
            return false;
        }
    }
    calcAnchor(
        _layoutPosition,
        anchors: AnchorInfo[],
        source: SourcePosition
    ): LayoutCalcResult {
        if (!anchors.length) {
            return {
                insertIndex: 'self',
                insertPostion: 'first'
            };
        } else {
            const result = this.calcClosestAnchorIndex(anchors, source);
            const selectedAnchor = anchors[result.anchorIndex];
            const isLeft = result.vertical == 'l';
            const vert =
                selectedAnchor.left + (isLeft ? 0 : selectedAnchor.width);

            return {
                insertIndex: result.anchorIndex,
                insertPostion: isLeft ? 'before' : 'after',
                position: [
                    vert,
                    selectedAnchor.top,
                    vert,
                    selectedAnchor.top + selectedAnchor.height
                ]
            };
        }
    }
}
