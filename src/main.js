var ship = document.querySelector('#ship');
var container = document.querySelector('.game-container');
 

var updateR;
var updateL;
var posX = 0;



let widthScreen = document.body.clientWidth;


function turnR() {

  if(posX < (widthScreen/2 - 100)){
    newPosX = posX += 7;
  }

  ship.style.transform = "translateX(" + newPosX + "px)";
  
}


function turnL() {

  if(posX > (widthScreen/2 - 100) * -1){
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