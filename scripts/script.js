'use strict';

const start = document.getElementById('start');
const incomePlus = document.getElementsByTagName('button')[0];
const expensesPlus = document.getElementsByTagName('button')[1];
const possibleIncome = document.querySelectorAll('.additional_income-item');
const checkBox = document.querySelector('#deposit-check');
const adIncome = document.getElementsByClassName('additional_income-value')[0];
const totalSavedIncome = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const salary = document.querySelector('.salary-amount');
const dopAmmountTitle = document.getElementsByTagName('input')[2];
const mustExpensesTitle = document.getElementsByTagName('input')[6];
const mustExpenses = document.querySelector('.expenses-amount');
const mayExpenses = document.querySelector('.additional_expenses-item');
const depositCalcAmount = document.querySelector('.deposit-amount');
const depositCalcPercent = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
const cancel = document.querySelector('#cancel');
//const expensesMonth = document.getElementsByClassName('expenses_month-value')[0];
//const budgetDay = document.getElementsByClassName('budget_day-value')[0];
let expensesItems = document.querySelectorAll('.expenses-items'),
    range = document.querySelector('[type = "range"]'),
    incomeItems = document.querySelectorAll('.income-items'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.querySelector('.budget_month-value'),
    expensesMonth = document.getElementsByClassName('expenses_month-value')[0],
    mayExpensesEnd = document.getElementsByClassName('additional_expenses-value')[0],
    periodAmount = document.querySelector('.period-amount');

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
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    incomeMonth: 0,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function() {
        appData.budget = +salary.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();
    },


    getBudget: function() {
        appData.budgetMonth = +appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
    },


    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });

        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },


    getIncome: function() {
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = +cashIncome;
            }
        });

        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }

    },


    getAddExpenses: function() {
        let addExpenses = mayExpenses.value.split(', ');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },


    getAddIncome: function() {
        possibleIncome.forEach(function(item) {
            let itemValue = item.value.trim();
            if (item.value !== '') {
                appData.addIncome.push(itemValue);
            }
        });


    },


    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },


    addIncomeBlock: function() {
        let cloneIncomeItems = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },


    changeRange: function(event) {
        let stepValue = event.target.value;
        periodAmount.textContent = stepValue;
    },

    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonth.value = appData.expensesMonth;
        mayExpensesEnd.value = appData.addExpenses.join(', ');
        adIncome.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        totalSavedIncome.value = appData.calcPeriod();
        range.addEventListener('change', function() {
            if (appData.start) {
                totalSavedIncome.value = appData.budgetMonth * range.value;
            }
        });
    },


    getTargetMonth: function() {
        return targetAmount.value / appData.budgetMonth;
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


    calcPeriod: function() {
        return appData.budgetMonth * range.value;
    }

};


start.addEventListener('click', function() {
    if (salary.value !== '') {
        appData.start();
    }
});

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
range.addEventListener('change', appData.changeRange);