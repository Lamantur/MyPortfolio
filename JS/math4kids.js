var sum;
var a;
var b;
var blockvariant;
var znak;


//генерация случайного целого числа в промежутке
function getRandomInt(min, max) {
    var min = Math.ceil(min);
    var max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

a = getRandomInt(0, 20);
b = getRandomInt(0, 20);

function getRandomIntr(max) {
    return Math.floor(Math.random() * max);
}

znak = getRandomIntr(2);
if (znak == 0) {
    sum = a + b;
    document.getElementById("zadanie").textContent = a + ' + ' + b;
} else {
    sum = a - b;
    document.getElementById("zadanie").textContent = a + ' - ' + b;
}




blockvariant = getRandomInt(1, 4);
game();
function game() {
    if (blockvariant == 1) {
        document.getElementById("rezult1").textContent = sum;
        document.getElementById("rezult2").textContent = sum + getRandomInt(1, 5);
        document.getElementById("rezult3").textContent = sum - getRandomInt(1, 5);
        var keyBox1 = document.getElementById("rezult1");
        keyBox1.onclick = function () {
            document.getElementById("zadanie").textContent = "Верно!";
            document.getElementById("game").style.background = 'green';
            setTimeout(() => location.reload(), 1000);
        }
        var keyBox2 = document.getElementById("rezult2");
        keyBox2.onclick = function () {
            document.getElementById("zadanie").textContent = "Нет, не верно =(";
            document.getElementById("game").style.background = 'red';
            setTimeout(() => location.reload(), 2000);
        }
        var keyBox3 = document.getElementById("rezult3");
        keyBox3.onclick = function () {
            document.getElementById("zadanie").textContent = "Нет, не верно =(";
            document.getElementById("game").style.background = 'red';
            setTimeout(() => location.reload(), 2000);
        }


    } else {
        if (blockvariant == 2) {
            document.getElementById("rezult2").textContent = sum;
            document.getElementById("rezult1").textContent = sum - getRandomInt(1, 5);
            document.getElementById("rezult3").textContent = sum + getRandomInt(1, 5);
            var keyBox2 = document.getElementById("rezult2");
            keyBox2.onclick = function () {
                document.getElementById("zadanie").textContent = "Верно!";
                document.getElementById("game").style.background = 'green';
                setTimeout(() => location.reload(), 1000);
            }
            var keyBox1 = document.getElementById("rezult1");
            keyBox1.onclick = function () {
                document.getElementById("zadanie").textContent = "Нет, не верно =(";
                document.getElementById("game").style.background = 'red';
                setTimeout(() => location.reload(), 2000);
            }
            var keyBox3 = document.getElementById("rezult3");
            keyBox3.onclick = function () {
                document.getElementById("zadanie").textContent = "Нет, не верно =(";
                document.getElementById("game").style.background = 'red';
                setTimeout(() => location.reload(), 2000);
            }
        } else {
            if (blockvariant == 3) {
                document.getElementById("rezult3").textContent = sum;
                document.getElementById("rezult2").textContent = sum - getRandomInt(1, 5);
                document.getElementById("rezult1").textContent = sum + getRandomInt(1, 5);
                var keyBox3 = document.getElementById("rezult3");
                keyBox3.onclick = function () {
                    document.getElementById("zadanie").textContent = "Верно!";
                    document.getElementById("game").style.background = 'green';
                    setTimeout(() => location.reload(), 1000);
                }
                var keyBox2 = document.getElementById("rezult2");
                keyBox2.onclick = function () {
                    document.getElementById("zadanie").textContent = "Нет, не верно =(";
                    document.getElementById("game").style.background = 'red';
                    setTimeout(() => location.reload(), 2000);
                }
                var keyBox1 = document.getElementById("rezult1");
                keyBox1.onclick = function () {
                    document.getElementById("zadanie").textContent = "Нет, не верно =(";
                    document.getElementById("game").style.background = 'red';
                    setTimeout(() => location.reload(), 2000);
                }
            }
        }
    }
}