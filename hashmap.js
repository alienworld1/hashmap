const loadFactor = 0.75;

export default class HashMap {

    #size;
    #capacity;

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
          hashCode %= this.#size;
        }
     
        return hashCode;
      }
    
    constructor() {
        this.#size = 16;
        this.#capacity = 0;
    }
}