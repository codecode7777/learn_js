const money = 90000;
const income = "frilans";
const addExpenses = "Internet, Food, Lease, Utilities";
const deposit = true;
const mission = 5000000;
const period = 4;
const budgetDay = money / 30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log("Период равен " + period + " месяцам");
console.log("Цель заработать " + mission + " долларов");

console.log(addExpenses.toLowerCase().split(', '));

console.log(budgetDay);