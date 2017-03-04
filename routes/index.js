var express = require('express')
var router  = express.Router()
var loopStarted = false;
var startVar;
// Handle POST request to '/start'
router.post('/start', function (req, res) {
  // NOTE: Do something here to start the game
  startVar = {
    height: req.height,
    width: req.width,
  }
  // Response data
  var data = {
    color: "#DFFF00",
    name: "JakeTheSnake",
    head_url: "http://www.placecage.com/c/200/200", // optional, but encouraged!
    taunt: "Let's do thisss thang!", // optional, but encouraged!
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
      taunt: 'Outta my way, snake!', // optional, but encouraged!
    }
try{ 
    console.log(req.body);
    for (let snake of req.body.snakes){
        if (req.body.you == snake.id) {
             if (loopStarted == true) {
                if (snake.coords[0][0] == 0 && snake.coords[0][1] == 0) {
                    data.move = 'down';
                }
                if (snake.coords[0][1] == startVar.height && snake.coords[0][0] == startVar.width){
                    data.move = 'right';  
                }
             } 
             if (loopStarted == false) {
                 if (snake.coords[0][0] == 0) {
                   data.move = 'down';
                   loopStarted = true;
                 }
             }
            
        }
    }
} catch(error){console.log(error)}
  return res.json(data) 
})

module.exports = router
