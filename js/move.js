
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
