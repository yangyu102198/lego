import {
    type LayoutCalcResult,
    type AnchorInfo,
    type SourcePosition
} from './type';
import Layout from './Layout';
import { ComponentLayoutName } from '@lego/core';

// 页面级容器，可以添加所有容器
export default class PageLayout extends Layout {
    constructor(id) {
        super(id);
    }
    accept() {
        return true;
    }
    private getMaxAnchorHeight(anchors: AnchorInfo[]) {
        let maxHeight = -1;
        anchors.forEach(anchor => {
            const anchorBottom = anchor.height + anchor.top;
            if (anchorBottom > maxHeight) {
                maxHeight = anchorBottom;
            }
        });
        return maxHeight;
    }
    calcAnchor(
        layoutPosition: AnchorInfo,
        anchors: AnchorInfo[],
        source: SourcePosition
    ): LayoutCalcResult {
        if (!anchors.length) {
            return {
                insertIndex: 'self',
                insertPostion: 'first'
            };
        } else {
            const maxAnchorHeight = this.getMaxAnchorHeight(anchors);
            // 增加页面容器的上下位置坐标
            const firstAnchor: AnchorInfo = {
                left: layoutPosition.left,
                width: layoutPosition.width,
                top: layoutPosition.top,
                height: 2
            };
            const secondAnchor: AnchorInfo = {
                left: layoutPosition.left,
                width: layoutPosition.width,
                top: maxAnchorHeight == -1 ? Infinity : maxAnchorHeight,
                height: 2
            };
            const result = this.calcClosestAnchorIndex(
                [firstAnchor, secondAnchor, ...anchors],
                source
            );

            if (result.anchorIndex == 0 || result.anchorIndex == 1) {
                const isFirstAnchor = result.anchorIndex == 0;
                const firstOrSecondAnchor = isFirstAnchor
                    ? firstAnchor
                    : secondAnchor;

                return {
                    insertIndex: 'self',
                    insertPostion: isFirstAnchor ? 'first' : 'last',
                    position: [
                        firstOrSecondAnchor.left,
                        firstOrSecondAnchor.top,
                        firstOrSecondAnchor.left + firstOrSecondAnchor.width,
                        firstOrSecondAnchor.top
                    ]
                };
            } else {
                const selectedAnchorIndex = result.anchorIndex - 2;
                const selectedAnchor = anchors[selectedAnchorIndex];

                if (selectedAnchor.layoutType == ComponentLayoutName.Block) {
                    const isBottom = result.horizontal == 'b';
                    const hori =
                        selectedAnchor.top +
                        (isBottom ? 0 : selectedAnchor.height);

                    return {
                        insertIndex: selectedAnchorIndex,
                        insertPostion: isBottom ? 'after' : 'before',
                        position: [
                            selectedAnchor.left,
                            hori,
                            selectedAnchor.left + selectedAnchor.width,
                            hori
                        ]
                    };
                } else {
                    const isLeft = result.vertical == 'l';
                    const vert =
                        selectedAnchor.left +
                        (isLeft ? 0 : selectedAnchor.width);

                    return {
                        insertIndex: selectedAnchorIndex,
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
    }
}
