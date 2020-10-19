'use strict';

let money;

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
            result,
            firstCostQuestion,
            secondCostQuestion;

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

        const expensesAmount = sum;
        const accumulatedMonth = appData.budget - expensesAmount;

        //getTargetMonth
        if (appData.mission / accumulatedMonth > 0) {
            return Math.ceil(appData.mission / accumulatedMonth);
        } else if (appData.mission / accumulatedMonth < 0) {
            return ('Цель не будет достигнута');
        }

        let budgetDay = Math.ceil(accumulatedMonth / 30);

        //getStatusIncome
        if (budgetDay > 1200) {
            return ('У вас высокий уровень дохода');
        } else if (budgetDay <= 1200 && budgetDay >= 600) {
            return ('У вас средний уровень дохода');
        } else if (budgetDay <= 600 && budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return ('Что то пошло не так');
        }

    }

};


appData.asking();