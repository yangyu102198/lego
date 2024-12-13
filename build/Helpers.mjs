import path from 'node:path';

export const Helpers = {
    rootDir: process.cwd(),
    resolve(...args) {
        return path.resolve(this.rootDir, ...args);
    },
    checkIsExternal(id, _parent, _isResolved) {
        let pathAlias = this.getPathAlias().map(alias => alias.find);
        let innerPathStart = ['.', '/', 'lib'].concat(pathAlias);
        let isInnerAlias = innerPathStart.some(path => {
            if (path instanceof RegExp) {
                return path.test(id);
            } else {
                return id.indexOf(path) == 0;
            }
        });
        return isInnerAlias ? false : true;
    },
    getPathAlias() {
        return [
            { find: /^@type/, replacement: `${this.rootDir}/lib/types` },
            { find: /^@utils/, replacement: `${this.rootDir}/lib/utils` },
            { find: /^@\//, replacement: `${this.rootDir}/lib/` },
            ...(this.__extendsAlias || [])
        ];
    },
    addAlias(find, replace) {
        if (this.__extendsAlias) {
            this.__extendsAlias = [];
        }
        this.__extendsAlias.push({
            find,
            replace: `${this.rootDir}/${replace}`
        });
    },
    getOutDir() {
        return this.resolve('./dist');
    }
};
