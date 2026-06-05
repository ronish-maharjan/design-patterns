// What is Factory Pattern? 
// Factory pattern is were we hide the complexity of creation objects. and create the object based on given options 
//                                                  or 
// A Factory is a place where object creation logic is centralized and hidden from the rest of the system, so the caller only requests what it wants, not how to build it.


// This is what i worte for factory pattern ( its less easy to scale / can use for small items)

type AvailabeFruits = "apple"|"banana"|"orange"
type FruitFactoryReturnType = Apple|Banana|Orange

abstract class Fruit {
    abstract name:string;
    abstract color:string;
    abstract count:number;
}


class Apple extends Fruit{
    name:string = "apple";
    color:string = "red";
    count = 44;
}

class Banana extends Fruit{
    name:string = "banana";
    color:string = "yellow";
    count = 44;
}

class Orange extends Fruit{
    name:string = "orange";
    color:string = "orange";
    count = 44;
}



class FruitFactory{

    static create(fruit:AvailabeFruits):FruitFactoryReturnType{
        const choosedFruit:AvailabeFruits = fruit.toLowerCase() as AvailabeFruits;

        switch(choosedFruit){
            case "apple": 
                return new Apple();
            case "banana":
                return new Banana();
            case "orange":
                return new Orange();
            default:
                const something:never = choosedFruit
                return something;
        }

    }

}


// This is what senior developer suggest

// First create a mapper 
// Its the only place dev have to edit if wanted to add new items

// One key point in the type here we use new ()=> Fruit cause it mean a function that can be instanciated and return object of Fruit
const FruitMap = {
    "apple":Apple,
    "banana":Banana,
    "orange":Orange
}as const;

// Just create a type for Fruit that is generated automatically

type Fruits = keyof typeof FruitMap;


class ScalableFruitFactory{

    static create(fruit:Fruits){
        const choosedFruit =fruit.toLowerCase() as Fruits;
        const fruitClass = FruitMap[choosedFruit];
        return new fruitClass();
    };
}

// How do we use it in the real code 
// suppose we have notify usecase and user can pick mulitple options to be notified like from mail, sms, or whatsapp

interface Notifier{
    execute():Promise<boolean>;
}

class EmailNotifier implements Notifier {
    async execute():Promise<boolean>{
        return true;
    } 
}

class SmsNotifier implements Notifier {
    async execute():Promise<boolean>{
        return true;
    } 
}

class WhatsappNotifier implements Notifier {
    async execute():Promise<boolean>{
        return true;
    } 
}

const NotifierMap = {
    "email":EmailNotifier,
    "sms":SmsNotifier,
    "whatsapp":WhatsappNotifier,
} as const;

type NotifierOptions = keyof typeof NotifierMap;



class NotifierFactory{
    static create(notifier:NotifierOptions):Notifier{
        const Notifier = NotifierMap[notifier]
        if(!Notifier){
            throw new Error("Passed invalid notify option")
        }
        return new Notifier;
        
    }
}

// Lets suppose we have Notify usecase so we can use this factory pattern like this 
class NotifyUsecase{
    async execute(notifier:NotifierOptions){
        const selectedNotifier = NotifierFactory.create(notifier)
        await selectedNotifier.execute()
    }
}

const userSelectedNotifier = "sms"
const notifyUsecase = new NotifyUsecase()
notifyUsecase.execute(userSelectedNotifier)



// Exercise 
// can show dublicate cause i havent commented above code 

interface Notifier{
    execute():Promise<boolean>;
}

class EmailNotifier implements Notifier{
    async execute():Promise<boolean>{
        return true;
    }
}


class WhatsAppNotifier implements Notifier{
    async execute():Promise<boolean>{
        return true;
    }
}

class SmsNotifier implements Notifier{
    async execute():Promise<boolean>{
        return true;
    }
}

const NotifierMap = {
    "email":EmailNotifier,
    "sms":SmsNotifier,
    "whatsapp":WhatsAppNotifier
}as const

type NotifierOptions = keyof typeof NotifierMap

class NotifyUsecase {
    async execute(options:NotifierOptions[]){
        options.forEach(async (option)=>{
                const selectedNotifier = NotifierMap[option]; 
                if(!selectedNotifier){
                    throw new Error(`No such option ${option}`)
                }
                const notifier = new selectedNotifier()
                await notifier.execute()

        })
    }
}

const usecase = new NotifyUsecase()
usecase.execute(["sms","whatsapp"])
