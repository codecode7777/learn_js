'use strict';

let money;
let firstCostQuestion, secondCostQuestion;

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let start = function() {

    do {
        money = prompt('ваш месячный доход?');
    } while (!isNumber(money));
};

start();



let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        let sum = 0,
            result1,
            result2;
        for (let i = 0; i < 2; i++) {

            i = 0;
            firstCostQuestion = prompt('Введите обязательную статью расходов?');
            do {
                result1 = prompt('Во сколько это обойдется?');
            } while (!isNumber(result1) || result1 === '');
            appData.expenses.res1 = firstCostQuestion + ': ' + result1;
            i = 1;
            secondCostQuestion = prompt('Введите обязательную статью расходов?');
            do {
                result2 = prompt('Во сколько это обойдется?');
            } while (!isNumber(result2) || result2 === '');
            appData.expenses.res2 = secondCostQuestion + ': ' + Number(result2);

            appData.expenses.summa = +result1 + Number(result2);


            /* if (i === 0) {
                firstCostQuestion = prompt('Введите обязательную статью расходов?');
                appData.expenses.firstA = firstCostQuestion;
            } else if (i === 1) {
                secondCostQuestion = prompt('Введите обязательную статью расходов?');
                appData.expenses.secondA = secondCostQuestion;
            }

            do {
                result = prompt('Во сколько это обойдется?');
                appData.expenses.look = result;
                console.log(appData.expenses.look);
            } while (!isNumber(result) || result === '');

            sum += +result;

        } */
            console.log(appData.expenses);
            /* console.log(appData.expenses.res1);
            console.log(appData.expenses.res2);
            console.log(appData.expenses.summa);
            console.log(appData.expenses.res1 + ' ' + appData.expenses.res2);
 */
        } //delete

    },

    /* getAccumulatedMonth: function() {
        return appData.budget - appData.sum;
    },

    getTargetMonth: function() {
        if (appData.mission / appData.getAccumulatedMonth > 0) {
            return Math.ceil(appData.mission / appData.getAccumulatedMonth);
        } else if (appData.mission / appData.getAccumulatedMonth < 0) {
            return ('Цель не будет достигнута');
        }
    },

    getStatusIncome: function() {

        if (appData.budgetDay > 1200) {
            return ('У вас высокий уровень дохода');
        } else if (appData.budgetDay <= 1200 && appData.budgetDay >= 600) {
            return ('У вас средний уровень дохода');
        } else if (appData.budgetDay <= 600 && appData.budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return ('Что то пошло не так');
        }

    } */

};

appData.asking();

/* let expensesAmount = getExpensesMonth();
const accumulatedMonth = getAccumulatedMonth();
const budgetDay = Math.ceil(accumulatedMonth / 30); */


/* console.log('расходы за месяц: ' + expensesAmount);

console.log('возможные расходы: ' + addExpenses.toLowerCase().split(', '));

console.log('срок достижения цели: ' + getTargetMonth(mission, accumulatedMonth));

console.log('дневной бюджет: ' + budgetDay);

console.log(getStatusIncome()); */