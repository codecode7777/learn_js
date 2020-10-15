'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
const income = "frilans";
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке?');
const mission = 5000000;
const period = 4;

/* let start = function() {
    money = prompt('ваш месячный доход?');

    while (!isNumber(money)) {
        money = prompt('ваш месячный доход?');
    }
}; */

//start();

do {
    money = prompt('ваш месячный доход?');
} while (!isNumber(money));

let showTypeOf = function(data) {
    console.log(typeof(data));
    return data;

};


let firstCostQuestion, secondCostQuestion;


function getExpensesMonth() {
    let sum = 0;

    for (let i = 0; i < 2; i++) {

        if (i === 0) {
            firstCostQuestion = +prompt('Введите обязательную статью расходов?');
        } else if (i === 1) {
            secondCostQuestion = +prompt('Введите обязательную статью расходов?');
        }


        sum += prompt('Во сколько это обойдется?');
        while (!isNumber(sum)) {
            sum += prompt('Во сколько это обойдется?');
        }

    }

    return sum;
}

let expensesAmount = getExpensesMonth();

function getAccumulatedMonth() {
    return money - expensesAmount;
}

const accumulatedMonth = getAccumulatedMonth();

function getTargetMonth() {
    if (mission / accumulatedMonth > 0) {
        return Math.ceil(mission / accumulatedMonth);
    } else if (mission / accumulatedMonth < 0) {
        return ('Цель не будет достигнута');
    }
}


const budgetDay = Math.ceil(accumulatedMonth / 30);

let getStatusIncome = function() {

    if (budgetDay > 1200) {
        return ('У вас высокий уровень дохода');
    } else if (budgetDay <= 1200 && budgetDay >= 600) {
        return ('У вас средний уровень дохода');
    } else if (budgetDay <= 600 && budgetDay >= 0) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
        return ('Что то пошло не так');
    }

};



//вывод в консоль по порядку как в тз

showTypeOf('тип переменной: ' + deposit);

console.log('расходы за месяц: ' + expensesAmount);

console.log('возможные расходы: ' + addExpenses.toLowerCase().split(', '));

console.log('срок достижения цели: ' + getTargetMonth(mission, accumulatedMonth));

console.log('дневной бюджет: ' + budgetDay);

console.log(getStatusIncome());