import { Engin, TreeNode, SetterConfig, Applyer } from '@lego/core';

export type setterProps = {
    engin: Engin;
    treeNode: TreeNode;
    setterConfig: SetterConfig;
};
// export type setterDefaultProps<T extends SetterType = SetterType.Setter> =
//     T extends SetterType.Setter
//         ? {
//               applyer: Applyer;
//               engin: Engin;
//               treeNode: TreeNode;
//               setterConfig: SetterConfig;
//           }
//         : setterProps;
export type setterDefaultProps = {
    applyer: Applyer;
} & setterProps;
