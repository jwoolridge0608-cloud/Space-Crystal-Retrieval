const player=document.getElementById("player");
const crystal=document.getElementById("crystal");
const enemy=document.getElementById("enemy");

const game=document.getElementById("gameArea");

const scoreDisplay=document.getElementById("score");
const timerDisplay=document.getElementById("timer");

const message=document.getElementById("message");

const startBtn=document.getElementById("startBtn");
const restartBtn=document.getElementById("restartBtn");

let x=20;
let y=20;

let enemyX=650;

let score=0;
let time=60;

let timer;

let playing=false;

startBtn.onclick=startGame;

restartBtn.onclick=restartGame;

function startGame(){

game.style.display="block";

startBtn.style.display="none";

restartBtn.style.display="none";

message.innerHTML="";

playing=true;

timer=setInterval(updateTimer,1000);

}

function updateTimer(){

time--;

timerDisplay.innerHTML=time;

if(time<=0){

loseGame();

}

}

document.addEventListener("keydown",movePlayer);

function movePlayer(e){

if(!playing)return;

let speed=15;

if(e.key=="ArrowUp"||e.key=="w")y-=speed;

if(e.key=="ArrowDown"||e.key=="s")y+=speed;

if(e.key=="ArrowLeft"||e.key=="a")x-=speed;

if(e.key=="ArrowRight"||e.key=="d")x+=speed;

if(x<0)x=0;
if(y<0)y=0;

if(x>760)x=760;
if(y>460)y=460;

player.style.left=x+"px";
player.style.top=y+"px";

checkCrystal();

checkEnemy();

}

function checkCrystal(){

let px=x;
let py=y;

let cx=crystal.offsetLeft;
let cy=crystal.offsetTop;

if(Math.abs(px-cx)<30&&Math.abs(py-cy)<30){

score++;

scoreDisplay.innerHTML=score;

moveCrystal();

if(score>=10){

winGame();

}

}

}

function moveCrystal(){

let newX=Math.random()*730;

let newY=Math.random()*430;

crystal.style.left=newX+"px";
crystal.style.top=newY+"px";

}

function checkEnemy(){

enemyX-=2;

if(enemyX<0){

enemyX=760;

enemy.style.top=Math.random()*430+"px";

}

enemy.style.left=enemyX+"px";

let ex=enemy.offsetLeft;
let ey=enemy.offsetTop;

if(Math.abs(x-ex)<35&&Math.abs(y-ey)<35){

loseGame();

}

requestAnimationFrame(checkEnemy);

}

function winGame(){

playing=false;

clearInterval(timer);

message.innerHTML="🎉 You Win!";

restartBtn.style.display="inline-block";

}

function loseGame(){

playing=false;

clearInterval(timer);

message.innerHTML="💥 Game Over";

restartBtn.style.display="inline-block";

}

function restartGame(){

location.reload();

}