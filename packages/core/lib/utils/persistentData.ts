// 数据存储器
class PersistentData {
    private data: Map<string, Map<string, any>> = new Map();
    getData(key: string) {
        if (!this.data.has(key)) {
            this.data.set(key, new Map());
        }
        return this.data.get(key)!;
    }
    deleteData(key: string | undefined) {
        if (key) {
            this.data.delete(key);
        } else {
            this.data = new Map();
        }
    }
}

export default new PersistentData();
