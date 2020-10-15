'use strict';

const money = prompt('Ваш месячный доход?');
const income = "frilans";
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке?');
const mission = 5000000;
const period = 4;



console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

// console.log("Период равен " + period + " месяцам");
// console.log("Цель заработать " + mission + " долларов");



console.log(addExpenses.toLowerCase().split(', '));


//lesson03

const firstCostQuestion = prompt('Введите обязательную статью расходов?');
const firstCostAnswer = Number(prompt('Во сколько это обойдется?'));
const secondCostQuestion = prompt('Введите обязательную статью расходов?');
const secondCostAnswer = Number(prompt('Во сколько это обойдется?'));


const budgetMonth = money - firstCostAnswer - secondCostAnswer;
console.log('Бюджет на месяц: ' + budgetMonth);

const budgetDay = budgetMonth / 30;
console.log('Дневной бюджет: ' + Math.floor(budgetDay));

const time = mission / budgetMonth;
console.log('Цель будет достигнута за ' + Math.ceil(time) + ' месяцев');


if (budgetDay > 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay <= 1200 && budgetDay >= 600) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay <= 600 && budgetDay >= 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
    console.log('Что то пошло не так');
}