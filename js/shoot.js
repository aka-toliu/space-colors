// shootSound = new Audio("./audio/shoot.mp3");



document.addEventListener("keydown", event => {

if (event.keyCode === 32 && event.repeat == false) {

    var shipInfo = ship.getBoundingClientRect();
    var shootPosX = shipInfo.left + 30;

    var shoot = document.createElement('DIV');
    shoot.classList.add('shoot', 'shoot-' + colors[game.color]);
    container.appendChild(shoot);
    shoot.style.transform = 'translateX(' + shootPosX + 'px)';

    shootMove(shoot);

    var shootSound = document.createElement("audio");
    shootSound.src = "./audio/shoot.mp3";
    shootSound.play();
    
    setTimeout(() => {
        shoot.remove();
        shootSound.remove();
    }, 450);


  }

});



function shootMove(shoot) {

    var init = 25;

  var shootUpdate =  setInterval(() => {
        init += 5;

        shoot.style.bottom = init + 'vh';

        shootCollider(shoot);
    }, 20);

    shootUpdate;

    setTimeout(() => {
        clearInterval(shootUpdate);
    }, 450);
    
}