const canvas = document.getElementById("game") //Берем поле
const ctx = canvas.getContext("2d");
const ground = new Image(); //Переменная для фона
ground.src = "img/background.jpg"; // сам фон
const foodImg = new Image(); //еда
foodImg.src = "img/bug.png"; //еда
const foodImg2 = new Image(); //еда
foodImg2.src = "img/bug2.png"; //еда
const snakeHeadImg = new Image();
snakeHeadImg.src = "img/snakehead.png";
let box = 32; //размер ячейки для змейки и еды
let score = 0; // счетчик очков
let rekord = 0;
let snake = [];//массив 
var gamelvl = 2;
var interval = 100;

let dir;



let food = {//рендом роботает от 0 до 10, поэтому вводим попраки и 
    x: Math.floor((Math.random() * 17 + 1)) * box,//умножаем на размер ячейки, т.е. box, 
    y: Math.floor((Math.random() * 15 + 3)) * box,//округление нужно чтобы рендом выдавал только целые числа
};
let food2 = {//рендом роботает от 0 до 10, поэтому вводим попраки и 
    x: Math.floor((Math.random() * 17 + 1)) * box,//умножаем на размер ячейки, т.е. box, 
    y: Math.floor((Math.random() * 15 + 3)) * box,//округление нужно чтобы рендом выдавал только целые числа
};

snake[0] = {//местоположение змейки
    x: 9 * box,
    y: 10 * box,
};
let snakeX = snake[0].x;//координата первого элемента змейки
let snakeY = snake[0].y;//координата первого элемента змейки


document.addEventListener("keydown", direction);//направление


function direction(event) {//функция выбора направления
    if (event.keyCode == 65 && dir != "right")
        dir = "left";
    if (event.keyCode == 87 && dir != "down")
        dir = "up";
    if (event.keyCode == 68 && dir != "left")
        dir = "right";
    if (event.keyCode == 83 && dir != "up")
        dir = "down";
}
function eatTail(head, arr) {//функция останавливает игру при пересечении змейки самой себя
    for (let i = 0; i < arr.length; i++) { //весь массив перебираем
        if (head.x == arr[i].x && head.y == arr[i].y) {
            snake.splice(0, snake.length);
            direction.dir = null;
            snakeX = 9 * box;
            snakeY = 10 * box;
            if (score > rekord) rekord = score;
            score = 0;
        } // если пересекся с головой
        //clearInterval(game);//остановка
        //просто начинаем все сначала
    }
}
function eatreset(eat, arr) {// функция создания новой еды
    for (let i = 0; i < arr.length; i++) {
        if (eat.x == arr[i].x && eat.y == arr[i].y) {
            food = {//рендом роботает от 0 до 10, поэтому вводим попраки и 
                x: Math.floor((Math.random() * 17 + 1)) * box,//умножаем на размер ячейки, т.е. box, 
                y: Math.floor((Math.random() * 15 + 3)) * box,//округление нужно чтобы рендом выдавал только целые числа
            };
            food2 = {//рендом роботает от 0 до 10, поэтому вводим попраки и 
                x: Math.floor((Math.random() * 17 + 1)) * box,//умножаем на размер ячейки, т.е. box, 
                y: Math.floor((Math.random() * 15 + 3)) * box,//округление нужно чтобы рендом выдавал только целые числа
            };
        }
    }
}

//
function drawGame() {//игра
    ctx.drawImage(ground, 0, 0);//рисуем фон
    ctx.drawImage(foodImg, food.x, food.y);//рисуем еду
    ctx.drawImage(foodImg2, food2.x, food2.y);//рисуем еду
    if (score > rekord) rekord = score;
    for (let i = 0; i < snake.length; i++) {//рисуем змейку массивом
        ctx.fillStyle = i == 0 ? "grey" : "lime";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.drawImage(snakeHeadImg, snakeX - 16, snakeY - 16);

    //поедание еды:
    if (snakeX == food.x && snakeY == food.y) {//если съел еду, тогда:
        score = score + gamelvl;//увеличили счет
        //снова вызываем создание еды:
        food = {//рендом роботает от 0 до 10, поэтому вводим попраки и 
            x: Math.floor((Math.random() * 17 + 1)) * box,//умножаем на размер ячейки, т.е. box, 
            y: Math.floor((Math.random() * 15 + 3)) * box,//округление нужно чтобы рендом выдавал только целые числа
        };
        eatreset(food, snake);
    } else {
        if (snakeX == food2.x && snakeY == food2.y) {
            food2 = {//рендом роботает от 0 до 10, поэтому вводим попраки и 
                x: Math.floor((Math.random() * 17 + 1)) * box,//умножаем на размер ячейки, т.е. box, 
                y: Math.floor((Math.random() * 15 + 3)) * box,//округление нужно чтобы рендом выдавал только целые числа
            };
            eatreset(food, snake);
            score = score + gamelvl;//увеличили счет
        } else {
            snake.pop();
        }
    }//удаляем змейку для того чтобы создать новую уже в новом месте

    ctx.fillStyle = "black";//счетчик и его свойтва
    ctx.font = "40px Arial";//счетчик и его свойтва
    ctx.fillText(score, box * 2.5, box)//счетчик и его свойтва
    ctx.fillText("     РЕКОРД " + rekord, box * 10, box)//счетчик и его свойтва



    if (snakeX < box || snakeX > box * 17 || snakeY < box || snakeY > box * 17) {//если змейка выйдет за игровое поле то:
        snake.splice(0, snake.length);
        direction.dir = null;
        snakeX = 9 * box;
        snakeY = 10 * box;
        if (score > rekord) rekord = score;
        score = 0;
        //clearInterval(game);
        // setInterval(game, 100);
    }


    //меняем координату первого элемента при нажатии на клавишу
    if (dir == "left") {
        snakeX -= box; //меняем координату первого элемента при нажатии на клавишу
        snakeHeadImg.src = "img/snakeheadleft.png";
    } else {
        if (dir == "right") {
            snakeX += box;
            snakeHeadImg.src = "img/snakeheadright.png";
        }
        else {//меняем координату первого элемента при нажатии на клавишу
            if (dir == "up") {
                snakeY -= box;
                snakeHeadImg.src = "img/snakeheadup.png";
            }
            else {
                //меняем координату первого элемента при нажатии на клавишу
                if (dir == "down") snakeY += box;
                snakeHeadImg.src = "img/snakeheaddown.png";
            }
        }
    } //меняем координату первого элемента при нажатии на клавишу

    let newHead = { // создаем новую голову змейки после перемещения
        x: snakeX,
        y: snakeY
    };
    eatTail(newHead, snake); //проверка на самопоедание
    snake.unshift(newHead);//теперь змейка двигается

}

//let game = setInterval(drawGame, 1000); //обновление экрана


function easybutton() {
    clearInterval(game);//остановка
    gamelvl = 1;
    game = setInterval(drawGame, 150);

}

function normalbutton() {
    clearInterval(game);//остановка
    gamelvl = 2;
    game = setInterval(drawGame, 100);
}

function hardbutton() {
    clearInterval(game);//остановка
    gamelvl = 3;
    game = setInterval(drawGame, 75);
}

