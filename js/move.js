
var updateL;
var updateR;
var posX = 0;



let widthScreen = document.body.clientWidth;


function turnR() {
  console.log(posX);
  if(posX < widthScreen/2 - 20){
    // console.log('Turn-R');
    newPosX = posX += 7;
  }

  ship.style.transform = "translateX(" + newPosX + "px)";
  
}


function turnL() {

  if(posX > (widthScreen/2 - 20) * -1){
    // console.log('Turn-R');
  newPosX = posX -= 7;
  }

  ship.style.transform = "translateX(" + newPosX + "px)";
  
}

document.addEventListener("keydown", event => {


    // ------------ Right -------------------------------
    if (event.which === 39 && event.repeat === false && !ship.classList.contains('turn-L')) {


      ship.classList.add("turn-R");
      console.log(event);
      console.log('R-down');
      clearInterval(updateL);
      updateR = setInterval(turnR, 10);

      }
    
      // ------------ Left -------------------------------
      if (event.keyCode  === 37 && event.repeat === false && !ship.classList.contains('turn-R')) {
    
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
      clearInterval(updateL);
      clearInterval(updateR);
    }
  
    // -------- Left ------------
    if (event.keyCode === 37) {
    
        ship.classList.remove("turn-L");
        console.log('L-up');
        clearInterval(updateL);
        clearInterval(updateR);
      }
    
});
