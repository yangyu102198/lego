interface Task<T> {
    (): Promise<T> | T;
}
type QueueItem = {
    resolve(result?: unknown): void;
    reject(err?: unknown): void;
    task: Task<unknown>;
};

const DEFAULT_MAX_PARALLEL = 20;
class Queue {
    private queue: QueueItem[] = [];
    constructor(private maxParallel: number = DEFAULT_MAX_PARALLEL) {}
    run<T>(task: Task<T>): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.queue.push({
                resolve,
                reject,
                task
            });
            this.work();
        });
    }
    private async work(): Promise<void> {
        if (this.maxParallel <= 0) return;

        let entry: QueueItem | undefined;

        while ((entry = this.queue.shift())) {
            const { resolve, reject, task } = entry;
            this.maxParallel++;
            try {
                const result = await task();
                resolve(result);
            } catch (e) {
                reject(e);
            }
            this.maxParallel--;
        }
    }
}
export default Queue;
