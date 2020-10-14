'use strict';

const money = prompt('Ваш месячный доход?');
const income = "frilans";
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке?');
const mission = 5000000;
const period = 4;


let showTypeOf = function(data) {
    console.log(typeof(data));
    return data;

};


//lesson03


const save1 = prompt('Введите обязательную статью расходов?');
const save2 = prompt('Во сколько это обойдется?');
const save3 = prompt('Введите обязательную статью расходов?');
const save4 = prompt('Во сколько это обойдется?');



function getExpensesMonth(a, b) {
    return a + b;
}

function getAccumulatedMonth(money, save2, save4) {
    return money - save2 - save4;
}

const accumulatedMonth = getAccumulatedMonth(money, save2, save4);

function getTargetMonth(mission, accumulatedMonth) {
    return Math.ceil(mission / accumulatedMonth);
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

showTypeOf(deposit);

console.log(getExpensesMonth(Number(save2), Number(save4)));

console.log(addExpenses.toLowerCase().split(', '));

console.log(getTargetMonth(mission, accumulatedMonth));

console.log(budgetDay);

console.log(getStatusIncome());