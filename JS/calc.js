let a = ''; //first number
let b = ''; //second number
let sign = '';//знак операции
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'X', '/'];



document.body.style.overflow = "hidden"
window.resizeTo(200, 200);
//экран
const out = document.querySelector('.screen p');

function clearAll() {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = 0;
}

document.querySelector('.ac').onclick = clearAll;
document.querySelector('.buttonss').onclick = (event) => {
    if (!event.target.classList.contains('btn')) return;
    if (event.target.classList.contains('ac')) return;
    out.textContent = '';
    //получаю нажатую кнопук
    const key = event.target.textContent;

    // buttons 0-9
    if (digit.includes(key)) {
        if (b === '' && sign === '') {
            a += key;
            out.textContent = a;
        }
        else if (a !== '' && b !== '' && finish) {
            b = key;
            out.textContent = b;

        }
        else {
            b += key;
            out.textContent = b;
        }

        console.log(a, b, sign);
        return;

    }

    //buttons +-/*
    if (action.includes(key)) {
        sign = key;
        out.textContent = sign;
        console.log(a, b, sign);
        return;
    }



    //button =
    if (key === '=') {
        if (b === '') b = a;
        switch (sign) {
            case "+":
                a = (+a) + (+b);
                break;
            case "-":
                a = a - b;
                break;
            case "X":
                a = a * b;
                break;
            case "/":
                a = a / b;
                break;
        }
        finish = true;
        let numb = Number(a);
        out.textContent = +numb.toFixed(6);

        console.log(a, b, sign);
    }
    //button %
    if (key === '%') {
        if (b === '') b = a;
        switch (sign) {
            case "+":
                a = (+a) + (a / 100) * b;
                break;
            case "-":
                a = a - (a / 100) * b;
                break;
            case "X":
                a = a * (a / 100) * b;
                break;
            case "/":
                a = a / (a / 100) * b;
                break;
        }
        finish = true;
        let numb = Number(a);
        out.textContent = +numb.toFixed(6);
        console.log(a, b, sign, 'нажат %');
    }
    // button +/- инвертировать число
    if (key === '+/-') {
        if (b === '' && sign === '') {
            let numa = Number(a);
            numa = numa - (2 * numa)
            a = numa;
            out.textContent = numa;
            console.log(a, b, sign, 'нажат -');
        }
        else if (a !== '' && b !== '' && finish) {
            let numb = Number(b);
            numb = numb - (2 * numb);
            b = numb;
            out.textContent = numb;
            console.log(a, b, sign, 'нажат -');

        }
        else {
            let numb2 = Number(b);
            numb2 = numb2 - (2 * numb2);
            b = numb2;
            out.textContent = numb2;
            console.log(a, b, sign, 'нажат -');
        }
    }
}
