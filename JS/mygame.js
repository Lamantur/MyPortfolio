
const canvas = document.getElementById('game');
const c = canvas.getContext('2d');
const gravity = 1;
canvas.width = innerWidth;
canvas.height = innerHeight;
const platform_img = new Image();
platform_img.src = 'img/Mario/platform.jpg';
const fon = new Image();
fon.src = 'img/Mario/fon.jpg';
const player_img = new Image();
player_img.src = 'img/Mario/super_mario_brothers_sprites_by_spikestuff.png';
var player_sprite_x = 504;
var player_sprite_y = 208;
var mashroom_sprite_x = 0;
var mashroom_sprite_y = 4;
var fonx = 0;
var fony = 0;
var collision = false;

//класс игрока
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30
        this.height = 30
        this.image = player_img;
        this.frames = 0;
    }
    draw() {
        c.fillStyle = 'red'
        //c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.drawImage(
            this.image,
            player_sprite_x + 30 * this.frames,
            player_sprite_y,
            15,
            15,

            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }

    update() {


        if (keys.right.pressed && this.frames < 3 && !keys.up.pressed) {
            this.frames++;
        }
        else if (keys.left.pressed && this.frames > -3 && !keys.up.pressed) {
            this.frames--;
        }
        else this.frames = 0;

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.draw()
        if (this.position.y + this.height + this.velocity.y <= canvas.height) this.velocity.y += gravity
        else window.location.reload()
    }
}
//класс гриба
class Mashroom {
    constructor({ x, y }) {
        this.position = {
            x,
            y
        }
        this.velocity = {
            x: 1,
            y: 0
        }
        this.width = 32
        this.height = 30
        this.image = player_img;
        this.frames = 0;
    }
    draw() {
        c.fillStyle = 'red'
        c.drawImage(
            this.image,
            0,
            4,
            16,
            15,

            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }

    update() {

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.draw()
        if (this.position.y + this.height + this.velocity.y <= canvas.height) this.velocity.y += gravity
        else {

            this.velocity.y = 0;
            this.velocity.x = 1;
        }
    }
}

//класс платформы
class Platform {
    constructor({ x, y }) {
        this.position = {
            x,
            y
        }
        this.width = 236
        this.height = 64
    }
    draw() {
        c.fillStyle = 'white'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
//игрок у нас один
const player = new Player()
const mashroom = new Mashroom({ x: 120, y: 100 })
const mashroom2 = new Mashroom({ x: 550, y: 100 })

// первые платформы
const platforms = [

    new Platform({ x: 0, y: 600 }),
    new Platform({ x: 236, y: 550 }),
    new Platform({ x: 500, y: 500 }),
    new Platform({ x: 750, y: 550 }),
    new Platform({ x: 1000, y: 600 }),
    new Platform({ x: 1200, y: 555 }),
    new Platform({ x: 1400, y: 600 }),
    new Platform({ x: 1650, y: 560 }),
    new Platform({ x: 1800, y: 600 }),
    new Platform({ x: 2000, y: 550 }),

    new Platform({ x: 2250, y: 600 }),
    new Platform({ x: 2500, y: 600 }),
    new Platform({ x: 2700, y: 550 }),
    new Platform({ x: 2950, y: 500 }),
    new Platform({ x: 3100, y: 450 }),
    new Platform({ x: 3200, y: 400 }),
    new Platform({ x: 3400, y: 450 }),
    new Platform({ x: 3600, y: 400 }),
    new Platform({ x: 3900, y: 450 }),
    new Platform({ x: 4200, y: 400 }),
    new Platform({ x: 4500, y: 400 }),
    new Platform({ x: 4800, y: 400 }),
    new Platform({ x: 5100, y: 400 }),
    new Platform({ x: 5400, y: 400 }),
    new Platform({ x: 5700, y: 350 }),
    new Platform({ x: 6000, y: 300 }),
    new Platform({ x: 6300, y: 350 }),
    new Platform({ x: 6600, y: 300 }),
]
const keys = {
    right: { pressed: false },
    left: { pressed: false },
    up: { pressed: false }
}

let scrollOffset = 0;

//Вся анимация игры
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.drawImage(fon, fonx, fony);
    player.update()
    mashroom.update()
    mashroom2.update()

    platforms.forEach(platform => {
        platform.draw();
        c.drawImage(platform_img, platform.position.x, platform.position.y);
    })


    if (keys.right.pressed && player.position.x < 400 && collision) {
        player.velocity.x = 5
    } else
        if (keys.left.pressed && player.position.x > 50 && collision) {
            player.velocity.x = -5
        } else {
            player.velocity.x = 0
            //движение экрана(платформ) вместе с игроком
            if (keys.right.pressed) {
                scrollOffset += 5;
                platforms.forEach(platform => {
                    platform.position.x -= 5;
                })
                fonx -= 2;
                mashroom.position.x -= 5;
                mashroom2.position.x -= 5;

            } else if (keys.left.pressed) {
                scrollOffset -= 5;
                platforms.forEach(platform => {
                    platform.position.x += 5;
                })
                fonx += 2;
                mashroom.position.x += 5;
                mashroom2.position.x += 5;
            }
        }
    // platform collision
    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0;
            collision = true;
            keys.up.pressed = false;
        }
        if (mashroom.position.y + mashroom.height <= platform.position.y && mashroom.position.y + mashroom.height + mashroom.velocity.y >= platform.position.y && mashroom.position.x + mashroom.width >= platform.position.x && mashroom.position.x <= platform.position.x + platform.width) {
            mashroom.velocity.y = 0;
            if (mashroom.position.x + mashroom.width >= platform.position.x + platform.width - 10) mashroom.velocity.x = -1;
            if (mashroom.position.x <= platform.position.x - 10) mashroom.velocity.x = 1;
        }
        if (mashroom2.position.y + mashroom2.height <= platform.position.y && mashroom2.position.y + mashroom2.height + mashroom2.velocity.y >= platform.position.y && mashroom2.position.x + mashroom2.width >= platform.position.x && mashroom2.position.x <= platform.position.x + platform.width) {
            mashroom2.velocity.y = 0;
            if (mashroom2.position.x + mashroom2.width >= platform.position.x + platform.width - 10) mashroom2.velocity.x = -1;
            if (mashroom2.position.x <= platform.position.x - 10) mashroom2.velocity.x = 1;
        }
    })

    // условие победы
    if (scrollOffset > 20000) { console.log('you win!') }
}



animate()


// Обработка нажатия кнопок (управление)
addEventListener('keydown', ({ keyCode }) => {
    // console.log(keyCode)
    switch (keyCode) {
        case 65:
            console.log('left');
            player_sprite_x = 473
            keys.left.pressed = true
            break;
        case 83:
            console.log('down');
            break;
        case 68:
            console.log('right');
            player_sprite_x = 564
            keys.right.pressed = true
            break;
        case 87:
            console.log('up');
            if (player.velocity.y == 0 && collision) player.velocity.y -= 10;
            if (keys.up.pressed) player_sprite_x = 684
            collision = false;
            keys.up.pressed = true
            break;
    }
})
addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            console.log('left');
            player_sprite_x = 504;
            keys.left.pressed = false
            break;
        case 83:
            console.log('down');
            break;
        case 68:
            console.log('right');
            player_sprite_x = 534;
            keys.right.pressed = false
            break;
        case 87:
            console.log('up');
            if (player.velocity.y == 0 && collision) player.velocity.y -= 10;
            if (collision) player_sprite_x = 504;
            collision = false;
            break;
    }
})
