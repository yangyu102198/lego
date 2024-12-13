import { FnType } from '@lego/core';

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
