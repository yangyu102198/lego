type EventType = string | symbol;
type Handler<T = unknown> = (event: T) => void;
type WildcardHandler<T = Record<string, unknown>> = (
    type: keyof T,
    event: T[keyof T]
) => void;

export interface Emitter<Events extends Record<EventType, unknown>> {
    on<Key extends keyof Events>(
        type: Key,
        handler: Handler<Events[Key]>
    ): () => void;
    on(type: '*', handler: WildcardHandler<Events>): () => void;
    off<Key extends keyof Events>(
        type: Key,
        handler?: Handler<Events[Key]>
    ): void;
    off(type: '*', handler: WildcardHandler<Events>): void;
    emit<Key extends keyof Events>(type: Key, event: Events[Key]): void;
    emit<Key extends keyof Events>(
        type: undefined extends Events[Key] ? Key : never
    ): void;
}

export default function emitterFactory<
    Events extends Record<EventType, any>
>(): Emitter<Events> {
    const map = new Map();

    const emitter: Emitter<Events> = {
        on(type, handler) {
            const handlers = map.get(type) || [];
            handlers.push(handler);
            map.set(type, handlers);
            // 返回一个 off 函数，用于移除事件监听
            return () => emitter.off(type, handler);
        },

        off(type, handler) {
            const handlers = map.get(type);
            if (!handlers) return;

            if (handler) {
                // 移除指定的 handler
                const index = handlers.indexOf(handler);
                if (index !== -1) {
                    handlers.splice(index, 1);
                    map.set(type, handlers);
                }
            } else {
                // 如果没有传递 handler，移除所有 handlers
                map.delete(type);
            }
        },
        emit(type, event?) {
            const handlers = map.get(type) || [];
            handlers.forEach(handler => handler(event));
            if (type != '*') {
                const wildCardHandler = map.get('*') || [];
                wildCardHandler.forEach(handler => handler(type, event));
            }
        }
    };
    return emitter;
}
