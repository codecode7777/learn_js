'use strict';

let money;


const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const start = function() {

    do {
        money = prompt('ваш месячный доход?');
    } while (!isNumber(money));
};

start();



const appData = {
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
        const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        let question,
            answer;

        for (let i = 0; i < 2; i++) {
            question = prompt('Введите обязательную статью расходов?');
            do {
                answer = prompt('Во сколько это обойдется?');
            } while (!isNumber(answer) || answer === '');
            appData.expenses[question] = +answer;
        }

        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }

    },


    getBudget: function() {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
        return appData.budgetDay;
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

console.log(appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

for (let key in appData) {
    console.log('Наша программа включает в себя данные: ' + key + appData[key]);
}