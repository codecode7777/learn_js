'use strict';

const startBtn = document.getElementById('start'),
    cansel = document.getElementById('cancel'),
    incomePlus = document.querySelector('.income_add'),
    expensesPlus = document.querySelector('.expenses_add'),
    possibleIncome = document.querySelectorAll('.additional_income-item'),
    checkBox = document.querySelector('#deposit-check'),
    adIncome = document.querySelector('.additional_income-value'),
    totalSavedIncome = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value'),
    salary = document.querySelector('.salary-amount'),
    dopAmmountTitle = document.querySelector('.income-amount'),
    mustExpensesTitle = document.querySelector('.expenses-amount'),
    mustExpenses = document.querySelector('.expenses-amount'),
    mayExpenses = document.querySelector('.additional_expenses-item'),
    depositCalcAmount = document.querySelector('.deposit-amount'),
    depositCalcPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    cancel = document.querySelector('#cancel'),
    range = document.querySelector('[type = "range"]'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    expensesMonth = document.querySelector('.expenses_month-value'),
    mayExpensesEnd = document.querySelector('.additional_expenses-value'),
    periodAmount = document.querySelector('.period-amount'),
    allInput = document.querySelectorAll('input[type = text]');
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

    start() {
        if (salary.value !== '') {
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
        } else if (salary.value === '') {
            alert('Заполните поле "месячный доход"');
        }
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
            totalSavedIncome.value = this.budgetMonth * range.value;
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
        this.mission = 50000;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.incomeMonth = 0;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.income = {};
        this.expenses = {};
        this.addIncome = [];
        this.addExpenses = [];
        this.deposit = false;

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

        for (let val of expensesItems) {
            //val.value = 0;
            //val = 0;
            //val.value = '';
            //val.remove();
            console.log(expensesItems);
        }
        //expensesItems = [];


        allInput.forEach(function(item) {
            item.value = '';
        });

        cansel.style.display = 'none';
        startBtn.style.display = 'inline-block';
    }

    addEventsListeners() {
        const starter = this.start.bind(appData);
        startBtn.addEventListener('click', starter);
        expensesPlus.addEventListener('click', this.addExpensesBlock);
        incomePlus.addEventListener('click', this.addIncomeBlock);
        range.addEventListener('change', this.changeRange);
        cansel.addEventListener('click', this.reset);
    }

}


const appData = new AppData();


startBtn.disabled = true;
salary.addEventListener('input', function() {
    startBtn.disabled = false;
});

appData.addEventsListeners();