function Animal(type,name,age,sex){
    this.type = type;
    this.name = name;
    this.age  = age;
    this.sex = sex;
}

Animal.prototype.print = function (){
    console.log(`${this.type}`)
    console.log(`${this.name}`)
    console.log(`${this.age}`)
    console.log(`${this.sex}`)
}