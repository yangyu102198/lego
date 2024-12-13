import { reactive } from 'vue';

export type PageEditApi = {
    isHightlight(): boolean;
    unbind(): void;
};

export const usePageEdit = (engin, treeNode): PageEditApi => {
    const RD = reactive({
        hightlight: false
    });
    const unBindRegionOver = engin.eventBus.on('region-over', ({ node }) => {
        if (treeNode.id == node.id) {
            RD.hightlight = true;
        }
    });
    const unBindRegionLeaver = engin.eventBus.on(
        'region-leaver',
        ({ node }) => {
            if (treeNode.id == node.id) {
                RD.hightlight = false;
            }
        }
    );

    return {
        isHightlight() {
            return RD.hightlight;
        },
        unbind() {
            unBindRegionOver();
            unBindRegionLeaver();
        }
    };
};
