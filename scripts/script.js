'use strict';

const start = document.getElementById('start');
const firstPlusBtn = document.getElementsByTagName('button')[0];
const expensesPlus = document.getElementsByTagName('button')[1];
const possibleIncomes1 = document.querySelectorAll('.additional_income-item')[0];
const possibleIncomes2 = document.querySelectorAll('.additional_income-item')[1];
const checkBox = document.querySelector('#deposit-check');
const adIncome = document.getElementsByClassName('additional_income-value')[0];
const adExpenses = document.getElementsByClassName('additional_expenses-value')[0];
const adPeriod = document.getElementsByClassName('income_period-value')[0];
const adTarget = document.getElementsByClassName('target_month-value')[0];
const salary = document.querySelector('.salary-amount');
const dopAmmountTitle = document.getElementsByTagName('input')[2];
const dopAmmount = document.querySelector('.income-amount');
const mustExpensesTitle = document.getElementsByTagName('input')[6];
const mustExpenses = document.querySelector('.expenses-amount');
const maybeExpenses = document.querySelector('.additional_expenses-item');
const depositCalcAmount = document.querySelector('.deposit-amount');
const depositCalcPercent = document.querySelector('.deposit-percent');
const range = document.querySelector('[type = "range"]');
const targetAmount = document.querySelector('.target-amount');
const cancel = document.querySelector('#cancel');
//const expensesMonth = document.getElementsByClassName('expenses_month-value')[0];
//const budgetDay = document.getElementsByClassName('budget_day-value')[0];

let expensesItems = document.querySelectorAll('.expenses-items'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.querySelector('.budget_month-value'),
    expensesMonth = document.getElementsByClassName('expenses_month-value');





const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


const appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function() {

        if (salary.value === '') {
            alert('must contain information');
            return;
        }

        appData.budget = salary.value;
        appData.getExpenses();
        //appData.asking();
        appData.getBudget();
        appData.getTargetMonth();
        appData.getStatusIncome();
        appData.getInfoDeposit();
        appData.showResult();
        console.log(appData.expensesMonth);
    },

    showResult: function() {
        budgetMonthValue = appData.budgetMonth;
        budgetDayValue = appData.budgetDay;
        expensesMonth = appData.expensesMonth;
    },

    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },

    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },

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
        appData.addExpenses = addExpenses.toUpperCase().split(', ').toString();
        appData.deposit = confirm('Есть ли у вас депозит в банке?');



    },


    getBudget: function() {
        appData.budgetMonth = +appData.budget - appData.expensesMonth;
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





start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);



//appData.getTargetMonth();
//appData.getStatusIncome();

//appData.getInfoDeposit();
//appData.calcSavedMoney();

/* console.log(appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome()); */

/* for (let key in appData) {
    console.log('Наша программа включает в себя данные: ' + key + appData[key]);
} */

//console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());

//console.log(appData.addExpenses);

console.log(appData.expenses);