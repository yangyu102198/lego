export default class ExpiredCache extends Map<string, any> {
    private levels: Set<any>[] = [];
    private currentLevel = 0;
    private tickInterval!: ReturnType<typeof setInterval> | number;
    private tickTime: number;
    constructor(private expiredTime: number = 20000) {
        super();
        for (let i = 0; i < 5; i++) {
            this.levels.push(new Set());
        }
        this.tickTime = this.expiredTime / 5;
    }
    set(key: string, value: any) {
        super.set(key, value);
        this.handleTick(key);
        return this;
    }
    consume(key: string) {
        const data = this.get(key);
        if (data) {
            this.delete(key);
        }
        return data;
    }
    private handleTick(key: string) {
        const level = this.levels[this.currentLevel];
        level.add(key);
        if (!this.tickInterval) {
            this.tickInterval = setInterval(
                this.clearLevel.bind(this),
                this.tickTime
            );
        }
    }
    clearLevel() {
        this.currentLevel = ++this.currentLevel % 5;
        const levelToClear = this.levels[this.currentLevel];

        if (levelToClear.size) {
            levelToClear.forEach(key => {
                this.delete(key);
            });
        }
        if (!this.size) {
            clearInterval(this.tickInterval);
            this.tickInterval = 0;
        }
    }
}
