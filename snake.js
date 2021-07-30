
window.onload = function () {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let canvasW = canvas.width;
    let canvasH = canvas.height;
    let snakeW = 20;
    let snakeH = 20;
    let snake = [];
    // Khai báo từ đầu tới đuôi của giun
    let baseLength = 4;
    for (let i = baseLength-1; i>=0; i--) {
        snake.push(
            {x:i, y:0}
        );
    }
    //Vẽ giun rồi đổ mầu cho nó
    function drawSnake(x,y) {
        ctx.beginPath();
        ctx.fillStyle = getRandomColor();
        ctx.fillRect(x*snakeW, y*snakeH, snakeW, snakeH);
    }
    //Dkien giun cắn thân lăn ra oẳng
    function checkCollision(x, y, array){
        for (let i = 1; i < array.length; i++){
            if (x == array[i].x && y == array[i].y) {
                return true;
            }
        }
        return false;
    }
    // Khai báo thức ăn của giun là 1 ô có tọa độ random
    food = {
        x : Math.floor(Math.random()*(canvasW/snakeW)),
        y : Math.floor(Math.random()*(canvasH/snakeH))
    }
    //Vẽ thức ăn và đổ màu cho nó
    function drawFood(x,y) {
        ctx.beginPath();
        ctx.fillStyle = getRandomColor();
        ctx.fillRect(x*snakeW, y*snakeH, snakeW, snakeH);
    }
    //Hàm đổ màu random được khởi tạo
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    // bảng tính điểm được tạo dưới khung canvas
    let score = 0;
    function drawScore(x) {
        ctx.fillStyle = getRandomColor();
        ctx.font = "30px Verdana"
        ctx.fillText("score: "+x,5, canvasH-5);
    }
    //Sự kiện bàn phím di chuyển giun
    document.addEventListener("keydown", getDirection);
    let direction = "right";
    function getDirection(num) {
            if (num.keyCode == 37 && direction != "right") {
                direction = "left";
            } else if (num.keyCode == 38 && direction != "down") {
                direction = "up";
            } else if (num.keyCode == 39 && direction != "left") {
                direction = "right";
            } else if (num.keyCode == 40 && direction != "up") {
                direction = "down";
            }
    }
    //Khởi tạo chạy game
    function gameLaunch() {
        //Vẽ thức ăn ban đầu
        ctx.beginPath();
        ctx.clearRect(0, 0, canvasW, canvasH);
        for (let i = 0; i < snake.length; i++) {
            let x = snake[i].x;
            let y = snake[i].y;
            drawSnake(x, y);
        }
        drawFood(food.x, food.y);
        //Tọa độ ban đầu là tọa độ 0 của đầu giun
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        //Tọa độ mới là theo hướng giun di chuyển
        if (direction == "left") snakeX--;
        else if (direction == "up") snakeY--;
        else if (direction == "right") snakeX++;
        else if (direction == "down") snakeY++;
        // ăn thức ăn thì thêm 1 ô vào đầu giun
        if(snakeX == food.x && snakeY == food.y) {
            food = {
                x : Math.floor(Math.random()*(canvasW/snakeW)),
                y : Math.floor(Math.random()*(canvasH/snakeH))
            }
            var newHead = {
                x: snakeX,
                y: snakeY
            };
            score++;
        } else {
            snake.pop();
            var newHead = {
                x: snakeX,
                y: snakeY
            };
        }
        snake.unshift(newHead);
        //đâm vào tường, vào người thì chạy lại game
        if (snakeX < 0 || snakeY < 0 || snakeX >= canvasW/snakeW || snakeY >= canvasH/snakeH || checkCollision(snakeX,snakeY,snake)){
            location.reload();
        }
        //hiển thị điểm
        drawScore(score);
    }
    //chạy game
    setInterval(gameLaunch,100);

}