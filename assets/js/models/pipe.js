class Pipe {

  constructor(ctx, x, y, height, mode) {
    this.ctx = ctx;
    this.x = x;
    this.vx = 3;
    this.y = y;
    this.height = height;
    this.mode = mode;
    this.hasScore = false;

    this.img = new Image();
    // iteration 3: load the source checking the mode and setup this.with (must be the image with)
    this.img.src = `assets/img/pipe-${mode}.png`;
    this.img.onload = () => {
      this.width = this.img.width;
    }
  }

  draw() {
    // iteration 3: draw the pipe don't worry if looks unscaled. You can start drawing a green rectangle
    let yCrop = 0;
    if(this.mode === "top") {
      yCrop = (this.height > this.img.height) ? 0 : this.img.height - this.height;
    } else yCrop = 0;

    this.ctx.drawImage(this.img, 
      0,
      yCrop,
      Math.min(this.img.width, this.width),
      Math.min(this.img.height, this.height), 
      this.x, 
      this.y, 
      this.width,
      this.height
    );   
  }

  move () {
    // iteration 3: move the pipe
    this.x -= this.vx;
  }
}
