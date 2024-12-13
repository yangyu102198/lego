import {
    type ModificationRule,
    type ModificationFunName,
    type ModificationContext,
    ArrayModificationRule,
    NormalModificationRule
} from './ModificationRules';

// 规则运行器接口
export interface RuleApplierInterface<
    Target,
    Context extends ModificationContext = ModificationContext
> {
    applyRule(
        actionType: ModificationFunName,
        modificationContext: Context,
        target: Target,
        propertyName: string,
        value?: unknown
    ): boolean;
    addRule(rule: ModificationRule<Target, Context>): void;
}

// 规则运行器
class RuleApplier<
    Target,
    Context extends ModificationContext = ModificationContext
> implements RuleApplierInterface<Target, Context>
{
    rules: ModificationRule<Target, Context>[] = [];
    constructor() {
        this.init();
    }
    init() {
        this.addRule(new ArrayModificationRule<Target, Context>());
        this.addRule(new NormalModificationRule<Target, Context>());
    }
    applyRule(
        actionType: ModificationFunName,
        modificationContext: Context,
        target: Target,
        propertyName: string,
        value?: unknown
    ): boolean {
        // 1. 过滤有用的规则
        // 2. 对过滤后的规则进行排序
        const matchRules = this.rules
            .filter(rule =>
                rule.apply(target, propertyName, modificationContext)
            )
            .sort((rule1, rule2) => {
                return rule1.level - rule2.level;
            });

        return matchRules.some(rule => {
            rule[actionType].call(
                null,
                target,
                propertyName,
                value,
                modificationContext
            );
        });
    }
    addRule(rule: ModificationRule<Target, Context>) {
        this.rules.push(rule);
    }
}

export default RuleApplier;
