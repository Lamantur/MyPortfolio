var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var fon_img = new Image();
fon_img.src = 'img/asteroids/fon.jpg';
var astr_img = new Image();
astr_img.src = 'img/asteroids/astr.png';
var ship_img = new Image();
ship_img.src = 'img/asteroids/gamer.png';
var fire_img = new Image();
fire_img.src = 'img/asteroids/fire.png';
var blast_img = new Image();
blast_img.src = 'img/asteroids/blast.png';
var alien1_img = new Image();
alien1_img.src = 'img/asteroids/alien1.png';
var firealien1_img = new Image();
firealien1_img.src = 'img/asteroids/firealien1.png';



var blast = [];
var bigblast = [];

var asteroid = [];
var alien1 = [];
var boss1 = [];
var firealien1 = [];
var fire = [];
var timer = 0;
var heals = 100;
var frag = 0;
var asterlvl = 100;
var alien1lvl = 100;
var ship = { x: 300, y: 300, animx: 0, animy: 0 };
//aster.push({ x: 0, y: 300, dx: 1, dy: 2 });

canvas.addEventListener("mousemove", function (event) {
    ship.x = event.offsetX - 25;
    ship.y = event.offsetY - 13;

});


fon_img.onload = function () {
    game();
}


// /     отрисовка    игры
function game() {
    update();
    render();
    requestAnimationFrame(game);
}

//     действия  в  игре
function update() {
    timer++;
    //враги
    if (timer % alien1lvl == 0) {
        alien1.push(
            {
                x: Math.random() * 600,
                y: -50,
                dx: Math.random() * 2 - 1,
                dy: Math.random(),
                del: 0
            }
        );
    }
    //астероиды
    if (timer % asterlvl == 0) {
        asteroid.push(
            {
                x: Math.random() * 400,
                y: -50,
                dx: Math.random() * 2 - 1,
                dy: Math.random() * 2 + 2,
                del: 0
            }
        );
    }
    // первый босс
    if ((frag == 100 && !boss1[0]) || (frag == 300 && !boss1[2]) || (frag == 400 && !boss1[5])) {
        boss1.push(
            {
                x: Math.random() * 400,
                y: 0,
                dx: Math.random() * 2 - 1,
                dy: Math.random(),
                del: 0
            }
        );
    }


    //выстрел
    if (timer % 10 == 0) {

        fire.push({ x: ship.x + 10, y: ship.y, dx: 1, dy: -5.2 });
        fire.push({ x: ship.x + 10, y: ship.y, dx: 0, dy: -5.2 });
        fire.push({ x: ship.x + 10, y: ship.y, dx: -1, dy: -5.2 });


        soundBlast();
    }
    //выстрел врагов
    for (i in alien1) {
        if (timer % 200 == 0) {
            firealien1.push({ x: alien1[i].x + 10, y: alien1[i].y, dx: 0, dy: 3 });
            soundBlast();
        }
    }
    for (i in boss1) {
        if (timer % 50 == 0) {
            firealien1.push({ x: boss1[i].x + 50, y: boss1[i].y + 100, dx: 0, dy: 3.5 });
        }
    }


    // анимация взрыва
    for (i in blast) {
        blast[i].animx = blast[i].animx + 0.5;
        if (blast[i].animx > 5) { blast[i].animy++; blast[i].animx = 0 }
        if (blast[i].animy > 2)
            blast.splice(i, 1);
    }
    // анимация взрыва big
    for (i in bigblast) {
        bigblast[i].animx = bigblast[i].animx + 0.5;
        if (bigblast[i].animx > 5) { bigblast[i].animy++; bigblast[i].animx = 0 }
        if (bigblast[i].animy > 2)
            bigblast.splice(i, 1);
    }


    //       физика
    //физика выстрелов
    for (i in fire) {
        fire[i].x = fire[i].x + fire[i].dx;
        fire[i].y = fire[i].y + fire[i].dy;

        if (fire[i].y <= -30) fire.splice(i, 1);
    }
    //физика выстрелов
    for (i in firealien1) {
        if (firealien1[i] != undefined) {
            firealien1[i].x = firealien1[i].x + firealien1[i].dx;
            firealien1[i].y = firealien1[i].y + firealien1[i].dy;

            if (firealien1[i].y >= 600) firealien1.del = 1;
            if (Math.abs(firealien1[i].x + 20 - ship.x - 25) < 50 && Math.abs(firealien1[i].y - ship.y - 20) < 70) {
                //произошло столкновение

                //спавн взрыва
                blast.push({ x: ship.x - 25, y: ship.y - 25, animx: 0, animy: 0 });
                soundBang();

                //помечаем firealien1 на удаление
                heals--;

                firealien1.splice(i, 1); break;
            }
            if (firealien1[i].del == 1) firealien1.splice(i, 1);
        }
    }
    //физика врагов
    for (i in alien1) {
        alien1[i].x = alien1[i].x + alien1[i].dx;
        alien1[i].y = alien1[i].y + alien1[i].dy;


        //проверяем каждый alien на столкновение с каждым выстрелом
        for (j in fire) {
            if (Math.abs(alien1[i].x + 25 - fire[j].x - 15) < 50 && Math.abs(alien1[i].y - fire[j].y) < 25) {
                //произошло столкновение

                //спавн взрыва
                blast.push({ x: alien1[i].x - 25, y: alien1[i].y - 25, animx: 0, animy: 0 });
                soundBang();

                //помечаем alien на удаление
                alien1[i].del++;
                fire.splice(j, 1); break;
            }
        }
        //проверяем каждый alien на столкновение с кораблем

        if (Math.abs(alien1[i].x + 25 - ship.x - 15) < 50 && Math.abs(alien1[i].y - ship.y) < 25) {
            //произошло столкновение

            //спавн взрыва
            blast.push({ x: ship.x - 25, y: ship.y - 25, animx: 0, animy: 0 });
            soundBang();

            //помечаем alien на удаление
            alien1[i].del = 1;
            heals--;
        }
        //границы , удаляем внизу холста
        if (alien1[i].x >= 550 || alien1[i].x < 0) alien1[i].dx = -alien1[i].dx;
        if (alien1[i].y >= 550) alien1[i].del = 1;

        //удаляем 
        if (alien1[i].del == 2) {
            alien1.splice(i, 1);
            frag++;
        }

    }

    //физика первого босса
    for (i in boss1) {
        boss1[i].x = boss1[i].x + boss1[i].dx;
        boss1[i].y = boss1[i].y + boss1[i].dy;


        //проверяем каждый alien на столкновение с каждым выстрелом
        for (k in fire) {
            if (Math.abs(boss1[i].x + 25 - fire[k].x - 15) < 50 && Math.abs(boss1[i].y - fire[k].y) < 25) {
                //произошло столкновение

                //спавн взрыва
                //blast.push({ x: fire[k].x - 25, y: fire[k].y - 25, animx: 0, animy: 0 });
                soundBang();

                //помечаем boss1 на удаление
                boss1[i].del++;
                fire.splice(k, 1); break;
            }
        }

        //движения босса
        if (boss1[i].x >= 400 || boss1[i].x < 0) boss1[i].dx = -boss1[i].dx;
        if (boss1[i].y >= 100 || boss1[i].y < 0) boss1[i].dy = -boss1[i].dy;

        //удаляем boss1
        if (boss1[i].del == 30) {
            //спавн взрыва
            bigblast.push({ x: boss1[i].x - 25, y: boss1[i].y - 25, animx: 0, animy: 0 });
            soundBang();
            boss1.splice(i, 1);
            frag++;
        }

    }

    //физика астероидов
    for (i in asteroid) {
        asteroid[i].x = asteroid[i].x + asteroid[i].dx;
        asteroid[i].y = asteroid[i].y + asteroid[i].dy;


        //проверяем каждый астероид на столкновение с каждым выстрелом
        for (j in fire) {
            if (Math.abs(asteroid[i].x + 25 - fire[j].x - 15) < 50 && Math.abs(asteroid[i].y - fire[j].y) < 25) {
                //произошло столкновение

                //спавн взрыва
                blast.push({ x: asteroid[i].x - 25, y: asteroid[i].y - 25, animx: 0, animy: 0 });
                soundBang();

                //помечаем астероид на удаление
                asteroid[i].del = 1;
                fire.splice(j, 1); break;
            }
        }

        //проверяем каждый астероид на столкновение с кораблем

        if (Math.abs(asteroid[i].x + 25 - ship.x - 15) < 50 && Math.abs(asteroid[i].y - ship.y) < 25) {
            //произошло столкновение

            //спавн взрыва
            blast.push({ x: ship.x - 25, y: ship.y - 25, animx: 0, animy: 0 });
            soundBang();

            //помечаем астероид на удаление
            asteroid[i].del = 1;
            heals--;
        }
        //границы астероидов, удаляем внизу холста
        if (asteroid[i].x >= 550 || asteroid[i].x < 0) asteroid[i].dx = -asteroid[i].dx;
        if (asteroid[i].y >= 550) asteroid[i].del = 1;

        //удаляем астероиды
        if (asteroid[i].del == 1) {
            asteroid.splice(i, 1);
            frag++;
        }

    }

    // Периоды гры
    if (frag > 10 && frag <= 200) {
        asterlvl = 50;
        alien1lvl = 100;
    }
    if (frag > 200) {
        asterlvl = 10;
        alien1lvl = 1000;
    }
    if (frag > 300) {
        asterlvl = 1000;
        alien1lvl = 50;
    }




}

//      отрисовка     объектов
function render() {
    if (heals > 0) {
        context.drawImage(fon_img, 0, 0, 600, 600);
        context.drawImage(ship_img, ship.x, ship.y, 50, 70);


        for (i in boss1) context.drawImage(alien1_img, boss1[i].x, boss1[i].y, 100, 100);


        for (i in fire) context.drawImage(fire_img, fire[i].x, fire[i].y, 20, 20);
        for (i in firealien1) context.drawImage(firealien1_img, firealien1[i].x, firealien1[i].y, 20, 20);

        for (i in alien1) context.drawImage(alien1_img, alien1[i].x, alien1[i].y, 50, 50);
        for (i in asteroid) context.drawImage(astr_img, asteroid[i].x, asteroid[i].y, 50, 50);

        for (i in blast) context.drawImage(blast_img, 192 * Math.floor(blast[i].animx), 192 * Math.floor(blast[i].animy), 192, 192, blast[i].x, blast[i].y, 100, 100);
        for (i in bigblast) context.drawImage(blast_img, 192 * Math.floor(bigblast[i].animx), 192 * Math.floor(bigblast[i].animy), 192, 192, bigblast[i].x, bigblast[i].y, 200, 200);

        context.fillStyle = "white";//белый цвет
        context.font = "40px Arial";//размер и шрифт
        context.fillText(heals + "V", 10, 40);//счетчик и его свойтва
        context.fillText(frag + "*", 500, 40);//счетчик и его свойтва
    } else {
        for (i in blast) context.drawImage(blast_img, 192 * Math.floor(blast[i].animx), 192 * Math.floor(blast[i].animy), 192, 192, 0, 0, 600, 600);
        context.fillStyle = "black";
        context.font = "100px Arial";
        context.fillText("ВСЁ!", 150, 300);
        window.setTimeout(() => window.location.reload(), 3000);
    }
}


function soundBang() {
    var audio = new Audio(); // Создаём новый элемент Audio
    audio.src = 'img/asteroids/bang.mp3'; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
}
function soundBlast() {
    var audio = new Audio(); // Создаём новый элемент Audio
    audio.src = 'img/asteroids/blast.mp3'; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
}


var requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 20);
        };
})();