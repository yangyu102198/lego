import BaseTips from './innerTips/BaseTIps';
import { DeleteTips } from './innerTips/DeleteTips';

interface TipsManager {
    tips: BaseTips[];
    addTips(tip: BaseTips): void;
}

const tipsManager: TipsManager = {
    tips: [DeleteTips],
    addTips(tip) {
        this.tips.push(tip);
    }
};

export default tipsManager;
