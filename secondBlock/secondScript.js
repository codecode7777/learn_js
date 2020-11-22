'use strict';

class First {

    get hello() {
        return this.loger;
    }

    set hello(log) {
        return log;
    }
}

First.hello = console.log('Привет я метод родителя!');

//const Second = new First();
class Second extends First {
    hello() {
        console.log('А я наследуемый метод!');
    }

}

console.log(Second.hello());