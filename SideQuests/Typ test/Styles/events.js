document.addEventListener('DOMContentLoaded', (event) => {
    const snakeButton = document.getElementById('snakeButton');
    const pacmanButton = document.getElementById('pacmanButton');
    const snakeCanvas = document.getElementById('snakeCanvas');
    const pacmanCanvas = document.getElementById('pacmanCanvas');
    const ctxSnake = snakeCanvas.getContext('2d');
    const ctxPacman = pacmanCanvas.getContext('2d');
    let inputSequence = '';

    document.addEventListener('keydown', (event) => {
        inputSequence += event.key.toLowerCase();
        if (inputSequence.includes('games')) {
            showGameMenu();
            inputSequence = ''; // Reset de invoerreeks
        }
    });

    function showGameMenu() {
        document.querySelector('h1').style.display = 'none';
        document.querySelector('p').style.display = 'none';
        snakeButton.style.display = 'block';
        pacmanButton.style.display = 'block';
    }

    snakeButton.addEventListener('click', () => {
        startSnakeGame();
    });

    pacmanButton.addEventListener('click', () => {
        startPacmanGame();
    });

    function startSnakeGame() {
        snakeCanvas.style.display = 'block';
        pacmanCanvas.style.display = 'none';
        snakeButton.style.display = 'none';
        pacmanButton.style.display = 'none';

        const snake = [{ x: 200, y: 200 }];
        let direction = 'RIGHT';
        let food = { x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20 };
        let score = 0;

        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
            if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
            if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
            if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
        });

        function gameLoop() {
            if (isGameOver()) {
                alert(`Game Over! Your score: ${score}`);
                snakeCanvas.style.display = 'none';
                document.querySelector('h1').style.display = 'block';
                document.querySelector('p').style.display = 'block';
                snakeButton.style.display = 'block';
                pacmanButton.style.display = 'block';
                return;
            }

            setTimeout(() => {
                clearCanvas(ctxSnake, snakeCanvas);
                moveSnake();
                drawSnake();
                drawFood();
                gameLoop();
            }, 100);
        }

        function clearCanvas(ctx, canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        function moveSnake() {
            const head = { ...snake[0] };
            if (direction === 'UP') head.y -= 20;
            if (direction === 'DOWN') head.y += 20;
            if (direction === 'LEFT') head.x -= 20;
            if (direction === 'RIGHT') head.x += 20;

            snake.unshift(head);

            if (head.x === food.x && head.y === food.y) {
                score++;
                food = { x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20 };
            } else {
                snake.pop();
            }
        }

        function drawSnake() {
            ctxSnake.fillStyle = 'green';
            snake.forEach(segment => {
                ctxSnake.fillRect(segment.x, segment.y, 20, 20);
            });
        }

        function drawFood() {
            ctxSnake.fillStyle = 'red';
            ctxSnake.fillRect(food.x, food.y, 20, 20);
        }

        function isGameOver() {
            const head = snake[0];
            if (head.x < 0 || head.x >= snakeCanvas.width || head.y < 0 || head.y >= snakeCanvas.height) {
                return true;
            }

            for (let i = 1; i < snake.length; i++) {
                if (head.x === snake[i].x && head.y === snake[i].y) {
                    return true;
                }
            }

            return false;
        }

        gameLoop();
    }

    function startPacmanGame() {
        pacmanCanvas.style.display = 'block';
        snakeCanvas.style.display = 'none';
        snakeButton.style.display = 'none';
        pacmanButton.style.display = 'none';

        const pacman = { x: 200, y: 200, radius: 20, direction: 'RIGHT' };
        const pellets = [];
        const walls = [];
        let score = 0;

        // Create pellets
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                pellets.push({ x: i * 20 + 10, y: j * 20 + 10 });
            }
        }

        // Create walls (example)
        walls.push({ x: 100, y: 100, width: 20, height: 100 });
        walls.push({ x: 200, y: 200, width: 100, height: 20 });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowUp') pacman.direction = 'UP';
            if (event.key === 'ArrowDown') pacman.direction = 'DOWN';
            if (event.key === 'ArrowLeft') pacman.direction = 'LEFT';
            if (event.key === 'ArrowRight') pacman.direction = 'RIGHT';
        });

        function gameLoop() {
            if (isGameOver()) {
                alert(`Game Over! Your score: ${score}`);
                pacmanCanvas.style.display = 'none';
                document.querySelector('h1').style.display = 'block';
                document.querySelector('p').style.display = 'block';
                snakeButton.style.display = 'block';
                pacmanButton.style.display = 'block';
                return;
            }

            setTimeout(() => {
                clearCanvas(ctxPacman, pacmanCanvas);
                movePacman();
                drawPacman();
                drawPellets();
                drawWalls();
                gameLoop();
            }, 100);
        }

        function clearCanvas(ctx, canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        function movePacman() {
            if (pacman.direction === 'UP') pacman.y -= 20;
            if (pacman.direction === 'DOWN') pacman.y += 20;
            if (pacman.direction === 'LEFT') pacman.x -= 20;
            if (pacman.direction === 'RIGHT') pacman.x += 20;

            // Check for collisions with walls
            for (const wall of walls) {
                if (
                    pacman.x + pacman.radius > wall.x &&
                    pacman.x - pacman.radius < wall.x + wall.width &&
                    pacman.y + pacman.radius > wall.y &&
                    pacman.y - pacman.radius < wall.y + wall.height
                ) {
                    // Undo movement
                    if (pacman.direction === 'UP') pacman.y += 20;
                    if (pacman.direction === 'DOWN') pacman.y -= 20;
                    if (pacman.direction === 'LEFT') pacman.x += 20;
                    if (pacman.direction === 'RIGHT') pacman.x -= 20;
                }
            }

            // Check for collisions with pellets
            for (let i = 0; i < pellets.length; i++) {
                const pellet = pellets[i];
                if (
                    pacman.x + pacman.radius > pellet.x &&
                    pacman.x - pacman.radius < pellet.x &&
                    pacman.y + pacman.radius > pellet.y &&
                    pacman.y - pacman.radius < pellet.y
                ) {
                    pellets.splice(i, 1);
                    score++;
                    break;
                }
            }
        }

        function drawPacman() {
            ctxPacman.fillStyle = 'yellow';
            ctxPacman.beginPath();
            ctxPacman.arc(pacman.x, pacman.y, pacman.radius, 0.2 * Math.PI, 1.8 * Math.PI);
            ctxPacman.lineTo(pacman.x, pacman.y);
            ctxPacman.fill();
        }

        function drawPellets() {
            ctxPacman.fillStyle = 'white';
            for (const pellet of pellets) {
                ctxPacman.beginPath();
                ctxPacman.arc(pellet.x, pellet.y, 5, 0, 2 * Math.PI);
                ctxPacman.fill();
            }
        }

        function drawWalls() {
            ctxPacman.fillStyle = 'blue';
            for (const wall of walls) {
                ctxPacman.fillRect(wall.x, wall.y, wall.width, wall.height);
            }
        }

        function isGameOver() {
            if (pacman.x < 0 || pacman.x > pacmanCanvas.width || pacman.y < 0 || pacman.y > pacmanCanvas.height) {
                return true;
            }
            return false;
        }

        gameLoop();
    }
});