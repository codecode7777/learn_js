'use strict';

const book = document.querySelectorAll('.book'),
    body = document.querySelector('body'),
    hCorrect = document.querySelectorAll('h2'),
    removeAdd = document.querySelector('.adv'),
    liSwitch = document.querySelectorAll('li'),
    book5 = document.querySelectorAll('.book')[5],
    liBook5 = book5.querySelectorAll('li'),
    book6 = document.querySelectorAll('.book')[2],
    liBook6 = book6.querySelectorAll('li');

book[5].after(book[2]);
book[5].before(book[3]);
book[1].after(book[0]);

body.style.background = "url('./image/you-dont-know-js.jpg')";

hCorrect[4].textContent = 'Книга 3. this и Прототипы Объектов';
hCorrect[4].style.color = 'darkkhaki';

removeAdd.remove();

liSwitch[9].after(liSwitch[2]);
liSwitch[3].after(liSwitch[6]);
liSwitch[4].before(liSwitch[8]);

liBook5[1].after(liBook5[9]);
liBook5[4].after(liBook5[2]);
liBook5[8].before(liBook5[5]);

const chapter = document.createElement('li');
chapter.textContent = 'Глава 8: За пределами ES6';
liBook6[8].after(chapter);