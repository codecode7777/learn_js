'use strict';

let money;
let question,
    answer,
    amount,
    sum = 0;

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const start = function() {

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

        for (let i = 0; i < 2; i++) {
            question = prompt('Введите обязательную статью расходов?');
            do {
                answer = prompt('Во сколько это обойдется?');
            } while (!isNumber(answer) || answer === '');
            appData.expenses[question] = +answer;
        }

        console.log(appData.expenses);

        for (let key in appData.expenses) {
            sum += appData.expenses[key];
        }

    },


    getBudget: function() {
        return appData.budgetDay - appData.budgetMonth;
    },


    getTargetMonth: function() {
        if (appData.mission / appData.getBudget() > 0) {
            return Math.ceil(appData.mission / appData.getBudget());
        } else if (appData.mission / appData.getBudget() < 0) {
            return ('Цель не будет достигнута');
        }
    },

    getStatusIncome: function() {

        if (appData.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (appData.budgetDay >= 600) {
            return ('У вас средний уровень дохода');
        } else if (appData.budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else if (appData.budgetDay < 0) {
            return ('Что то пошло не так');
        }

    }

};

appData.asking();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log(sum);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());


//const budgetDay = Math.ceil(accumulatedMonth / 30);