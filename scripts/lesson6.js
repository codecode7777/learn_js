'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};




function mainFunction() {
    const num = 7;

    function start() {
        let request = prompt('Угадай число от 1 до 100');

        if (request === null) {
            return confirm('Игра окончена');
        } else if (!isNumber(request)) {
            alert('Введи число!');
            return start();
        } else if (request > num) {
            alert('Загаданное число меньше');
            return start();
        } else if (request < num) {
            alert('Загаданное число больше');
            return start();
        } else if (+request === num) {
            return confirm('Поздравляю, Вы угадали!!!');
        }
    }

    start();

}


mainFunction();