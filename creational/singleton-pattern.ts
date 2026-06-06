// What is singleton pattern ?
// Singleton pattern is the way to make sure that class can only be instantiated only once.

// How this pattern work is 
// when we create an object we save that instance in a private variable. 
// each time we create an object using that class we check if the that private alreay contain object or not 
// if already exist we simple that instance instead of creating new.
// if dont exist we create new one add that to that variable and return that object.


// Quick info : we usualy dont need this in node cause the node uses cached data once the module is imported.

class Apple{
    // we are creating a private varible inside the class 
    private static instance:Apple;

    private constructor(){}
    static getInstance(){
        if(this.instance){
            return this.instance;
        }
        this.instance = new Apple();
        return this.instance;
    }
}


// othere way to implement singleton pattern
let fooInstance:Foo;  
class Foo{
    constructor(){
        if(fooInstance){
            return fooInstance;
        }
        fooInstance = this;
        return fooInstance;
    }
}

// they are equal 
const foo1 = new Foo();
const foo2 = new Foo();
