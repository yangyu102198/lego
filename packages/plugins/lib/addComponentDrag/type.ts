import { ComponentLayoutName } from '@lego/core';

export type CalcClosestAnchorResult = {
    anchorIndex: number;
    horizontal: 't' | 'b';
    vertical: 'l' | 'r';
};

export type LayoutCalcResult = {
    insertIndex: 'self' | number;
    position?: [number, number, number, number];
    insertPostion: 'before' | 'after' | 'first' | 'last';
};
export type Message = {
    target: ComponentLayoutName;
    id: string;
};

export type AnchorInfo = {
    width: number;
    height: number;
    left: number;
    top: number;
    layoutType?: ComponentLayoutName;
};

export type SourcePosition = {
    left: number;
    top: number;
};

export type TempData = {
    result?: {
        anchorNodeId: string;
        insertPostion: LayoutCalcResult['insertPostion'];
        targetNodeId: string;
    };
};
