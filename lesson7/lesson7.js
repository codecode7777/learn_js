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
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
    },
    budget: money,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function() {
        let sum = 0,
            result;

        for (let i = 0; i < 2; i++) {

            if (i === 0) {
                firstCostQuestion = prompt('Введите обязательную статью расходов?');
            } else if (i === 1) {
                secondCostQuestion = prompt('Введите обязательную статью расходов?');
            }

            do {
                result = +prompt('Во сколько это обойдется?');
            } while (!isNumber(result));

            sum += +result;
        }

        return sum;
    },

    getAccumulatedMonth: function() {
        return appData.budget - appData.getExpensesMonth;
    },

    getTargetMonth: function() {
        if (appData.mission / appData.getAccumulatedMonth > 0) {
            return Math.ceil(appData.mission / appData.getAccumulatedMonth);
        } else if (appData.mission / appData.getAccumulatedMonth < 0) {
            return ('Цель не будет достигнута');
        }
    },

    budgetDay: function() {
        Math.ceil(appData.getAccumulatedMonth() / 30);
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
    }




};




console.log('расходы за месяц: ' + appData.getExpensesMonth());

console.log('возможные расходы: ' + appData.asking());

//console.log('срок достижения цели: ' + appData.getTargetMonth(appData.mission, appData.getAccumulatedMonth));

//console.log('дневной бюджет: ' + appData.budgetDay());

//console.log(appData.getStatusIncome());