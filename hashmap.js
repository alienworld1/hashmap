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
        this.#size = 32;
        this.#capacity = 0;
        this.#buckets = [];
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
}
