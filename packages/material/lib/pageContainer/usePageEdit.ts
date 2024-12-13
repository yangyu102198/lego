import { reactive } from 'vue';

function getDomElementPosition(domElement: HTMLElement) {
    return domElement.getBoundingClientRect();
}

export type PageEditApi = {
    getLinePostion(): Record<string, any> | void;
    isShow(): boolean;
    unbind(): void;
};

export const usePageEdit = (refPageDom, engin): PageEditApi => {
    const RD = reactive({
        position: [],
        show: false
    });
    const unBindRegionOver = engin.eventBus.on(
        'region-over',
        ({ data }: any) => {
            if (data?.position?.length) {
                RD.show = true;
                RD.position = data.position;
            }
        }
    );
    const unBindRegionLeaver = engin.eventBus.on('region-leaver', () => {
        RD.show = false;
    });
    const unBindRegionDrop = engin.eventBus.on('region-drop', () => {
        RD.show = false;
    });
    const getLinePostion = () => {
        if (refPageDom.value) {
            const { x, y } = getDomElementPosition(refPageDom.value!);
            const { position } = RD;
            return {
                left: position[0] - x + 'px',
                top: position[1] - y + 'px',
                width:
                    (position[1] == position[3]
                        ? position[2] - position[0]
                        : 3) + 'px',
                height:
                    (position[2] == position[0]
                        ? position[3] - position[1]
                        : 3) + 'px'
            };
        }
    };
    return {
        getLinePostion,
        isShow() {
            return RD.show;
        },
        unbind() {
            unBindRegionOver();
            unBindRegionLeaver();
            unBindRegionDrop();
        }
    };
};
