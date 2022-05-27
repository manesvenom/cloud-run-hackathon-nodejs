const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Let the battle begin!');
});

app.post('/', function (req, res) {
  //console.log(req.body);

  data = req.body;
  var dim = data.arena.dims; 
 // console.log(dim[0]);
 // console.log(dim[1]);
  var state = data.arena.state;
//  console.log(data.arena.state);

  let nextPosition = findPosition(data._links.self.href,state,dim);
  console.log(nextPosition);

  res.send(nextPosition);

});

function shouldFire(myLink, state){
     let sprite = state[myLink];

     for (var key in state) {
        let obj = state[key];
        if(obj.x == sprite.x){
          return true;
        }
  }

      return false;
}

function shouldRunAway(myLink, state){
  let sprite = state[myLink];
  if(sprite.wasHit){
    return true;
  }else{
    return false;
  }
}

function findPosition(myLink, state,dim){
  
  let keys =  Object.keys(state);
  let sprite = state[myLink];

   var centerX = Math.floor(dim[0]/2);
   var centerY = Math.floor(dim[1]/2);

    var spriteX = sprite.x;
    var spriteY = sprite.y;
    if(!shouldRunAway(myLink,state)){
      if(shouldFire(myLink,state)){
        return 'T';
      }
    }
   

    if(spriteX > centerX){
      if((Math.floor((Math.random()*spriteX)))%2==0){
        return 'R';
      }else{
        return 'F';
      }
    }else{
      const moves = ['F', 'T', 'L', 'R'];
      return (moves[Math.floor(Math.random() * moves.length)]);
    }


}





app.listen(process.env.PORT || 8080);
