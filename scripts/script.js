'use strict';

const start = document.getElementById('start'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    checkBox = document.querySelector('#deposit-check'),
    possibleIncomes = document.querySelectorAll('.additional_income-item');

const adIncome = document.getElementsByClassName('additional_income-value'),
    adExpenses = document.getElementsByClassName('additional_expenses-value'),
    adPeriod = document.getElementsByClassName('income_period-value'),
    adTarget = document.getElementsByClassName('target_month-value'),
    salary = document.querySelector('.salary-amount'),
    dopAmmountTitle = document.querySelector('.income-title'),
    dopAmmount = document.querySelector('.income-amount'),
    mustExpensesTitle = document.querySelector('.expenses-title'),
    maybeExpenses = document.querySelector('.additional_expenses-item'),
    depositCalcAmount = document.querySelector('.deposit-amount'),
    depositCalcPercent = document.querySelector('.deposit-percent');

const range = document.querySelector('[type = "range"]'),
    targetAmount = document.querySelector('.target-amount'),
    cancel = document.querySelector('#cancel');

let expensesItems = document.querySelectorAll('.expenses-items'),
    budgetDayValue = document.getElementsByClassName('budget_day-value'),
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