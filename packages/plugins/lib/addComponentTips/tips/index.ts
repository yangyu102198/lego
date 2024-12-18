import BaseTip from './innerTips/BaseTip';
import { DeleteTip } from './innerTips/DeleteTip';
import { IdentifierTip } from './innerTips/IdentifierTip';
import { CopyTip } from './innerTips/CopyTip';
import { LockTip } from './innerTips/LockTip';

interface TipsManager {
    tips: BaseTip[];
    addTips(tip: BaseTip): void;
}

const tipsManager: TipsManager = {
    tips: [IdentifierTip, CopyTip, LockTip, DeleteTip],
    addTips(tip) {
        this.tips.push(tip);
    }
};

export default tipsManager;
