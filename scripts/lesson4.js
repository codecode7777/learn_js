'use strict';

let money = 90000;
let income = "frilans";
let addExpenses = "Internet, Food, Lease, Utilities";
let deposit = false;
let mission = 5000000;
let period = 4;
let budgetDay = money / 30;

let showTypeOf = function(data) {
    console.log(typeof(data));
    return data;

};


//lesson03

let incomeMonth = prompt('Ваш месячный доход?');
money = incomeMonth;


let expenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
addExpenses = expenses;


/* let qdep = prompt('Есть ли у вас депозит в банке?');
deposit = qdep;

if (deposit === 'да') {
    console.log(!!deposit);
} else if (deposit === 'нет') {
    console.log(deposit);
} else {
    console.log('что-то не так');
} */

let exp1 = prompt('Введите обязательную статью расходов?');
let save1 = exp1;


let exp3 = prompt('Во сколько это обойдется?');
let save3 = Number(exp3);


let exp2 = prompt('Введите обязательную статью расходов?');
let save2 = exp2;


let exp4 = prompt('Во сколько это обойдется?');
let save4 = Number(exp4);


let getStatusIncome = function() {

    if (budgetDay > 1200) {
        return ('У вас высокий уровень дохода');
    } else if (1200 >= budgetDay >= 600) {
        console.log('У вас средний уровень дохода');
    } else if (600 >= budgetDay >= 0) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (budgetDay < 0) {
        return ('Что то пошло не так');
    }

};








function getExpensesMonth(a, b) {
    return a + b;
}

function getAccumulatedMonth(money, save3, save4) {
    return money - save3 - save4;
}

let accumulatedMonth = getAccumulatedMonth(money, save3, save4);

function getTargetMonth(mission, accumulatedMonth) {
    return Math.ceil(mission / accumulatedMonth);
}


budgetDay = Math.ceil(accumulatedMonth / 30);



//вывод в консоль по порядку как в тз

showTypeOf(deposit);

console.log(getExpensesMonth(save3, save4));

console.log(addExpenses.toLowerCase().split(', '));

console.log(getTargetMonth(mission, accumulatedMonth));

console.log(budgetDay);

console.log(getStatusIncome());