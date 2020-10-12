let money = 90000;
let income = "frilans";
let addExpenses = "Internet, Food, Lease, Utilities";
let deposit = false;
let mission = 5000000;
let period = 4;
let budgetDay = money / 30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log("Период равен " + period + " месяцам");
console.log("Цель заработать " + mission + " долларов");

console.log(addExpenses.toLowerCase().split(', '));

console.log(budgetDay);


//lesson03

let incomeMonth = prompt('Ваш месячный доход?');
money = incomeMonth;
//console.log(money);

let expenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
addExpenses = expenses;
//console.log(addExpenses);

let qdep = prompt('Есть ли у вас депозит в банке?');
deposit = qdep;

if (deposit === 'да') {
    console.log(!!deposit);
} else if (deposit === 'нет') {
    deposit = false;
    console.log(deposit);
} else {
    console.log('неверно');
}

let exp1 = prompt('Введите обязательную статью расходов?');
let save1 = exp1;
//console.log(save1);

let exp3 = prompt('Во сколько это обойдется?');
let save3 = exp3;
//console.log('Это обойдется в ' + save3);

let exp2 = prompt('Введите обязательную статью расходов?');
let save2 = exp2;
//console.log(save2);

let exp4 = prompt('Во сколько это обойдется?');
let save4 = exp4;
//console.log('Это обойдется в ' + save4);

let budgetMonth = money - save3 - save4;
console.log('Бюджет на месяц: ' + budgetMonth);

let time = mission / budgetMonth;
console.log('Цель будет достигнута за ' + Math.ceil(time) + ' месяцев');

budgetDay = budgetMonth / 30;
console.log('Дневной бюджет: ' + Math.floor(budgetDay));

if (budgetDay > 1200) {
    console.log('У вас высокий уровень дохода');
} else if (1200 >= budgetDay >= 600) {
    console.log('У вас средний уровень дохода');
} else if (600 >= budgetDay >= 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 0) {
    console.log('Что то пошло не так');
}