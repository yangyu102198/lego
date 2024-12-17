import BaseTips from './innerTips/BaseTIps';
import { DeleteTips } from './innerTips/DeleteTips';
import { IdentifierTips } from './innerTips/IdentifierTips';
import { CopyTips } from './innerTips/CopyTips';

interface TipsManager {
    tips: BaseTips[];
    addTips(tip: BaseTips): void;
}

const tipsManager: TipsManager = {
    tips: [IdentifierTips, CopyTips, DeleteTips],
    addTips(tip) {
        this.tips.push(tip);
    }
};

export default tipsManager;
