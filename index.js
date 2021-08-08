var  userClickedPattern=[];
var toogle=true;

var level=0;

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];


$(document).keypress(function(event){
  if(toogle){$("#level-title").text("Level " + level);nextSequence();toogle=false;}
});
  
$(".btn").on('click',function(){
  var t=$(this).attr('id');
  userClickedPattern.push(t);
  playsound(t);
  animatePress(t);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentlevel){
  if(gamePattern[currentlevel]===userClickedPattern[currentlevel])
  {console.log("success");
   if(userClickedPattern.length===gamePattern.length){
     setTimeout(
       function(){nextSequence();},1000);
   }
  }
  else{
    playsound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startover();
  }
}

function nextSequence() {
userClickedPattern=[];
level++;
$("#level-title").text("Level " + level);
var randomNumber = Math.floor(Math.random() * 4);
var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playsound(randomChosenColour);;
}

function startover(){
  userClickedPattern=[];
  toogle=true;
  level=0;
  gamePattern = [];
}


function playsound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentcolor){
  $("."+currentcolor).addClass("pressed");
  setTimeout(function(){$("."+currentcolor).removeClass("pressed")},100);
}

