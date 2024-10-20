class FlappyBird {

  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.jumpImpulse = 5;
    this.vy = 3;

    this.sprite = new Image();
    this.sprite.src = 'assets/img/bird.png';
    // sprite setup
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 3;
    this.sprite.verticalFrames = 1;
    this.sprite.onload = () => {
      this.sprite.frameWith = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
      this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
      this.width = this.sprite.frameWith;
      this.height = this.sprite.frameHeight;
    }

    this.drawCount = 0;
    this.wasJummping = false;
  }

  onKeyEvent(event) {
    const isJumping = event.type === 'keydown';

    switch (event.keyCode) {
      case KEY_UP:
        // this.y -= this.jumpImpulse;
        // break;
        if(isJumping && !this.wasJummping) {
          this.vy = -this.jumpImpulse;
          this.wasJummping = true
          setTimeout(() => {
            this.vy = 3;
          }, 200);
          break;
        // iteration 2: jump! if necessary =D
        } else if (!isJumping) this.wasJummping = false;
    }
  }
  draw() {
    // draw sprite
    this.ctx.drawImage(this.sprite, 
      this.sprite.horizontalFrameIndex * this.width,
      this.sprite.verticalFrameIndex * this.height,
      this.width,
      this.height,
      this.x, 
      this.y, 
      this.width,
      this.height
    )
    
    // animate sprite
    this.animate();
  }

  animate() {
    this.drawCount++;
    // iteration 2: configure frame animation
    if(this.drawCount > 15) {
      this.drawCount = 0;
      this.sprite.horizontalFrameIndex += 1;
    }
    

    if (this.sprite.horizontalFrameIndex >= this.sprite.horizontalFrames) {
      this.sprite.horizontalFrameIndex = 0
    }
  }

  move() {
    // iteration 2: move the y
    this.y += this.vy;
  }

  collides(element) {

    return (
      this.x < element.x + element.width &&  // Verifica si el lado derecho del pájaro ha pasado el lado izquierdo del elemento
      this.x + this.width > element.x &&     // Verifica si el lado izquierdo del pájaro ha pasado el lado derecho del elemento
      this.y < element.y + element.height && // Verifica si la parte inferior del pájaro ha pasado la parte superior del elemento
      this.y + this.height > element.y       // Verifica si la parte superior del pájaro ha pasado la parte inferior del elemento
    );
  }

 
}
