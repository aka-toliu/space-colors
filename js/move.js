var side = 'idle';
var move = false;
var moving;
var posX = 0;

document.addEventListener("keydown", event => {

  if (event.isTrusted == false) {
    clearTimeout(moving);
  }

  if (event.key === 'ArrowRight' && event.key === 'ArrowLeft') {
    clearTimeout(moving)
  }

  if (event.key === 'ArrowRight' && event.repeat == false && side !== 'L') {

    console.log('R-down');
    ship.classList.add("turn-R");
    side = 'R';
    move = true;
    moveShip();

  }

  if (event.key === 'ArrowLeft' && event.repeat == false && side !== 'R') {
    console.log('L-down');
    ship.classList.add("turn-L");
    side = 'L';
    move = true;
    moveShip();
  }


});

document.addEventListener("keyup", event => {



  if (event.key === 'ArrowRight') {

    console.log('R-up');
    ship.classList.remove("turn-R");
    side = 'idle';
    move = false;
    clearTimeout(moving);

  }

  if (event.key === 'ArrowLeft') {

    console.log('L-up');
    ship.classList.remove("turn-L");
    side = 'idle';
    move = false;
    clearTimeout(moving);
  }

});


function moveShip() {


  let widthScreen = document.body.clientWidth;

  if (side == 'R' && move == true && posX < (widthScreen / 2 - 50)) {
    // console.log('turning-R');
    moving = setTimeout(moveShip, 20); 7

    var newPosR = posX += 15;
    ship.style.transform = "translateX(" + newPosR + "px)";
  } else {
    ship.classList.remove("turn-R");

  }

  if (side == 'L' && move == true && posX > (widthScreen / 2 - 50) * -1) {
    // console.log('turning-L');
    moving = setTimeout(moveShip, 20);

    var newPosL = posX += -15;
    ship.style.transform = "translateX(" + newPosL + "px)";
  } else {
    ship.classList.remove("turn-L");
  }

}

















// var updateL;
// var updateR;
// var updateMove;
// var side;
// var posX = 0;
// var move = false;



// let widthScreen = document.body.clientWidth;



// function turnShip() {
//   console.log('ta rodando');
//   if(side == "R" &&  move == true && posX < (widthScreen / 2 - 50)){
//     var newPosR = posX += 10;
//     ship.style.transform = "translateX(" + newPosR + "px)";

//   }
//   else if(side == "L" && move == true && posX > (widthScreen / 2 - 50) * -1){
//     var newPosL = posX += -10;
//     ship.style.transform = "translateX(" + newPosL + "px)";

//   }else{
//     clearInterval(updateMove);

//   }
// }


// document.addEventListener("keydown", event => {

//   // ------------ Right -------------------------------
//   if (event.key === 'ArrowRight' && event.repeat === false && !ship.classList.contains('turn-L')) {


//     ship.classList.add("turn-R");
//     console.log('R-down');
//     move = true;
//     side = "R";
//     updateMove = setInterval(turnShip, 20);


//   }

//   // ------------ Left -------------------------------
//   if (event.key === 'ArrowLeft' && event.repeat === false && !ship.classList.contains('turn-R')) {

//     ship.classList.add("turn-L");
//     console.log('L-down');
//     move = true;
//     side = "L";
//     updateMove = setInterval(turnShip, 20);


//   }

// });




// document.addEventListener("keyup", event => {

//   if (event.key === 'ArrowRight' && event.key === 'ArrowRight') {
//     clearInterval(updateMove);
//   }

//   // -------- Right ------------
//   if (event.key === 'ArrowRight') {
//     move = false;
//     ship.classList.remove("turn-R");
//     clearInterval(updateMove);

//   }

//   // -------- Left ------------
//   if (event.key === 'ArrowLeft') {
//     move = false;
//     ship.classList.remove("turn-L");
//     clearInterval(updateMove);
//   }

// });
