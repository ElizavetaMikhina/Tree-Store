"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeStore = void 0;
class TreeStore {
    constructor(items) {
        this.items = items;
    }
    getAll() {
        return this.items;
    }
    getItem(id) {
        return this.items.find((item) => item.id === id);
    }
    getChildren(id) {
        return this.items.filter((item) => item.parent === id);
    }
    getAllChildren(id) {
        const children = [];
        const stack = [id];
        while (stack.length > 0) {
            const currentId = stack.pop();
            const currentChildren = this.getChildren(currentId);
            children.push(...currentChildren);
            stack.push(...currentChildren.map((child) => child.id));
        }
        return children;
    }
    getAllParents(id) {
        const parents = [];
        let currentId = id;
        while (currentId !== undefined) {
            const parent = this.items.find((item) => item.id === currentId);
            if (parent) {
                parents.unshift(parent);
                currentId = parent.parent;
            }
            else {
                currentId = undefined;
            }
        }
        return parents;
    }
}
exports.TreeStore = TreeStore;
