class HashMap {
    constructor() {
        this.bucketSize = 16;
        this.array = new Array(this.bucketSize).fill(null);
        this.loadFactor = 0.75;
        this.capacity = this.array.length;
        this.size = 0;
    };

    // checks array size
    // make it bigger if load factor is over 0.75
    load() {
        const length = this.length();

        if(length / this.capacity >= this.loadFactor) {
            this.bucketSize *= 2;
            const oldArray = [...this.array];
            this.array = oldArray.concatO(new Array(this.bucketSize).fill(null));
        }
        return length;
    };
    
    check(value) {
        if(value < 0 || value >= this.capacity) {
            throw new Error(`Trying to access index ${value}, which is out of bound`);
        }
    };

    hash(key) {
        let hashCode = 0;
        const primeNumber = 17;
        
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.bucketSize;
        }

        return hashCode;
    };

    set(key, value) {
        const bucket = this.hash(key);

        if(this.array[bucket]) {
            this.array[bucket].value = value;
        }

        this.array[bucket] = {key, value};
        this.load();
        this.size++;
    };

    get(key) {
        this.check(key);

        const bucket = this.hash(key);
        if(this.array[bucket]) return this.array[bucket].value;
        return null;
    };

    has(key) {
        const bucket = this.hash(key);
        if(this.array[bucket]) return true;
        return false;
    };

    remove(string) {
        let bucket = this.hash(string);
        if(!this.has(string)) return;
        
        console.log(`key: ${string}, hashcode: ${bucket}`);
        this.array.splice(bucket, 1);
        this.load();
        this.size -= 1;
        
        return true;
    };

    length() {
        let count = 0;
        for(let i = 0; i < this.array.length; i++) {
            if(this.array[i] != null) {
                count++;
            }
        }
        return count;
    };

    clear() {
        this.array = new Array(16).fill(null);
    };

    values() {
        let allValues = [];
        for(let i = 0; i < this.array.length; i++) {
            if(this.array[i] != null) {
                allValues.push(this.array[i].value);
            }
        }
        return allValues;
    };

    entries() {
        let list = [];
        for(let i = 0; i < this.array.length; i++) {
            if(this.array[i]) {
                list.push([this.array[i].key, this.array[i].value]);
            }
        }

        return list;
    };
};

const hashMap = new HashMap();
// console.log("hi");

hashMap.set("name", "jayce");
hashMap.set("hobby", "fish");
hashMap.set("gender", "male");
// hashMap.set("hobby", "read");


// console.log(hashMap.array);
// console.log(hashMap.size);
// console.log(hashMap.entries());
// console.log(hashMap.values());

hashMap.remove("name");
hashMap.remove("gender");
hashMap.remove("hobby");


// console.log(hashMap.length());
console.log(hashMap.array);
