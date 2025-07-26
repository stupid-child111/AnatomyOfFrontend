class Animal {
    constructor(type, name, age, sex) {
        this.type = type;
        this.name = name;
        this.age = age;
        this.sex = sex;
    }

    print() {
        console.log(`${this.type}`)
        console.log(`${this.name}`)
        console.log(`${this.age}`)
        console.log(`${this.sex}`)
    }
}