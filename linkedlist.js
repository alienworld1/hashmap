function Node(value=null, next=null) {
    return {
        value,
        next,
    }
}

export default class LinkedList {

    #head;
    #tail;

    constructor(headValue) {
        const head = Node(headValue);
        this.#head = head;
        this.#tail = head;
    }

    get head() {
        return this.#head;
    }

    get tail() {
        return this.#tail;
    }

    append(value) {
        const node = Node(value);
        this.#tail.next = node;
        this.#tail = node;
    }

    prepend(value) {
        const node = Node(value);
        node.next = this.#head;
        this.#head = node;
    }

    get size() {
        let size = 1;
        let node = this.head;

        while (node.next) {
            size++;
            node = node.next;
        }

        return size;
    }

    at(index) {
        let node = this.head;

        for (let i = 0; i < index; i++) {
            node = node.next;
            if (!node) {
                return null;
            }
        }

        return node;
    }

    pop() {
        const size = this.size;
        if (size === 1) {
            throw new Error('The list contains only one node.');
        }

        this.#tail = this.at(size - 2);
        this.#tail.next = null;
    }

    contains(value) {
        let node = this.head;

        while(node) {
            if (node.value === value) {
                return true;
            }

            node = node.next;
        }

        return false;
    }

    find(value) {
        let node = this.head;
        for (let i = 0; node; i++) {
            if (node.value === value) {
                return i;
            }

            node = node.next;
        }

        return null;
    }

    toString() {
        let result = '';
        let node = this.head;

        while (node) {
            result += `${node.value} -> `;
            node = node.next;
        }

        result += 'null';
        return result;
    }

    insertAt(value, index) {
        if (index === 0) {
            this.prepend(value);
            return;    
        }

        const node = Node(value);
        const current = this.at(index - 1);

        if (!current) {
            throw new Error('This index is not accessible by this linked list.');
        }

        const next = current.next;

        current.next = node;
        node.next = next;
    }

    removeAt(index) {
        if (index === 0) {
            this.#head = this.#head.next;
            return;
        }

        const current = this.at(index - 1);
        if (!current.next) {
            throw new Error('The index does not exist in this linked list.');
        }

        current.next = current.next.next;

    }

}
