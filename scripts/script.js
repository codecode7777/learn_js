'use strict';

const start = document.getElementById('start'),
    cansel = document.getElementById('cancel'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    possibleIncome = document.querySelectorAll('.additional_income-item'),
    checkBox = document.querySelector('#deposit-check'),
    adIncome = document.getElementsByClassName('additional_income-value')[0],
    totalSavedIncome = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salary = document.querySelector('.salary-amount'),
    dopAmmountTitle = document.getElementsByTagName('input')[2],
    mustExpensesTitle = document.getElementsByTagName('input')[6],
    mustExpenses = document.querySelector('.expenses-amount'),
    mayExpenses = document.querySelector('.additional_expenses-item'),
    depositCalcAmount = document.querySelector('.deposit-amount'),
    depositCalcPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    cancel = document.querySelector('#cancel'),
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

class AppData {
    constructor() {
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
    }

    check() {
        if (salary.value !== '') {
            start.removeAttribute('disabled');
        }
    }

    start() {
        this.budget = +salary.value;
        this.getExpenses();
        this.getIncome();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
    }

    getBudget() {
        this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    }


    getExpenses() {
        expensesItems.forEach((item) => {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        });

        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }


    getIncome() {
        incomeItems.forEach((item) => {
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = +cashIncome;
            }
        });

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }


    getAddExpenses() {
        const addExpenses = mayExpenses.value.split(', ');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    }


    getAddIncome() {
        possibleIncome.forEach((item) => {
            const itemValue = item.value.trim();
            if (item.value !== '') {
                this.addIncome.push(itemValue);
            }
        });


    }


    addExpensesBlock() {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    }


    addIncomeBlock() {
        const cloneIncomeItems = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    }


    changeRange(event) {
        const stepValue = event.target.value;
        periodAmount.textContent = stepValue;
    }

    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonth.value = this.expensesMonth;
        mayExpensesEnd.value = this.addExpenses.join(', ');
        adIncome.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        totalSavedIncome.value = this.calcPeriod();
        range.addEventListener('change', () => {
            if (this.start) {
                totalSavedIncome.value = this.budgetMonth * range.value;
            }
        });
    }


    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    }


    getStatusIncome() {
        if (this.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (this.budgetDay >= 600) {
            return ('У вас средний уровень дохода');
        } else if (this.budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else if (this.budgetDay < 0) {
            return ('Что то пошло не так');
        }
    }


    getInfoDeposit() {
        if (this.deposit) {

            do {
                this.percentDeposit = prompt('Какой годовой процент?', '10');
            } while (!isNumber(this.percentDeposit) || this.percentDeposit === '');

            do {
                this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            } while (!isNumber(this.moneyDeposit) || this.moneyDeposit === '');

        }
    }

    calcPeriod() {
        return this.budgetMonth * range.value;
    }

    reset() {
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
    }

    addEventsListeners() {
        expensesPlus.addEventListener('click', this.addExpensesBlock);
        incomePlus.addEventListener('click', this.addIncomeBlock);
        range.addEventListener('change', this.changeRange);

        start.addEventListener('click', () => {
            if (salary.value !== '') {
                this.start();
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


                cansel.addEventListener('click', () => {
                    this.reset();
                    cansel.style.display = 'none';
                    start.style.display = 'inline-block';
                });

            }
        });
    }

}


const appData = new AppData();
appData.addEventsListeners();