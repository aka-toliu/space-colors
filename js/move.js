
var updateL;
var updateR;
var updateMove;
var side;
var posX = 0;
var move = false;



let widthScreen = document.body.clientWidth;



function turnShip() {
  console.log('ta rodando');
  if(side == "R" &&  move == true && posX < (widthScreen / 2 - 50)){
    var newPosR = posX += 10;
    ship.style.transform = "translateX(" + newPosR + "px)";

  }
  else if(side == "L" && move == true && posX > (widthScreen / 2 - 50) * -1){
    var newPosL = posX += -10;
    ship.style.transform = "translateX(" + newPosL + "px)";

  }else{
    // updateMove = '';
    clearInterval(updateMove);

  }
}

// function turnR() {

//   if (posX < widthScreen / 2 - 50 && move === true) {
//     var newPosR = posX += 7;
//     ship.style.transform = "translateX(" + newPosR + "px)";
//   }

// }


// function turnL() {

//   if (posX > (widthScreen / 2 - 50) * -1 && move === true) {
//     var newPosL = posX += -7;
//     ship.style.transform = "translateX(" + newPosL + "px)";
//   }

// }

document.addEventListener("keydown", event => {
  // console.log(event);
  // ------------ Right -------------------------------
  if (event.key === 'ArrowRight' && event.repeat === false && !ship.classList.contains('turn-L')) {

    
    ship.classList.add("turn-R");
    console.log('R-down');
    // clearInterval(updateMove);
    move = true;
    side = "R";
    updateMove = setInterval(turnShip, 20);
    

  }

  // ------------ Left -------------------------------
  if (event.key === 'ArrowLeft' && event.repeat === false && !ship.classList.contains('turn-R')) {

    ship.classList.add("turn-L");
    console.log('L-down');
    move = true;
    side = "L";
    updateMove = setInterval(turnShip, 20);


  }

  // if (event.key === 'ArrowRight' && event.key === 'ArrowRight') {
  //   clearInterval(updateMove);
  // }


  // ------------ Right -------------------------------
  // if (event.which === 39 && event.repeat === false && !ship.classList.contains('turn-L')) {


  //   ship.classList.add("turn-R");
  //   console.log('R-down');
  //   clearInterval(updateL);
  //   move = true;
  //   updateR = setInterval(turnR, 10);

  // }

  // ------------ Left -------------------------------
  // if (event.keyCode === 37 && event.repeat === false && !ship.classList.contains('turn-R')) {

  //   ship.classList.add("turn-L");
  //   console.log('L-down');
  //   clearInterval(updateR);
  //   move = true;
  //   updateL = setInterval(turnL, 10);

  // }



});




document.addEventListener("keyup", event => {

  if (event.key === 'ArrowRight' && event.key === 'ArrowRight') {
    clearInterval(updateMove);
  }

  // -------- Right ------------
  if (event.key === 'ArrowRight') {
    move = false;
    ship.classList.remove("turn-R");
    clearInterval(updateMove);

  }

  // -------- Left ------------
  if (event.key === 'ArrowLeft') {
    move = false;
    ship.classList.remove("turn-L");
    clearInterval(updateMove);
  }



  // // -------- Right ------------
  // if (event.which === 39) {

  //   ship.classList.remove("turn-R");
  //   console.log('R-up');
  //   move = false;
  //   clearInterval(updateL);
  //   clearInterval(updateR);
  // }

  // // -------- Left ------------
  // if (event.keyCode === 37) {

  //   ship.classList.remove("turn-L");
  //   console.log('L-up');
  //   move = false;
  //   clearInterval(updateL);
  //   clearInterval(updateR);
  // }

});
