const normalProperty = <T>(
    target: T,
    propertyPath: string
):
    | {
          lastProperty: string | undefined;
          target: any;
      }
    | false => {
    const list = propertyPath
        .split('.')
        .map(item => item.replace(/\[|\]/g, '*').split('*'))
        .filter(str => str)
        .flat();
    const lastProperty = list.pop();
    let currentTarget = target;

    for (let i = 0; i < list.length; i++) {
        const property = list[i];
        if (currentTarget && typeof currentTarget[property] == 'object') {
            currentTarget = currentTarget[property];
        } else {
            return false;
        }
    }

    if (!(currentTarget && typeof currentTarget == 'object')) {
        return false;
    }
    return {
        lastProperty,
        target: currentTarget
    };
};
export default normalProperty;
