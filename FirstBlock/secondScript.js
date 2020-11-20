'use strict';

const input = document.querySelector('.inp');
const button = document.querySelector('.sub-btn');

function DomElement(selector, height, width, backgroundColor, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.backgroundColor = backgroundColor;
    this.fontSize = fontSize;

}

DomElement.prototype.select = function() {
    const divClass = document.createElement('div');
    const divId = document.createElement('div');

    if (this.selector.substring(0, 1) === '.') {
        divClass.classList.add(this.selector.slice(1));
        divClass.style.height = this.height;
        divClass.style.width = this.width;
        divClass.style.backgroundColor = this.backgroundColor;
        divClass.style.fontSize = this.fontSize;
        button.after(divClass);
    } else {
        divId.id = this.selector.slice(1);
        divId.style.height = this.height;
        divId.style.width = this.width;
        divId.style.backgroundColor = this.backgroundColor;
        divId.style.fontSize = this.fontSize;
        button.after(divId);
    }

    button.addEventListener('click', function(event) {
        event.preventDefault();
        divClass.textContent = input.value;
        input.value = '';
    });

};

let newObj = new DomElement('.block', '200px', '600px', '#d47d43', '1.2em');
newObj.select();