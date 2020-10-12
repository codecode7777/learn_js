'use strict';

let now = new Date();
let lang = 'ru';

//через if

let rus = function getWeekDay(date) {
    let days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];

    return days[date.getDay()];
};

let eng = function getWeekDay(date) {
    let dayz = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    return dayz[date.getDay()];
};

if (lang === 'ru') {
    console.log(rus(now));
} else if (lang === 'en') {
    console.log(eng(now));
}

//через switch

switch (lang) {
    case 'ru':
        console.log(rus(now));
        break;
    case 'en':
        console.log(eng(now));
        break;
}


//через многомерный массив

let arr = [
    ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']

];

let arfix = [arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6]];

let arr1 = [
    ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
];

let arfix1 = [arr1[0], arr1[1], arr1[2], arr1[3], arr1[4], arr1[5], arr1[6]];

let rus1 = function getWeekDay(date) {
    let days = arfix;

    return days[date.getDay()];
};

let eng1 = function getWeekDay(date) {
    let days = arfix1;

    return days[date.getDay()];
};

let mass = (lang === 'ru') ? console.log(rus1(now)) : console.log(eng1(now));




//2

let namePerson = 'Максим';

let zzz = (namePerson === 'Артем') ? console.log('директор') :
    (namePerson === 'Максим') ? console.log('преподаватель') : console.log('студент');