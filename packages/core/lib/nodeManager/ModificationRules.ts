import normalProperty from '@utils/nomralProperty';

type UniversalRecord = Record<string, unknown>;
// 规则修改器接口的上下文参数接口
export interface ModificationContext {
    getOriginType(): unknown;
}

//规则修改器的接口名
export type ModificationFunName = 'delete' | 'change';

// 规则修改器接口
export interface ModificationRule<
    Target = UniversalRecord,
    Context extends ModificationContext = ModificationContext
> {
    level: number;
    change(
        target: Target,
        propertyName: string,
        value: unknown,
        modificationContext: Context
    ): boolean;
    delete(
        target: Target,
        propertyName: string,
        value: unknown,
        modificationContext: Context
    ): boolean;
    apply(
        target: Target,
        propertyName: string,
        modificationContext: Context
    ): boolean;
}
//数组类型的修改器
export class ArrayModificationRule<
    Target = UniversalRecord,
    Context extends ModificationContext = ModificationContext
> implements ModificationRule<Target, Context>
{
    level = 1;
    change(target: Target, propertyName: string, value: Target[keyof Target]) {
        const result = normalProperty(target, propertyName);
        if (result) {
            result.target[result.lastProperty!] = value;
            return true;
        }
        return false;
    }
    delete(target: Target, propertyName: string): boolean {
        const result = normalProperty<Target>(target, propertyName);

        if (result) {
            (result.target as unknown as number[]).splice(
                result.lastProperty as unknown as number,
                1
            );
            return true;
        }

        return false;
    }
    apply(
        _target: Target,
        _propertyName: string,
        modificationContext: Context
    ) {
        if (modificationContext.getOriginType() == Array) {
            return true;
        }

        return false;
    }
}

//一般类型的修改器
export class NormalModificationRule<
    Target = UniversalRecord,
    Context extends ModificationContext = ModificationContext
> implements ModificationRule<Target, Context>
{
    level = 0;
    change(target: Target, propertyName: string, value: Target[keyof Target]) {
        const result = normalProperty(target, propertyName);

        if (result) {
            result.target[result.lastProperty!] = value;
            return true;
        }
        return false;
    }
    delete(target: Target, propertyName: string): boolean {
        const result = normalProperty<Target>(target, propertyName);

        if (result) {
            delete result.target[result.lastProperty!];
        }
        return false;
    }
    apply(_target: Target, _propertyName: string, _modificationCtx: Context) {
        return true;
    }
}
