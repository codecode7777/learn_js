'use strict';

let money;


const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const start = function() {

    do {
        money = prompt('ваш месячный доход?', 10000);
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
    percentDeposit: 0,
    moneyDeposit: 0,
    asking: function() {

        if (confirm('Есть ли у вас дополнительный заработок?')) {
            let itemIncome,
                cashIncome;

            do {
                itemIncome = prompt('Какой у вас дополнительей заработок?', 'Таксую');
            } while (isNumber(itemIncome) || itemIncome === '');

            cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
            appData.income[itemIncome] = cashIncome;
        }


        const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        let question,
            answer;

        for (let i = 0; i < 2; i++) {

            do {
                question = prompt('Введите обязательную статью расходов?', 'car');
            } while (isNumber(question) || question === '');

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
    },


    getInfoDeposit: function() {
        if (appData.deposit) {

            do {
                appData.percentDeposit = prompt('Какой годовой процент?', '10');
            } while (!isNumber(appData.percentDeposit) || appData.percentDeposit === '');

            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            } while (!isNumber(appData.moneyDeposit) || appData.moneyDeposit === '');

        }
    },


    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
    }

};






appData.asking();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

appData.getInfoDeposit();
appData.calcSavedMoney();

console.log(appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

/* for (let key in appData) {
    console.log('Наша программа включает в себя данные: ' + key + appData[key]);
} */

console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());



console.log(appData.addExpenses);

for (let key in appData.addExpenses) {
    let myStr = appData.addExpenses[key].charAt(0).toLocaleUpperCase() + appData.addExpenses[key].slice(1);
    myStr.toString();
    console.log(myStr);
}