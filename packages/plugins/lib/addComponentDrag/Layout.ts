import {
    type LayoutCalcResult,
    type CalcClosestAnchorResult,
    type AnchorInfo,
    type SourcePosition,
    type Message
} from './type';

// 区域容器基类
// 计算和控制每种区域容器可以加入的容器
export default abstract class Layout {
    constructor(public id) {}
    protected calcClosestAnchorIndex(
        anchors: AnchorInfo[],
        source: SourcePosition
    ): CalcClosestAnchorResult {
        let closestAnchorIndex = -1;
        let closestDistance = Infinity;

        // 计算距离目标区域最近的锚点
        anchors.forEach((anchor, index) => {
            const anchorCenterLeft = anchor.left + anchor.width / 2;
            const anchorCenterTop = anchor.top + anchor.height / 2;
            const distance =
                Math.pow(anchorCenterLeft - source.left, 2) +
                Math.pow(anchorCenterTop - source.top, 2);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestAnchorIndex = index;
            }
        });

        //当存在这样的锚点时，返回锚点的索引和锚点的方位坐标
        const closestAnchor = anchors[closestAnchorIndex];
        const horizontal =
            closestAnchor.top + closestAnchor.height / 2 > source.top
                ? 't'
                : 'b';
        const vertical =
            closestAnchor.left + closestAnchor.width / 2 > source.left
                ? 'l'
                : 'r';
        return {
            anchorIndex: closestAnchorIndex,
            horizontal,
            vertical
        };
    }
    abstract accept(message: Message): boolean;
    abstract calcAnchor(
        layoutPosition: AnchorInfo,
        anchors: AnchorInfo[],
        source: SourcePosition
    ): LayoutCalcResult | null;
}
