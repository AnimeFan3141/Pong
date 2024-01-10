let gamestate = 'start';
let board = document.querySelector(".board");
let ball = document.querySelector(".ball");
let paddle_1 = document.querySelector(".player_1");
let paddle_2 = document.querySelector(".player_2");
let offsetRight, offsetBottom;
let paddleSpeed = paddle_1.offsetHeight / 6;
let ballMove;
let reset = false;

let dx = Math.trunc(Math.random() * 3) + 2;
let dy = Math.trunc(Math.random() * 4) + 2;
let xdir = Math.trunc(Math.random() * 2);
let ydir = Math.trunc(Math.random() * 2);

console.log(dx + " " + dy + " " + xdir + " " + ydir);

let keyPressed = {};

onkeydown = onkeyup = function(e){
    keyPressed[e.key] = e.type == 'keydown';
}

function gameLoop() {
    if(keyPressed['Enter']){
        if(gamestate == 'start'){
            gamestate = 'play';
            ballMove = setInterval(function() {
                //Collision code
                offsetRight = board.offsetWidth - ball.offsetLeft - ball.offsetWidth;
                offsetBottom = board.offsetHeight - ball.offsetTop - ball.offsetHeight;
                if(ball.offsetLeft <= 0 || offsetRight <= 0){
                    ball.style.top = board.offsetHeight / 2 - ball.offsetHeight / 2 + "px";
                    ball.style.left = board.offsetWidth / 2 - ball.offsetWidth / 2 + "px";
                    dx = Math.trunc(Math.random() * 3) + 2;
                    dy = Math.trunc(Math.random() * 3) + 2;
                    xdir = Math.trunc(Math.random() * 2);
                    ydir = Math.trunc(Math.random() * 2);
                    console.log(dx + " " + dy + " " + xdir + " " + ydir);
                    paddle_1.style.top = board.offsetHeight / 2 - paddle_1.offsetHeight / 2 + "px";
                    paddle_2.style.top = board.offsetHeight / 2 - paddle_2.offsetHeight / 2 + "px";
                    reset = true;
                    gamestate = 'start';
                }
                if((ball.offsetLeft <= paddle_1.offsetLeft + paddle_1.offsetWidth &&
                ball.offsetTop > paddle_1.offsetTop && 
                ball.offsetTop < paddle_1.offsetTop + paddle_1.offsetHeight) ||
                (ball.offsetLeft + ball.offsetWidth >= paddle_2.offsetLeft &&
                ball.offsetTop > paddle_2.offsetTop && 
                ball.offsetTop < paddle_2.offsetTop + paddle_2.offsetHeight)){
                    xdir = (xdir + 1) % 2;
                }
                if(ball.offsetTop <= 0 || offsetBottom <= 0){
                    ydir = (ydir + 1) % 2;
                }
                //Movement code
                if(xdir == 1){
                    ball.style.left = ball.offsetLeft - dx + "px";
                } else {
                    ball.style.left = ball.offsetLeft + dx + "px";
                }
                if(ydir == 1){
                    ball.style.top = ball.offsetTop - dx + "px";
                } else {
                    ball.style.top = ball.offsetTop + dx + "px";
                }
                if(reset == true){
                    reset = false;
                    clearInterval(ballMove);
                }
            }, 10);
        }
    }
    if(gamestate == 'play'){
        if(keyPressed['w'] && !keyPressed['s'] && paddle_1.offsetTop > 0){
            paddle_1.style.top = paddle_1.offsetTop - paddleSpeed + "px";
        }
        if(keyPressed['s'] && !keyPressed['w'] && paddle_1.offsetTop + paddle_1.offsetHeight + ball.offsetHeight / 2 < board.offsetHeight){
            paddle_1.style.top = paddle_1.offsetTop + paddleSpeed + "px";
        }

        if(keyPressed['ArrowUp'] && !keyPressed['ArrowDown'] && paddle_2.offsetTop > 0){
            paddle_2.style.top = paddle_2.offsetTop - paddleSpeed + "px";
        }
        if(keyPressed['ArrowDown'] && !keyPressed['ArrowUp'] && paddle_2.offsetTop + paddle_2.offsetHeight + ball.offsetHeight / 2 < board.offsetHeight){
            paddle_2.style.top = paddle_2.offsetTop + paddleSpeed + "px";
        }
    }

    setTimeout(gameLoop, 10);
}

gameLoop();