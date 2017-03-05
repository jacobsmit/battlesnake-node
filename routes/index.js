var express = require('express')
var router  = express.Router()
var loopStarted;
var startVar;
var lastMove;
// Handle POST request to '/start'
router.post('/start', function (req, res) {
  // NOTE: Do something here to start the game
  lastMove = 'left';
  loopStarted = false;
  startVar = {
    height: req.body.height,
    width: req.body.width,
  }
  // Response data
  var data = {
    color: "#DFFF00",
    name: "JakeTheSnake",
    head_url: "https://pbs.twimg.com/profile_images/753571163243057152/v8rga-7U.jpg", // optional, but encouraged!
    taunt: "You Like Jazz??", // optional, but encouraged!
    head_type: "tongue",
    tail_type: "curled",
  }

  return res.json(data)
})

// Handle POST request to '/move'
router.post('/move', function (req, res) {
  // NOTE: Do something here to generate your move
var data = {
      move: 'left', // one of: ['up','down','left','right']
      taunt: 'You Like Jazz??', // optional, but encouraged!
    }
try{ 
    for (let snake of req.body.snakes){
        if (req.body.you == snake.id) {
             if (loopStarted == true) {
               console.log(loopStarted, "loop has started"); 
               if (snake.coords[0][0] == 0 && snake.coords[0][1] == 0) {
                    data.move = 'down';
                    console.log("move down");
                    lastMove = 'down';
                }
                else if (snake.coords[0][1] == (startVar.height-1) && snake.coords[0][0] == 0){
                    data.move = 'right';
                    console.log("move right");
                    lastMove = 'right';
                }
               else if (snake.coords[0][0] == (startVar.width-1) && snake.coords[0][1] == (startVar.height-1)) {
                    data.move = 'up';
                    lastMove = 'up';
               }
               else if (snake.coords[0][0] == (startVar.width-1) && snake.coords[0][1] == 0) {
                    data.move = 'left';
                    lastMove = 'left';
               }
                else {
                    data.move = lastMove;  
                }
               for (var i = 0; i < 6; i++) {
                  console.log(req.body.food[i][0]);  
               }
             } 
             if (loopStarted == false) {
                 if (snake.coords[0][0] == 0) {
                   data.move = 'down';
                   loopStarted = true;
                   console.log(snake.coords);
                   console.log(loopStarted, "Setting Loop started as true");
                   lastMove = 'down';
                 }
             }
        }
    }
} catch(error){console.log(error)}
  console.log(data.move);
  console.log(startVar);
  return res.json(data) 
})

module.exports = router
