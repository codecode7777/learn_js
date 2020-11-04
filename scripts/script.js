'use strict';

const book = document.querySelectorAll('.book'),
    body = document.querySelector('body'),
    hCorrect = document.querySelectorAll('h2'),
    removeAdd = document.querySelector('.adv'),
    liSwitch = document.querySelectorAll('li');

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

liSwitch[47].after(liSwitch[55]);
liSwitch[50].after(liSwitch[48]);
liSwitch[54].before(liSwitch[51]);

const chapter = document.createElement('li');
chapter.textContent = 'Глава 8: За пределами ES6';
liSwitch[25].after(chapter);