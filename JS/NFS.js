var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

//игровые переменные
var heals = 10;
var fonDrive = [];
var timer = 0;
var ship = { x: 300, y: 400, animx: 0, animy: 0 };
var traffic = [];
var riad = 0;
var riadr = 1;
var lvl = 60;
var blast = [];
var carspeed = 5;

var fon_img = new Image();
fon_img.src = 'img/NFS/fon.png';
var ship_img = new Image();
ship_img.src = 'img/NFS/player.png';
var traffic_img = new Image();
traffic_img.src = 'img/NFS/1.png';
var blast_img = new Image();
blast_img.src = 'img/asteroids/blast.png';

//управление мышкой
canvas.addEventListener("mousemove", function (event) {
    ship.x = event.offsetX - 50;
    //ship.y = event.offsetY - 13;

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
    // анимация взрыва
    for (i in blast) {
        blast[i].animx = blast[i].animx + 0.5;
        if (blast[i].animx > 5) { blast[i].animy++; blast[i].animx = 0 }
        if (blast[i].animy > 2)
            blast.splice(i, 1);
    }

    timer++;
    //Движущийся фон//
    if (timer % 10 == 0) {
        lvl++;
        fonDrive.push(
            {
                x: 0,
                y: -3000,
                dx: 0,
                dy: lvl / 10,
                del: 0
            }
        );
    }
    for (i in fonDrive) {
        fonDrive[i].x = fonDrive[i].x + fonDrive[i].dx;
        fonDrive[i].y = fonDrive[i].y + fonDrive[i].dy;
        if (fonDrive[i].y >= 1200) fonDrive.splice(i, 1);
    }
    //
    //ТРафик
    // переменная траффика
    if (lvl % 200 == 0) carspeed++;


    //
    riad = Math.random();
    if (riad < 0.3) riadr = 1;
    if (riad < 0.65 && riad > 0.3) riadr = 2;
    if (riad > 0.65) riadr = 3;

    if (timer % (160) == 0) {
        traffic.push(
            {
                x: riadr * 180 - 100,
                y: -500,
                dx: 0,
                dy: Math.random() * 2 + carspeed,
                del: 0
            }
        );
    }
    for (i in traffic) {
        traffic[i].x = traffic[i].x + traffic[i].dx;
        traffic[i].y = traffic[i].y + traffic[i].dy;


        if (Math.abs(traffic[i].x - ship.x) < 90 && Math.abs(traffic[i].y - ship.y) < 160) {

            //спавн взрыва
            carspeed = 5;
            blast.push({ x: ship.x - 35, y: ship.y - 70, animx: 0, animy: 0 });

            traffic[i].dy = - traffic[i].dy;
            if (traffic[i].x > ship.x) { traffic[i].dx = 10; lvl = 150; }
            if (traffic[i].x <= ship.x) { traffic[i].dx = -10; lvl = 150; }

        }
        if (Math.abs(traffic[i].y) >= 1200 || Math.abs(traffic[i].x) >= 1200) traffic.splice(i, 1);

    }

}


//      отрисовка     объектов
function render() {

    for (i in fonDrive) context.drawImage(fon_img, fonDrive[i].x, fonDrive[i].y, 600, 3000);
    for (i in traffic) context.drawImage(traffic_img, traffic[i].x, traffic[i].y, 100, 200);
    context.drawImage(ship_img, ship.x, ship.y, 100, 200);
    for (i in blast) context.drawImage(blast_img, 192 * Math.floor(blast[i].animx), 192 * Math.floor(blast[i].animy), 192, 192, blast[i].x, blast[i].y, 200, 200);
    context.fillStyle = "white";//белый цвет
    context.font = "40px Arial";//размер и шрифт
    context.fillText(Math.trunc(lvl / 2), 10, 40);//счетчик и его свойтва

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