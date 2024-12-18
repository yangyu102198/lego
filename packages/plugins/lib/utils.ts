import { FnType, TreeNode } from '@lego/core';

export function getDomElementPosition(domElement: HTMLElement) {
    const postion = domElement.getBoundingClientRect();
    return postion;
}

const eventWeakMap = new WeakMap<
    HTMLElement,
    {
        [key: string]: {
            agent: FnType;
            eventList: FnType[];
        };
    }
>();

export function bindDomEvent(
    el: HTMLElement,
    eventName: string,
    handler: FnType
) {
    const elEvents = eventWeakMap.get(el) || {};
    const currentEvent = elEvents[eventName] || {
        agent: event => {
            currentEvent.eventList.forEach(handler => {
                handler(event);
            });
        },
        eventName,
        eventList: []
    };

    if (!elEvents[eventName]) {
        el.addEventListener(eventName, currentEvent.agent);
    }
    currentEvent.eventList.push(handler);
    elEvents[eventName] = currentEvent;
    eventWeakMap.set(el, elEvents);
}

export function removeDomEvent(
    el: HTMLElement,
    eventName?: string[] | string,
    handler?: FnType
) {
    const elEvents = eventWeakMap.get(el);
    if (elEvents) {
        const removeEventName: string[] = [];
        if (eventName) {
            if (typeof eventName === 'string') {
                removeEventName.push(eventName);
            } else {
                removeEventName.push(...eventName);
            }
        } else {
            removeEventName.push(...Object.keys(elEvents));
        }
        removeEventName.forEach(name => {
            if (elEvents[name]) {
                if (!handler) {
                    elEvents[name].eventList.length = 0;
                } else {
                    const index = elEvents[name].eventList.indexOf(handler);
                    elEvents[name].eventList.splice(index, 1);
                }
                if (!elEvents[name].eventList.length) {
                    el.removeEventListener(name, elEvents[name].agent);
                    delete elEvents[name];
                }
            }
        });
        if (!Object.keys(elEvents).length) {
            eventWeakMap.delete(el);
        }
    }
}

export const immediate = (fn: FnType) => {
    return Promise.resolve().then(fn);
};

// 判断节点是否锁定
// 获取当前节点或者祖先节点的locked配置
type nodeLockedInfo = {
    result: boolean;
    lockedNode?: TreeNode;
};
export const getNodeLocked = (node: TreeNode) => {
    const ret: nodeLockedInfo = {
        result: false
    };
    node.traveseParent(node => {
        const locked = node.configApplier.getCurrentConfig(
            'componentEditConfig.locked'
        );
        // 当获取到被锁定的节点后跳出遍历
        if (locked === true) {
            ret.result = true;
            ret.lockedNode = node;
            return true;
        }
    });
    return ret;
};
