class ClassWithStaticInitializationBlock1 {
    static staticProperty1 = "Normal static property";
    static staticProperty3;
    static {
        this.staticProperty2 = "let declared property within a static init block";
        this.staticProperty3 = "static property declared earlier but init in block";
    }
    constructor (prop4) {
        this.property4 = prop4;
    }
}

console.log(ClassWithStaticInitializationBlock1.staticProperty1);
console.log(ClassWithStaticInitializationBlock1.staticProperty2);
console.log(ClassWithStaticInitializationBlock1.staticProperty3);

let class1 = new ClassWithStaticInitializationBlock1("non static property");
console.log(class1.staticProperty1);
console.log(class1.property4);

class ClassWithStaticInitializationBlock2 {
    static staticProperty1 = ClassWithStaticInitializationBlock1.staticProperty1;
    static staticProperty2 = class1.property4;
    static staticProperty3 = ClassWithStaticInitializationBlock1.staticProperty2;
}

console.log(ClassWithStaticInitializationBlock2.staticProperty1);
console.log(ClassWithStaticInitializationBlock2.staticProperty2);
console.log(ClassWithStaticInitializationBlock2.staticProperty3);