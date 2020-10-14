'use strict';

let something = 'true';

const hardFunction = function(some) {
    if (some !== String) {
        return ('Пользователь, вы допустили ошибку');
    } else if (some === String) {
        return ('all good');
    }
};

console.log(hardFunction(something));