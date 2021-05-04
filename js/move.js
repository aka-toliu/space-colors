
var updateL;
var updateR;
var posX = 0;
var move = false;



let widthScreen = document.body.clientWidth;


function turnR() {
  // console.log(posX);
  if (posX < widthScreen / 2 - 50) {
    // console.log('Turn-R');
    newPosX = posX += 7;
  }

  ship.style.transform = "translateX(" + newPosX + "px)";

}


function turnL() {
  // console.log(posX);
  if (posX > (widthScreen / 2 - 50) * -1) {
    // console.log('Turn-R');
    newPosX = posX -= 7;
  }

  ship.style.transform = "translateX(" + newPosX + "px)";

}

document.addEventListener("keydown", event => {


  // ------------ Right -------------------------------
  if (event.which === 39 && event.repeat === false && !ship.classList.contains('turn-L')) {


    ship.classList.add("turn-R");
    console.log('R-down');
    clearInterval(updateL);

    move = true;
    if (move == true) {
      updateR = setInterval(turnR, 10);
    } else {
      clearInterval(updateL);
      clearInterval(updateR);
    }

  }

  // ------------ Left -------------------------------
  if (event.keyCode === 37 && event.repeat === false && !ship.classList.contains('turn-R')) {

    ship.classList.add("turn-L");
    console.log('L-down');
    clearInterval(updateR);

    move = true;
    if (move == true) {
      updateL = setInterval(turnL, 10);
    } else {
      clearInterval(updateL);
      clearInterval(updateR);
    }

  }


});




document.addEventListener("keyup", event => {

  // -------- Right ------------
  if (event.which === 39) {

    ship.classList.remove("turn-R");
    console.log('R-up');
    move = false;
    clearInterval(updateL);
    clearInterval(updateR);
  }

  // -------- Left ------------
  if (event.keyCode === 37) {

    ship.classList.remove("turn-L");
    console.log('L-up');
    move = false;
    clearInterval(updateL);
    clearInterval(updateR);
  }

});
