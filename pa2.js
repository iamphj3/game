var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 6;
var brickColumnCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 50;
var score = 0;
var lives = 3;

var ballcolor ="#2196F3";
var brickcolor = "white";
var n=1;
var level_num=0;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}


function text(){	
	var con = document.getElementById("textarea");
	if(con.style.display=='block') {
		con.style.display='none';
	}else{
		con.style.display='block';
	}
	var con2 = document.getElementById("setarea");
	con2.style.display='none';
  var con3 = document.getElementById("gamearea");
  con3.style.display='none';
}

function level() {
	var con = document.getElementById("gamearea");
	if(con.style.display=='block') {
		con.style.display='none';
	}else{
		con.style.display='block';
	}
	var con2 = document.getElementById("textarea");
	con2.style.display='none';
	var con3 = document.getElementById("setarea");
	con3.style.display='none';
	
}

function set(){
	var con = document.getElementById("setarea");
	if(con.style.display=='block') {
		con.style.display='none';
	}else{
		con.style.display='block';
	}
	var con2 = document.getElementById("textarea");
	con2.style.display='none';
  var con3 = document.getElementById("gamearea");
  con3.style.display='none';
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft + 300;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth/2;
  }
}
function collisionDetection() {
  var cc=0;
  var rr=0;
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = -dy;
          b.status = 0;
          score++;
          if(score == brickRowCount*brickColumnCount) {
            alert("통과!");              
             for(cc=0; cc<brickColumnCount; cc++) {
              for(rr=0; rr<brickRowCount; rr++) {
                var q = bricks[cc][rr];
                q.status=1;
              }
            }
            score=0;
            level_num++;
            return 1;
          }
        }
      }
    }
  }

}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = ballcolor;
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#2196F3 ";
  ctx.fill();
  ctx.closePath();
}
function drawBricks() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status == 1) {
        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = brickcolor;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
function drawScore() {
  ctx.font = "18px Jua";
  ctx.fillStyle = "black";
  ctx.fillText("현재 스코어: "+score, 8, 20);
}
function drawLives() {
  ctx.font = "18px Jua";
  ctx.fillStyle = "red";
  ctx.fillText("남은 기회: "+lives, canvas.width-100, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  if (collisionDetection()==1){
    if(level_num==1) draw2();
    if (level_num==2) draw3();
    if (level_num==3) {alert("모든 관문을 통과했습니다!"); document.location.reload();}
  }
  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if(y + dy < ballRadius) {
    dy = -dy;
  }
  else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    }
    else {
      lives--;
      if(!lives) {
        alert("실패!");
        document.location.reload();
      }
      else {
        x = canvas.width/2;
        y = canvas.height-30;
        paddleX = (canvas.width-paddleWidth)/2;
      }
    }
  }

  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += n*dx;
  y += n*dy;
 requestAnimationFrame(draw);
}



function draw1() {
  ballRadius=20;
  paddleWidth = 125;
  draw();
  
}

function draw2() {
  ballRadius=15;
  paddleWidth = 100;
  level_num=1;
  draw();
  
}

function draw3() {
  ballRadius=10;
  paddleWidth = 75;
  level_num=2;
  draw();
}


function ball_size_plus(){
  ballRadius += 2;
  if(ballRadius > 100)ballRadius = 100;
} 

function ball_size_minus(){
  ballRadius -= 2;
  if(ballRadius < 5)ballRadius = 5;
} 

function pinkball(){
  ballcolor = "pink";
}
function blueball(){
  ballcolor = "#2196F3";
}
function purpleball(){
  ballcolor = "#9575CD";
}
function yellowball(){
  ballcolor = "#FFF176";
}
function greenball(){
  ballcolor = "#C5E1A5";
}
function whiteball(){
  ballcolor = "white";
}

function pinkbrick(){
  brickcolor = "pink";
}
function bluebrick(){
  brickcolor = "#2196F3";
}
function purplebrick(){
  brickcolor = "#9575CD";
}
function yellowbrick(){
  brickcolor = "#FFF176";
}
function greenbrick(){
  brickcolor = "#C5E1A5";
}
function whitebrick(){
  brickcolor = "white";
}


function paddle_size_plus(){
  paddleWidth += 5;
  if(paddleWidth > 200)paddleWidth = 200;
} 

function paddle_size_minus(){
  paddleWidth -= 5;
  if(paddleWidth < 10)paddleWidth = 10;
} 

function speed_plus(){
  n += 0.5;
}

function speed_minus(){
  n -=0.2;
  if (n < 0)n=0.1;
}
