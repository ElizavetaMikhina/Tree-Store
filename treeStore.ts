interface TreeItem {
    id: number | string;
    parent: number | string;
    type?: string | null;
}

export class TreeStore {
    private items: TreeItem[];

    constructor(items: TreeItem[]) {
        this.items = items;
    }

    getAll(): TreeItem[] {
        return this.items;
    }

    getItem(id: number | string): TreeItem | undefined {
        return this.items.find((item: TreeItem) => item.id === id);
    }

    getChildren(id: number | string): TreeItem[] {
        return this.items.filter((item: TreeItem) => item.parent === id);
    }

    getAllChildren(id: number | string): TreeItem[] {
        const children: TreeItem[] = [];
        const stack: (number | string)[] = [id];

        while (stack.length > 0) {
            const currentId = stack.pop()!;
            const currentChildren = this.getChildren(currentId);
            children.push(...currentChildren);
            stack.push(...currentChildren.map((child: TreeItem) => child.id));
        }

        return children;
    }

    getAllParents(id: number | string): TreeItem[] {
        const parents: TreeItem[] = [];
        let currentId: number | string | undefined = id;

        while (currentId !== undefined) {
            const parent = this.items.find((item: TreeItem) => item.id === currentId);
            if (parent) {
                parents.unshift(parent);
                currentId = parent.parent;
            } else {
                currentId = undefined;
            }
        }

        return parents;
    }
}