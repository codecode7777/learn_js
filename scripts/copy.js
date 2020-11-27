'use strict';

const startBtn = document.getElementById('start');
const cansel = document.getElementById('cancel');
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
const cancel = document.querySelector('#cancel'),
    range = document.querySelector('[type = "range"]'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.querySelector('.budget_month-value'),
    expensesMonth = document.getElementsByClassName('expenses_month-value')[0],
    mayExpensesEnd = document.getElementsByClassName('additional_expenses-value')[0],
    periodAmount = document.querySelector('.period-amount'),
    allInput = document.querySelectorAll('input[type = text]');
let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');
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


        this.budget = +salary.value;
        this.getExpenses();
        this.getIncome();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
        salary.setAttribute('disabled', 'false');
        incomeItems.forEach(function(item) {
            item.querySelector('.income-title').setAttribute('disabled', 'false');
            item.querySelector('.income-amount').setAttribute('disabled', 'false');
        });
        expensesItems.forEach(function(item) {
            item.querySelector('.expenses-title').setAttribute('disabled', 'false');
            item.querySelector('.expenses-amount').setAttribute('disabled', 'false');
        });
        possibleIncome[0].setAttribute('disabled', 'false');
        possibleIncome[1].setAttribute('disabled', 'false');
        mayExpenses.setAttribute('disabled', 'false');
        targetAmount.setAttribute('disabled', 'false');

        startBtn.style.display = 'none';
        cansel.style.display = 'inline-block';


    },




    getBudget: function() {
        this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    },


    getExpenses: function() {
        expensesItems.forEach(function(item) {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });

        for (let key in appData.expenses) {
            this.expensesMonth += +appData.expenses[key];
        }
    },


    getIncome: function() {
        incomeItems.forEach(function(item) {
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = +cashIncome;
            }
        });

        for (let key in appData.income) {
            this.incomeMonth += +appData.income[key];
        }

    },


    getAddExpenses: function() {
        const addExpenses = mayExpenses.value.split(', ');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },


    getAddIncome: function() {
        possibleIncome.forEach(function(item) {
            const itemValue = item.value.trim();
            if (item.value !== '') {
                appData.addIncome.push(itemValue);
            }
        });


    },


    addExpensesBlock: function() {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },


    addIncomeBlock: function() {
        const cloneIncomeItems = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },


    changeRange: function(event) {
        const stepValue = event.target.value;
        periodAmount.textContent = stepValue;
    },

    showResult: function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonth.value = this.expensesMonth;
        mayExpensesEnd.value = this.addExpenses.join(', ');
        adIncome.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        totalSavedIncome.value = this.calcPeriod();
        range.addEventListener('input', function() {
            totalSavedIncome.value = appData.budgetMonth * range.value;
        });
    },


    getTargetMonth: function() {
        return targetAmount.value / this.budgetMonth;
    },


    getStatusIncome: function() {
        if (this.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (this.budgetDay >= 600) {
            return ('У вас средний уровень дохода');
        } else if (this.budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else if (this.budgetDay < 0) {
            return ('Что то пошло не так');
        }
    },


    getInfoDeposit: function() {
        if (this.deposit) {

            do {
                this.percentDeposit = prompt('Какой годовой процент?', '10');
            } while (!isNumber(this.percentDeposit) || this.percentDeposit === '');

            do {
                this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            } while (!isNumber(this.moneyDeposit) || this.moneyDeposit === '');

        }
    },


    calcPeriod: function() {
        return this.budgetMonth * range.value;
    },

    reset: function() {

        appData.mission = 50000;
        appData.budget = 0;
        appData.budgetDay = 0;
        appData.budgetMonth = 0;
        appData.expensesMonth = 0;
        appData.incomeMonth = 0;
        appData.percentDeposit = 0;
        appData.moneyDeposit = 0;
        appData.income = {};
        appData.addIncome = [];
        appData.expenses = {};
        appData.addExpenses = [];
        appData.deposit = false;

        range.value = 1;
        periodAmount.textContent = range.value;

        salary.removeAttribute('disabled');
        incomeItems.forEach(function(item) {
            item.querySelector('.income-title').removeAttribute('disabled');
            item.querySelector('.income-amount').removeAttribute('disabled');
        });
        expensesItems.forEach(function(item) {
            item.querySelector('.expenses-title').removeAttribute('disabled');
            item.querySelector('.expenses-amount').removeAttribute('disabled');
        });
        possibleIncome[0].removeAttribute('disabled');
        possibleIncome[1].removeAttribute('disabled');
        mayExpenses.removeAttribute('disabled');
        targetAmount.removeAttribute('disabled');

        for (let i = 1; i < incomeItems.length; i++) {
            incomeItems[i].remove();
            incomePlus.style.display = 'block';
        }

        for (let i = 1; i < expensesItems.length; i++) {
            expensesItems[i].remove();
            expensesPlus.style.display = 'block';
        }

        allInput.forEach(function(item) {
            item.value = '';
        });


    }

};

const Starter = appData.start.bind(appData);

startBtn.disabled = true;
salary.addEventListener('input', function() {
    startBtn.disabled = false;
});

startBtn.addEventListener('click', Starter);

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
range.addEventListener('change', appData.changeRange);
cansel.addEventListener('click', function() {
    appData.reset();
    cansel.style.display = 'none';
    startBtn.style.display = 'inline-block';
    startBtn.setAttribute('disabled', 'false');
});