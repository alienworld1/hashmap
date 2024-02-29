import LinkedList from './linkedlist.js';

const loadFactor = 0.75;

export default class HashMap {

    #size;
    #capacity;
    #buckets;

    hash(key) {
        let hashCode = 0;
        key = String(key);
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
          hashCode %= this.#size;
        }
     
        return hashCode;
      }
    
    constructor() {
        this.clear();
    }

    set(key, value) {
        const keyHash = this.hash(key);

        if (!this.#buckets[keyHash]) {
            this.#buckets[keyHash] = new LinkedList({
                key,
                value,
            });
        } 

        else {
            this.#buckets[keyHash].append({
                key,
                value,
            });
        }

        this.#capacity += 1;
        if (this.#capacity > this.#size * loadFactor) {
            this.resize(); 
        }

    }

    get(key) {
        const keyHash = this.hash(key);

        if (!this.#buckets[keyHash]) {
            return null;
        }

        let node = this.#buckets[keyHash].head;

        while (node) {
            if (node.value.key === key) {
                return node.value.value;
            }
            node = node.next;
        }

        return null;
    }

    has(key) {
        const result = this.get(key);
        return (result !== null);
    }

    remove(key) {
        const keyHash = this.hash(key);

        if (!this.#buckets[keyHash]) {
            return false;
        }

        let node = this.#buckets[keyHash].head;
        let i = 0;

        while (node) {
            if (node.value.key === key) {
                this.#buckets[keyHash].removeAt(i);
                this.#capacity--;
                return true;
            }
            i++;
        }

        if (i === 0) {
            if (node.next) {
                this.#buckets[keyHash].removeAt(i);
            }
            else {
                this.#buckets[keyHash] = null;
            }
            this.#capacity--;
            return true;
        }

        return false;
    }

    get length() {
        return this.#capacity;
    }

    clear() {
        this.#size = 32;
        this.#capacity = 0;
        this.#buckets = [];
    }

    get keys() {
        const result = [];
        this.#buckets.forEach(element => {
            let node = element.head;
            while(node) {
                result.push(node.value.key);
                node = node.next;
            }
        })
        return result;
    }

    get values() {
        const result = [];
        this.#buckets.forEach(element => {
            let node = element.head;
            while(node) {
                result.push(node.value.value);
                node = node.next;
            }
        })
        return result;        
    }

    get entries() {
        const result = [];
        this.#buckets.forEach(element => {
            let node = element.head;
            while(node) {
                result.push([node.value.key, node.value.value]);
                node = node.next;
            }
        })
        return result;
    }

    resize() {
        const newSize = this.#size * 2;
        const entries = this.entries;

        this.clear();
        this.#size = newSize;

        for (const entry of entries) {
            this.set(entry[0], entry[1]);
        }
    }
}
