function createMeteorites() {
    var posX = Math.round(Math.random() * (10 - 1)) * 10 + "%";
    var numColor = Math.round(Math.random() * (3 - 0));

    var meteorite = document.createElement('DIV');
    meteorite.classList.add('meteorite');
    container.appendChild(meteorite);
    meteorite.classList.add(colors[numColor])
    meteorite.style.left = posX;

    setTimeout(() => {
        meteorite.remove();
    }, 9000);
    console.log(numColor);

}

setInterval(createMeteorites, 2000);


function fallEnemies(object, time) {

    var init = 0;

    setInterval(() => {
        init += 5;

        object.style.top = init + 'vh';

    }, time);

}