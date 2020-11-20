'use strict';

const start = document.getElementById('start');
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
    periodAmount = document.querySelector('.period-amount');
let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');
const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const AppData = function() {

    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.mission = 50000;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;

};

AppData.prototype.check = function() {
    if (salary.value !== '') {
        start.removeAttribute('disabled');
    }
};

AppData.prototype.start = function() {
    this.budget = +salary.value;
    this.getExpenses();
    this.getIncome();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
};

AppData.prototype.getBudget = function() {
    this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.ceil(this.budgetMonth / 30);
};


AppData.prototype.getExpenses = function() {
    const _this = this;
    expensesItems.forEach(function(item) {
        const itemExpenses = item.querySelector('.expenses-title').value;
        const cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = cashExpenses;
        }
    });

    for (let key in _this.expenses) {
        this.expensesMonth += +_this.expenses[key];
    }
};

AppData.prototype.getIncome = function() {
    const _this = this;
    incomeItems.forEach(function(item) {
        const itemIncome = item.querySelector('.income-title').value;
        const cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = +cashIncome;
        }
    });

    for (let key in _this.income) {
        this.incomeMonth += +_this.income[key];
    }

};


AppData.prototype.getAddExpenses = function() {
    const _this = this;
    const addExpenses = mayExpenses.value.split(', ');
    addExpenses.forEach(function(item) {
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    });
};


AppData.prototype.getAddIncome = function() {
    const _this = this;
    possibleIncome.forEach(function(item) {
        const itemValue = item.value.trim();
        if (item.value !== '') {
            _this.addIncome.push(itemValue);
        }
    });


};


AppData.prototype.addExpensesBlock = function() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
    }
};


AppData.prototype.addIncomeBlock = function() {
    const cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
        incomePlus.style.display = 'none';
    }
};


AppData.prototype.changeRange = function(event) {
    const stepValue = event.target.value;
    periodAmount.textContent = stepValue;
};

AppData.prototype.showResult = function() {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonth.value = this.expensesMonth;
    mayExpensesEnd.value = this.addExpenses.join(', ');
    adIncome.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    totalSavedIncome.value = this.calcPeriod();
    range.addEventListener('change', function() {
        if (_this.start) {
            totalSavedIncome.value = _this.budgetMonth * range.value;
        }
    });
};


AppData.prototype.getTargetMonth = function() {
    return targetAmount.value / this.budgetMonth;
};


AppData.prototype.getStatusIncome = function() {
    if (this.budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
    } else if (this.budgetDay >= 600) {
        return ('У вас средний уровень дохода');
    } else if (this.budgetDay >= 0) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (this.budgetDay < 0) {
        return ('Что то пошло не так');
    }
};


AppData.prototype.getInfoDeposit = function() {
    if (this.deposit) {

        do {
            this.percentDeposit = prompt('Какой годовой процент?', '10');
        } while (!isNumber(this.percentDeposit) || this.percentDeposit === '');

        do {
            this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        } while (!isNumber(this.moneyDeposit) || this.moneyDeposit === '');

    }
};

AppData.prototype.calcPeriod = function() {
    return this.budgetMonth * range.value;
};

AppData.prototype.reset = function() {
    budgetMonthValue.value = '';
    budgetDayValue.value = '';
    expensesMonth.value = '';
    mayExpensesEnd.value = '';
    adIncome.value = '';
    targetMonthValue.value = '';
    totalSavedIncome.value = '';
    this.mission = 50000;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    totalSavedIncome.value = '';

    salary.value = '';
    incomeItems.forEach(function(item) {
        item.querySelector('.income-title').value = '';
        item.querySelector('.income-amount').value = '';
    });
    expensesItems.forEach(function(item) {
        item.querySelector('.expenses-title').value = '';
        item.querySelector('.expenses-amount').value = '';
    });
    possibleIncome[0].value = '';
    possibleIncome[1].value = '';
    mayExpenses.value = '';
    targetAmount.value = '';
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
};

AppData.prototype.addEventsListeners = function() {
    console.log(this);
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomePlus.addEventListener('click', this.addIncomeBlock);
    range.addEventListener('change', this.changeRange);
};





const appData = new AppData();

appData.addEventsListeners();


start.addEventListener('click', function() {

    if (salary.value !== '') {
        appData.start();
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

        start.style.display = 'none';
        cansel.style.display = 'inline-block';


        cansel.addEventListener('click', function() {
            appData.reset();
            cansel.style.display = 'none';
            start.style.display = 'inline-block';
        });

    } else {
        console.log('enter smth');
    }
});