class Game {

  constructor(canvasId, onGameEnd) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = 384;
    this.canvas.height = 498;
    this.ctx = this.canvas.getContext('2d');

    this.drawIntervalId = undefined;
    this.fps = 1000 / 60;

    // iteration 1: setup the background
    this.bg = new Background(this.ctx);

    // iteration 2: setup the flappy
    this.bird = new FlappyBird(this.ctx, 0, this.canvas.height / 2);

    this.pipes = [];
    this.drawPipesCount = 0;
    this.pipesFrequency = 100;
    this.score = 0;
    this.bestScore = 0;
    this.onGameEnd = onGameEnd;
    

    // bonus: setup the score
  }
  

  onKeyEvent(event) {
    // iteration 2: link flappy key events
    this.bird.onKeyEvent(event);
    
  }

  start() {
    
    if (!this.drawIntervalId && !this.onGameEnd) {
      this.drawIntervalId = setInterval(() => {
        // Iteration 1: each 60f clear - move - draw - [next iterations: addPipes - checkCollisions - checkScore]
        this.clear();

        this.move();
        this.draw();
        this.addPipes();
        this.checkCollisions();
        this.checkScore();
        console.log(this.score);
      }, this.fps);
    }
  }

  drawRestartButton() {
    const restartButton = new Image();
    restartButton.src = 'assets/img/restart.png';
    restartButton.onload = () => {
      this.ctx.drawImage(restartButton, this.canvas.width / 2 - 50, this.canvas.height / 2 - 25, 100, 50);
    }
  }
  

  stop() {
    // Iteration 1: stop the game
    clearInterval(this.drawIntervalId);
    this.drawIntervalId = null;
    this.onGameEnd = true;  // Juego terminado
    this.drawRestartButton();
  }

  restart(event) {

    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
  
    // Verifica si el clic está dentro de los límites del botón de reinicio
    if (x >= this.canvas.width / 2 - 50 && x <= this.canvas.width / 2 + 50 &&
        y >= this.canvas.height / 2 - 25 && y <= this.canvas.height / 2 + 25 && this.onGameEnd) {
          if(this.score > this.bestScore) {
            this.bestScore = this.score;
          }
      this.score = 0;
      this.onGameEnd = false;

      this.start();  // Reinicia el juego
    }
    
    // Bonus: restart on demand
  }

  resetGameState() {
    // Reinicia el estado del juego
    this.pipes = [];  // Borra las tuberías
    this.bird = new FlappyBird(this.ctx, 0, this.canvas.height / 2);
    this.drawPipesCount = 0;
    this.pipesFrequency = 100;
    // Reinicia cualquier otra variable que sea importante para el estado inicial del juego
  }

  end() {
    // Iteration 4: stop the game and setup score
    this.stop();
    this.bg.draw(); 
    this.resetGameState()

  }
  

  clear() {
    // Iteration 1: clean the screen
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  move() {
    // Iteration 1: move the background
    this.bg.move();
    // Iteration 2: move the flappy
    this.bird.move();
    // Iteration 3: move the pipes
    this.pipes.forEach(p => p.move());
  }

  addPipes() {
    // Iteration 3: each draw pipes frequency cycles concat a pair of pipes to the pipes array and reset the draw cycle
  
    if (this.drawPipesCount > this.pipesFrequency) {
      const newPipes = this.randPairOfPipes();
      this.pipes.push(newPipes[0]);
      this.pipes.push(newPipes[1]);
      this.drawPipesCount = 0;

    }
  }

  randPairOfPipes() {
    const space = this.canvas.height - this.bg.footerImg.height;
    const gap = (this.bird.height * 2) + this.bird.jumpImpulse * 14;
    const topSize = Math.floor(Math.random() * (space - gap) * 0.75)
    const bottomSize = space - topSize - gap;
    // Iteration 3: return two new pipes one at the top and other at the bottom
    


    return [
      new Pipe(this.ctx, this.canvas.width, 0, topSize, "top"), 
      new Pipe(this.ctx, this.canvas.width, space - bottomSize, bottomSize, "bottom"),
    ]
  }

  checkCollisions() {
    // Iteration 4: check pipes collisions among flappy and end game if any pipe collides with the bird
    this.pipes.forEach(p => {
      if(this.bird.collides(p)) {
        this.end();
      }

      if(this.bird.y >= this.bg.y) {
       this.end();
      }
  })
  }

  checkScore() {
    
    this.pipes.forEach((pipe) => {
      
      // Verifica si el pájaro ha pasado la tubería (pájaro está a la derecha de la tubería)
      if (!pipe.hasScore && pipe.x + pipe.img.width <= this.bird.x) {
        this.score += 0.5;
        pipe.hasScore = true;  // Marca la tubería como "contada" para evitar sumar múltiples veces
      }
    });
    
    this.pipes = this.pipes.filter(pipe => pipe.x + pipe.img.width > 0);
    // Bonus
  }

  draw() {
    // Iteration 1: draw the background
    this.bg.draw();
    
    // Iteration 2: draw the flappy
    this.bird.draw();
    // Iteration 2: draw the pipes
    this.pipes.forEach((p) => {
      p.draw();

    });
    // Bonus: draw the score

    this.ctx.save();
    this.ctx.font = "35px FlappyFont";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(
      this.score,
      10,
      45,
    )
    this.ctx.font = "25px FlappyFont";
    this.ctx.fillStyle = "green";
    this.ctx.fillText(
      `best: ${this.bestScore}`,
      10,
      this.canvas.height - 15,
    )
    this.ctx.restore();

    this.drawPipesCount++;
  }
}
