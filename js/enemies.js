// setInterval(createMeteorites, 2000);
// setInterval(createLasers, 15000);
// setInterval(createLaserRotate, 15000);



function createMeteorites() {
    var posX = Math.round(Math.random() * (10 - 1)) * 10 + "%";
    var size = Math.round(Math.random() * (6 - 3)) + 5  + "0px";

    var numColor = Math.round(Math.random() * (3 - 0));

    var meteorite = document.createElement('DIV');
    meteorite.classList.add('meteorite');
    container.appendChild(meteorite);
    meteorite.classList.add('meteor-' + colors[numColor])
    meteorite.style.left = posX;
    meteorite.style.width = size;
    meteorite.style.height = size;

    setTimeout(() => {
        meteorite.remove();
    }, 9000);
    // console.log(numColor);

}




function fallEnemies(object, time) {

    var init = 0;

    setInterval(() => {
        init += 5;

        object.style.top = init + 'vh';

    }, time);

}




function createLasers() {
    var laserContainer = document.createElement('DIV');
    var numColor = Math.round(Math.random() * (3 - 0));

    container.appendChild(laserContainer);
    laserContainer.classList.add('laser-container');
    

    var laser = document.createElement('DIV');
    laser.classList.add('laser');
    laser.classList.add(colors[numColor]);

    var position = Math.round(Math.random() * (2 - 0));
    console.log(position);

    var laserSound = document.createElement("audio");
    laserSound.src = "./audio/laser.mp3";
    laserSound.play();

    if (position == 0) {
        var ObstacleL = document.createElement('DIV');
        ObstacleL.classList.add('obstacle-30-L', 'ob');
        laserContainer.appendChild(ObstacleL);

        var laserFXR = document.createElement('DIV');
        laserFXR.classList.add('laser-fx');
        laserFXR.style.right = '0';
        var laserFXL = document.createElement('DIV');
        laserFXL.classList.add('laser-fx');
        laserFXL.style.left = '0';
        laserFXL.style.transform = 'scaleX(-1)';

        laserContainer.appendChild(laser);
        laser.appendChild(laserFXR);
        laser.appendChild(laserFXL);


        var ObstacleR = document.createElement('DIV');
        ObstacleR.classList.add('obstacle-30-R', 'ob');
        laserContainer.appendChild(ObstacleR);
    } 
    else if (position == 1) {
        var Obstacle = document.createElement('DIV');
        Obstacle.classList.add('obstacle-70', 'ob');
        laserContainer.appendChild(Obstacle);

        


        var laserFXL = document.createElement('DIV');
        laserFXL.classList.add('laser-fx');
        laserFXL.style.left = '0';
        laserFXL.style.transform = 'scaleX(-1)';

        laserContainer.appendChild(laser);
        laser.appendChild(laserFXL);

    }
    else if (position == 2) {
        var Obstacle = document.createElement('DIV');
        Obstacle.classList.add('obstacle-70', 'ob');
        laserContainer.appendChild(Obstacle);
        laserContainer.style.transform = 'scaleX(-1)';

        

        var laserFXR = document.createElement('DIV');
        laserFXR.classList.add('laser-fx');
        laserFXR.style.left = '0';
        laserFXR.style.transform = 'scaleX(-1)';

        laserContainer.appendChild(laser);
        laser.appendChild(laserFXR);
 

    }

    setTimeout(() => {
        laserContainer.remove();
        laserSound.remove();
    }, 12000);
}



function createLaserRotate() {
    var laserRotateContainer = document.createElement('DIV');


    container.appendChild(laserRotateContainer);
    laserRotateContainer.classList.add('rotate-laser-container');

    var laserRotateL = document.createElement('DIV');
    laserRotateL.classList.add('rotate-laser-L');
    laserRotateContainer.appendChild(laserRotateL);


    var numColor = Math.round(Math.random() * (3 - 0));
    var laser = document.createElement('DIV');
    laser.classList.add('laser', colors[numColor]);
    laserRotateContainer.appendChild(laser);
    var laserFX = document.createElement('DIV');
    laser.appendChild(laserFX);
    laser.appendChild(laserFX);

    var laserRotateR = document.createElement('DIV');
    laserRotateR.classList.add('rotate-laser-R');
    laserRotateContainer.appendChild(laserRotateR);


    setTimeout(() => {
        laserRotateContainer.remove();
    }, 25000);
}