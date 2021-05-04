var ship = document.querySelector('#ship');
var hud = document.querySelector('#hud');
var container = document.querySelector('.game-container');

var colors = ['red', 'yellow', 'blue', 'green']

var game = {

    life: 3,
    color: -1,
    points: 0,
    powerUp: 0,
    speed: 0,
    wave: 0

}
 
var ballsHud = hud.querySelectorAll('.hud-color-ball');
// clearAndChangeHud();
// changeShipcolor();

// ----------- limpa as cores selecionadas na HUD e muda para a próxima -----
function clearAndChangeHud() {
    for (let i = 0; i < ballsHud.length; i++) {
        ballsHud[i].classList.remove('hud-color-ball--selected');
    }

    ballsHud[game.color].classList.add('hud-color-ball--selected');
}



function changeShipColor() {

    // for (let i = 0; i < ballsHud.length; i++) {
    //     // ship.classList.remove('ship-' + colors[i]);
        
        
    // }
    document.documentElement.setAttribute('color', colors[game.color]);
    // ship.classList.add('ship-' + colors[game.color]);
    
}






document.addEventListener("keydown", event => {


    // ------------ UP -------------------------------
    if (event.which === 38) {

        console.log('up');


        if(game.color < ballsHud.length - 1){
            game.color += 1;
           
        }else{
            game.color = 0;
           
        }
        clearAndChangeHud();
        changeShipColor();

        console.log(game.color);

    }

    // ------------ DOWN -------------------------------
    if (event.which === 40) {

        console.log('down');

        if(game.color > 0){
            game.color += -1;
           
        }else{
            game.color = ballsHud.length - 1;
        }
        clearAndChangeHud();
        changeShipColor();
        console.log(game.color);
    }

});
 

var j;
var updateL;
var updateR;
var posX = 0;



let widthScreen = document.body.clientWidth;


function turnR() {

  if(posX < (widthScreen/2 - 20)){
    newPosX = posX += 7;
  }

  ship.style.transform = "translateX(" + newPosX + "px)";
  
}


function turnL() {

  if(posX > (widthScreen/2 - 20) * -1){
  newPosX = posX -= 7;
  }

  ship.style.transform = "translateX(" + newPosX + "px)";
  
}

document.addEventListener("keydown", event => {

  
    // ------------ Right -------------------------------
    if (event.which === 39 && event.repeat == false && !ship.classList.contains('turn-L')) {


      ship.classList.add("turn-R");
      console.log(event);
      clearInterval(updateL);
      updateR = setInterval(turnR, 10);

      }
    
      // ------------ Left -------------------------------
      if (event.keyCode  === 37 && event.repeat == false && !ship.classList.contains('turn-R')) {
    
        ship.classList.add("turn-L");
        console.log('L-down');
        clearInterval(updateR);
        updateL = setInterval(turnL, 10);
      }

});




document.addEventListener("keyup", event => {


    // -------- Right ------------
    if (event.which === 39) {
  
      ship.classList.remove("turn-R");
      console.log('R-up');
      clearInterval(updateR);
      clearInterval(updateL);
  
    }
  
    // -------- Left ------------
    if (event.keyCode === 37) {
    
        ship.classList.remove("turn-L");
        console.log('L-up');
        clearInterval(updateL);
        clearInterval(updateR);

      }
});

 




document.addEventListener("keydown", event => {

if (event.keyCode === 32 && event.repeat == false) {

    var shipInfo = ship.getBoundingClientRect();
    var shootPosX = shipInfo.left + 30;

    var shoot = document.createElement('DIV');
    shoot.classList.add('shoot');
    container.appendChild(shoot);
    shoot.style.transform = 'translateX(' + shootPosX + 'px)';

    shootMove(shoot);

    setTimeout(() => {
        shoot.remove();
    }, 450);


  }

});



function shootMove(shoot) {

    var init = 25;

    setInterval(() => {
        init += 5;

        shoot.style.bottom = init + 'vh'
    }, 20);
    
}